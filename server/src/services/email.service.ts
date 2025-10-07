import { google } from 'googleapis';
import { authorize } from '../configs/googleApiAuth';
import { CustomError } from '../utils/common';

interface IGetEmailsQuery {
    page?: number;
    limit?: number;
    labelIds?: string[];
    q?: string; // Search query
    includeSpamTrash?: boolean;
}

export async function getEmailsService(queryParams: IGetEmailsQuery = {}) {
    const auth = await authorize();

    if (!auth) throw new CustomError('Authentication failed', 401, true);

    const gmail = google.gmail({ version: 'v1', auth });

    // Set default pagination values
    const page = Math.max(1, queryParams.page || 1);
    const limit = Math.min(50, Math.max(1, queryParams.limit || 20));

    const gmailParams: any = {
        userId: 'me',
        maxResults: limit,
        includeSpamTrash: queryParams.includeSpamTrash || false
    };

    // Add search query if provided
    if (queryParams.q) {
        gmailParams.q = queryParams.q;
    }

    // Add label filtering
    if (queryParams.labelIds?.length) {
        const labelQuery = queryParams.labelIds.map(label => `label:${label}`).join(' ');
        gmailParams.q = gmailParams.q ? `${gmailParams.q} ${labelQuery}` : labelQuery;
    }

    // Get first page to establish total count
    const initialRes = await gmail.users.messages.list(gmailParams);
    const totalMessages = initialRes.data.resultSizeEstimate || 0;
    const messages = initialRes.data.messages || [];

    // Handle pagination with pageToken for subsequent pages
    let currentMessages = messages;
    let pageToken = initialRes.data.nextPageToken;


    // Skip pages if not first page
    if (page > 1) {
        let currentPage = 1;
        let tempPageToken = pageToken;

        while (currentPage < page && tempPageToken) {
            const pageRes = await gmail.users.messages.list({
                ...gmailParams,
                pageToken: tempPageToken
            });

            if (currentPage === page - 1) {
                currentMessages = pageRes.data.messages || [];
                pageToken = pageRes.data.nextPageToken;
                break;
            }

            tempPageToken = pageRes.data.nextPageToken;
            currentPage++;
        }

        // If we've gone past available pages
        if (currentPage < page) {
            currentMessages = [];
            pageToken = undefined;
        }
    }

    // Fetch full message details
    const fullMessages = await Promise.all(
        currentMessages.map(async (msg) => {
            const msgRes = await gmail.users.messages.get({
                userId: 'me',
                id: msg.id!,
                format: 'full' // Get full message details
            });
            return msgRes.data;
        })
    );

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalMessages / limit);
    const hasNextPage = !!pageToken && page < totalPages;
    const hasPrevPage = page > 1;

    return {
        emails: fullMessages,
        pagination: {
            limit,
            page,
            totalRecords: totalMessages,
            pages: {
                previous: hasPrevPage ? page - 1 : false,
                current: page,
                next: hasNextPage ? page + 1 : false,
                total: totalPages,
                nextPageToken: pageToken
            },
        }
    };

};

export async function modifyEmailService(emailId: string, { read, starred, important }: { read?: boolean, starred?: boolean, important?: boolean }) {
    const auth = await authorize();

    if (!auth) throw new CustomError('Authentication failed', 401, true);

    const gmail = google.gmail({ version: 'v1', auth });

    // Prepare label modifications
    const addLabelIds: string[] = [];
    const removeLabelIds: string[] = [];

    if (read !== undefined) {
        if (read) removeLabelIds.push('UNREAD');
        else addLabelIds.push('UNREAD');
    }
    if (starred !== undefined) {
        if (starred) addLabelIds.push('STARRED');
        else removeLabelIds.push('STARRED');
    }
    if (important !== undefined) {
        if (important) addLabelIds.push('IMPORTANT');
        else removeLabelIds.push('IMPORTANT');
    }

    const res = await gmail.users.messages.modify({
        userId: 'me',
        id: emailId,
        requestBody: {
            addLabelIds,
            removeLabelIds,
        },
    });
    return res
}

export async function trashEmailMessageService(emailId: string) {
    const auth = await authorize();
    if (!auth) throw new CustomError('Authentication failed', 401, true);

    const gmail = google.gmail({ version: 'v1', auth });
    await gmail.users.messages.trash({ userId: 'me', id: emailId });
}

export async function getEmailByIdService(emailId: string) {
    const auth = await authorize();
    if (!auth) throw new CustomError('Authentication failed', 401, true);

    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.get({ userId: 'me', id: emailId });
    return res.data;
}

interface ISendEmailService {
    to: string;
    subject: string;
    textBody?: string;
    htmlBody?: string;
    cc?: string;
    bcc?: string;
    attachments?: any[];
    // attachments?: Array<{
    //     filename: string;
    //     content: string; // base64 encoded
    //     contentType: string;
    // }>;
}

export async function sendEmailService(emailData: ISendEmailService) {
    const auth = await authorize();
    if (!auth) throw new CustomError('Authentication failed', 401, true);

    const gmail = google.gmail({ version: 'v1', auth });

    // Generate unique boundary for MIME multipart

    const hasAttachments = !!emailData.attachments?.length;
    const mixedBoundary = `----CMS_MIXED_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const altBoundary = `----CMS_ALT_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    // Build email headers (filter out empty optional headers)
    const headers = [
        `To: ${emailData.to}`,
        emailData.cc && `Cc: ${emailData.cc}`,
        emailData.bcc && `Bcc: ${emailData.bcc}`,
        `Subject: ${emailData.subject}`,
        'MIME-Version: 1.0',
        hasAttachments
            ? `Content-Type: multipart/mixed; boundary="${mixedBoundary}"`
            : `Content-Type: multipart/alternative; boundary="${altBoundary}"`
    ].filter(Boolean as any) as string[];

    // Build the alternative part (HTML preferred; text as fallback)
    const altParts: string[] = [];
    if (emailData.textBody) {
        altParts.push(
            `--${altBoundary}`,
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 7bit',
            '',
            emailData.textBody
        );
    }
    if (emailData.htmlBody) {
        altParts.push(
            `--${altBoundary}`,
            'Content-Type: text/html; charset=UTF-8',
            'Content-Transfer-Encoding: 7bit',
            '',
            emailData.htmlBody
        );
    }

    // Ensure there is at least one body part
    if (altParts.length === 0) {
        altParts.push(
            `--${altBoundary}`,
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 7bit',
            '',
            '(no content)'
        );
    }
    altParts.push(`--${altBoundary}--`);

    const bodyParts: string[] = [];

    if (hasAttachments) {
        // Mixed container with an inner alternative part
        bodyParts.push(
            `--${mixedBoundary}`,
            `Content-Type: multipart/alternative; boundary="${altBoundary}"`,
            '',
            ...altParts,
            ''
        );

        for (const attachment of emailData.attachments!) {
            bodyParts.push(
                `--${mixedBoundary}`,
                `Content-Type: ${attachment.contentType}`,
                `Content-Disposition: attachment; filename="${attachment.filename}"`,
                'Content-Transfer-Encoding: base64',
                '',
                attachment.content,
                ''
            );
        }
        bodyParts.push(`--${mixedBoundary}--`);
    } else {
        // Only the alternative part at the top level
        bodyParts.push(...altParts);
    }

    const completeEmail = [
        ...headers,
        '',
        ...bodyParts
    ].join('\r\n');

    const encodedEmail = Buffer.from(completeEmail)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    try {
        const res = await gmail.users.messages.send({
            userId: 'me',
            requestBody: { raw: encodedEmail }
        });

        return {
            messageId: res.data.id!,
            threadId: res.data.threadId!,
            success: true
        };
    } catch {
        throw new CustomError('Failed to send email via Gmail API', 500, true);
    }
}