import { google } from 'googleapis';
import { authorize } from '../configs/googleApiAuth';

export async function listGmailMessages() {
    const auth = await authorize().then().catch(console.error);
    if (!auth) {
        throw new Error('Authentication failed');
    }

    const gmail = google.gmail({ version: 'v1', auth });

    const res = await gmail.users.messages.list({ userId: 'me', maxResults: 10 });

    return res.data.messages;
}

export async function listGmailLabels() {
    const auth = await authorize().then().catch(console.error);
    
    if (!auth) {
        throw new Error('Authentication failed');
    }

    const gmail = google.gmail({ version: 'v1', auth });

    const res = await gmail.users.labels.list({ userId: 'me' });

    return res.data.labels;
}