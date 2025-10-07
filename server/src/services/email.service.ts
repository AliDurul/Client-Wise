import { google } from 'googleapis';
import { authorize } from '../configs/googleApiAuth';
import { CustomError } from '../utils/common';


export async function getEmailsService() {
    const auth = await authorize();

    if (!auth) throw new CustomError('Authentication failed', 401, true);

    const gmail = google.gmail({ version: 'v1', auth });

    const res = await gmail.users.messages.list({ userId: 'me', maxResults: 10 });
    const messages = res.data.messages || [];

    const fullMessages = await Promise.all(
        messages.map(async (msg) => {
            const msgRes = await gmail.users.messages.get({ userId: 'me', id: msg.id! });
            return msgRes.data;
        })
    );

    return fullMessages;
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