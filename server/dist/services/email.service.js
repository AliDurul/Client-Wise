"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailsService = getEmailsService;
exports.modifyEmailService = modifyEmailService;
exports.trashEmailMessageService = trashEmailMessageService;
exports.getEmailByIdService = getEmailByIdService;
exports.sendEmailService = sendEmailService;
exports.getEmailStatsService = getEmailStatsService;
const googleapis_1 = require("googleapis");
const googleApiAuth_1 = require("../configs/googleApiAuth");
const common_1 = require("../utils/common");
async function getEmailsService(queryParams = {}) {
    const auth = await (0, googleApiAuth_1.authorize)();
    if (!auth)
        throw new common_1.CustomError('Authentication failed', 401, true);
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
    // Set default pagination values
    const page = Math.max(1, queryParams.page || 1);
    const limit = Math.min(50, Math.max(1, queryParams.limit || 20));
    const gmailParams = {
        userId: 'me',
        maxResults: limit,
        includeSpamTrash: queryParams.includeSpamTrash || false
    };
    // If caller provided a Gmail pageToken, use it directly to fetch that page.
    if (queryParams.pageToken) {
        gmailParams.pageToken = queryParams.pageToken;
    }
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
    // console.log(initialRes);
    const totalMessages = initialRes.data.resultSizeEstimate || 0;
    const messages = initialRes.data.messages || [];
    // Handle pagination with pageToken for subsequent pages
    let currentMessages = messages;
    let pageToken = initialRes.data.nextPageToken;
    let previousPageToken = undefined;
    // If caller provided pageToken, `initialRes` already corresponds to that page
    // and we should not attempt to skip pages by number. Otherwise, if caller
    // requested a numeric page, iterate tokens until we reach it. While iterating
    // record the token that points to the start of each page so we can return
    // a previousPageToken for numeric paging.
    if (!queryParams.pageToken && page > 1) {
        let currentPage = 1;
        // tempPageToken points to the token that will return the NEXT page when used
        let tempPageToken = pageToken;
        // Keep track of the token that returned the last fetched page
        let tokenAtPreviousPage = undefined;
        while (currentPage < page && tempPageToken) {
            const pageRes = await gmail.users.messages.list({
                ...gmailParams,
                pageToken: tempPageToken
            });
            // The pageRes corresponds to the page that tempPageToken points to.
            // Record the token that would get to this page so that after advancing
            // we can use it as previousPageToken for the next page.
            const thisPageToken = tempPageToken;
            if (currentPage === page - 1) {
                // We want the messages for the target page (page), which are
                // returned in this pageRes because tempPageToken pointed to it.
                currentMessages = pageRes.data.messages || [];
                // pageRes.nextPageToken is the token for page+1
                pageToken = pageRes.data.nextPageToken;
                // previousPageToken should be the token that returned the previous page
                previousPageToken = tokenAtPreviousPage;
                break;
            }
            // Move token history forward: the token that pointed to this page
            // becomes the previous token for the next iteration.
            tokenAtPreviousPage = thisPageToken;
            tempPageToken = pageRes.data.nextPageToken;
            currentPage++;
        }
        // If we've gone past available pages
        if (currentPage < page) {
            currentMessages = [];
            pageToken = undefined;
            previousPageToken = undefined;
        }
    }
    // Fetch full message details
    const fullMessages = await Promise.all(currentMessages.map(async (msg) => {
        const msgRes = await gmail.users.messages.get({
            userId: 'me',
            id: msg.id,
            format: 'full' // Get full message details
        });
        return msgRes.data;
    }));
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
                nextPageToken: pageToken,
                previousPageToken: previousPageToken
            },
        }
    };
}
;
async function modifyEmailService(emailId, { read, starred, important }) {
    const auth = await (0, googleApiAuth_1.authorize)();
    if (!auth)
        throw new common_1.CustomError('Authentication failed', 401, true);
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
    // Prepare label modifications
    const addLabelIds = [];
    const removeLabelIds = [];
    if (read !== undefined) {
        if (read)
            removeLabelIds.push('UNREAD');
        else
            addLabelIds.push('UNREAD');
    }
    if (starred !== undefined) {
        if (starred)
            addLabelIds.push('STARRED');
        else
            removeLabelIds.push('STARRED');
    }
    if (important !== undefined) {
        if (important)
            addLabelIds.push('IMPORTANT');
        else
            removeLabelIds.push('IMPORTANT');
    }
    const res = await gmail.users.messages.modify({
        userId: 'me',
        id: emailId,
        requestBody: {
            addLabelIds,
            removeLabelIds,
        },
    });
    return res;
}
async function trashEmailMessageService(emailId) {
    const auth = await (0, googleApiAuth_1.authorize)();
    if (!auth)
        throw new common_1.CustomError('Authentication failed', 401, true);
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
    await gmail.users.messages.trash({ userId: 'me', id: emailId });
}
async function getEmailByIdService(emailId) {
    const auth = await (0, googleApiAuth_1.authorize)();
    if (!auth)
        throw new common_1.CustomError('Authentication failed', 401, true);
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.get({ userId: 'me', id: emailId });
    return res.data;
}
async function sendEmailService(emailData) {
    const auth = await (0, googleApiAuth_1.authorize)();
    if (!auth)
        throw new common_1.CustomError('Authentication failed', 401, true);
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
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
    ].filter(Boolean);
    // Build the alternative part (HTML preferred; text as fallback)
    const altParts = [];
    if (emailData.textBody) {
        altParts.push(`--${altBoundary}`, 'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: 7bit', '', emailData.textBody);
    }
    if (emailData.htmlBody) {
        altParts.push(`--${altBoundary}`, 'Content-Type: text/html; charset=UTF-8', 'Content-Transfer-Encoding: 7bit', '', emailData.htmlBody);
    }
    // Ensure there is at least one body part
    if (altParts.length === 0) {
        altParts.push(`--${altBoundary}`, 'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: 7bit', '', '(no content)');
    }
    altParts.push(`--${altBoundary}--`);
    const bodyParts = [];
    if (hasAttachments) {
        // Mixed container with an inner alternative part
        bodyParts.push(`--${mixedBoundary}`, `Content-Type: multipart/alternative; boundary="${altBoundary}"`, '', ...altParts, '');
        for (const attachment of emailData.attachments) {
            bodyParts.push(`--${mixedBoundary}`, `Content-Type: ${attachment.contentType}`, `Content-Disposition: attachment; filename="${attachment.filename}"`, 'Content-Transfer-Encoding: base64', '', attachment.content, '');
        }
        bodyParts.push(`--${mixedBoundary}--`);
    }
    else {
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
            messageId: res.data.id,
            threadId: res.data.threadId,
            success: true
        };
    }
    catch {
        throw new common_1.CustomError('Failed to send email via Gmail API', 500, true);
    }
}
async function getEmailStatsService() {
    const auth = await (0, googleApiAuth_1.authorize)();
    if (!auth)
        throw new common_1.CustomError('Authentication failed', 401, true);
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
    // Standard Gmail label IDs
    const LABELS = {
        INBOX: 'INBOX',
        STARRED: 'STARRED',
        SENT: 'SENT',
        SPAM: 'SPAM',
        DRAFT: 'DRAFT',
        TRASH: 'TRASH',
        IMPORTANT: 'IMPORTANT'
    };
    // Fetch label summaries in parallel
    const labelPromises = Object.values(LABELS).map(id => gmail.users.labels.get({ userId: 'me', id }));
    const labelResults = await Promise.allSettled(labelPromises);
    const stats = {};
    // Map results to counts, fallback to 0 on errors
    Object.keys(LABELS).forEach((key, idx) => {
        const res = labelResults[idx];
        if (res.status === 'fulfilled' && res.value && res.value.data) {
            const data = res.value.data;
            stats[key.toLowerCase()] = Number(data.messagesTotal || 0);
            // also expose unread counts for inbox
            if (key === 'INBOX') {
                stats['inbox_unread'] = Number(data.messagesUnread || 0);
            }
        }
        else {
            stats[key.toLowerCase()] = 0;
            if (key === 'INBOX')
                stats['inbox_unread'] = 0;
        }
    });
    // Normalize keys for response
    return {
        counts: {
            inbox: stats['inbox'] || 0,
            inboxUnread: stats['inbox_unread'] || 0,
            starred: stats['starred'] || 0,
            sent: stats['sent'] || 0,
            spam: stats['spam'] || 0,
            drafts: stats['draft'] || 0,
            trash: stats['trash'] || 0,
            important: stats['important'] || 0,
        }
    };
}
//# sourceMappingURL=email.service.js.map