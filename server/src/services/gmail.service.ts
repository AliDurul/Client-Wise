import { google } from 'googleapis';
import { authorize } from '../configs/googleApiAuth';
import { CustomError } from '../utils/common';

export async function listGmailLabels() {
    const auth = await authorize();

    if (!auth) throw new CustomError('Authentication failed', 401, true);

    const gmail = google.gmail({ version: 'v1', auth });

    const res = await gmail.users.labels.list({ userId: 'me' });

    return res.data.labels;
}

export async function listGmailMessages() {
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
}

