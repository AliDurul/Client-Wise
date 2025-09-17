"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGmailMessages = getGmailMessages;
exports.getGmailLabels = getGmailLabels;
const gmail_service_1 = require("../services/gmail.service");
// Helper to parse the "From" header
function parseFromHeader(fromValue) {
    const match = fromValue.match(/^(.*?)\s*<(.+?)>$/);
    if (match) {
        const nameParts = match[1].trim().split(' ');
        return {
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            email: match[2]
        };
    }
    if (fromValue.includes('@')) {
        const email = fromValue.trim();
        const firstName = email.split('@')[0];
        return { firstName, lastName: '', email };
    }
    return { firstName: fromValue, lastName: '', email: '' };
}
// Helper to transform a Gmail message
function modifyMessage(message) {
    const getHeader = (name) => message.payload.headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value || '';
    const fromParsed = parseFromHeader(getHeader('From'));
    // Get plain text snippet or fallback to snippet
    let description = '';
    if (message.payload.parts) {
        const part = message.payload.parts.find((p) => p.mimeType === 'text/plain');
        if (part && part.body && part.body.data) {
            description = Buffer.from(part.body.data, 'base64').toString('utf-8');
        }
    }
    if (!description)
        description = message.snippet;
    // Extract attachments as array
    let attachments = [];
    if (message.payload.parts) {
        attachments = message.payload.parts
            .filter((p) => p.filename !== '' && p.body && p.body.attachmentId)
            .map((p) => ({
            name: p.filename,
            size: '',
            type: '',
        }));
    }
    return {
        id: message.id,
        firstName: fromParsed.firstName,
        lastName: fromParsed.lastName,
        email: fromParsed.email,
        title: getHeader('Subject'),
        displayDescription: description,
        isUnread: message.labelIds?.includes('UNREAD'),
        isStar: message.labelIds?.includes('STARRED'),
        isImportant: message.labelIds?.includes('IMPORTANT'),
        labelIds: message.labelIds,
        group: '', // Set as needed
        attachments,
        date: getHeader('Date'),
        payload: message.payload,
    };
}
async function getGmailMessages(req, res) {
    const result = await (0, gmail_service_1.listGmailMessages)();
    const transformed = result.map(modifyMessage);
    res.status(200).send({ success: true, result: transformed });
}
async function getGmailLabels(req, res) {
    const result = await (0, gmail_service_1.listGmailLabels)();
    res.status(200).send({ success: true, result });
}
//# sourceMappingURL=gmail.controller.js.map