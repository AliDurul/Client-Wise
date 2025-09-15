"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listGmailMessages = listGmailMessages;
exports.listGmailLabels = listGmailLabels;
const googleapis_1 = require("googleapis");
const googleApiAuth_1 = require("../configs/googleApiAuth");
async function listGmailMessages() {
    const auth = await (0, googleApiAuth_1.authorize)().then().catch(console.error);
    if (!auth) {
        throw new Error('Authentication failed');
    }
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.list({ userId: 'me', maxResults: 10 });
    return res.data.messages;
}
async function listGmailLabels() {
    const auth = await (0, googleApiAuth_1.authorize)().then().catch(console.error);
    if (!auth) {
        throw new Error('Authentication failed');
    }
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
    const res = await gmail.users.labels.list({ userId: 'me' });
    return res.data.labels;
}
//# sourceMappingURL=gmail.service.js.map