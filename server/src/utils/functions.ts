// Emails


// Helper to parse the "From" header
function parseFromHeader(fromValue: string) {
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
export function modifyMessage(message: any): any {
    const getHeader = (name: string) =>
        message.payload.headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase())?.value || '';

    const fromParsed = parseFromHeader(getHeader('From'));

    // Get plain text snippet or fallback to snippet
    let description = '';
    if (message.payload.parts) {
        const part = message.payload.parts.find((p: any) => p.mimeType === 'text/plain');
        if (part && part.body && part.body.data) {
            description = Buffer.from(part.body.data, 'base64').toString('utf-8');
        }
    }
    if (!description) description = message.snippet;

    // Extract attachments as array
    let attachments = [];
    if (message.payload.parts) {
        attachments = message.payload.parts
            .filter((p: any) => p.filename !== '' && p.body && p.body.attachmentId)
            .map((p: any) => ({
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
        to: getHeader('To'),
        title: getHeader('Subject'),
        displayDescription: description,
        isUnread: message.labelIds?.includes('UNREAD'),
        isStarred: message.labelIds?.includes('STARRED'),
        isImportant: message.labelIds?.includes('IMPORTANT'),
        labelIds: message.labelIds,
        attachments,
        date: getHeader('Date'),
        payload: message.payload,
    };
}