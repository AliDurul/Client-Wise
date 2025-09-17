"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listGmailLabels = listGmailLabels;
exports.listGmailMessages = listGmailMessages;
const googleapis_1 = require("googleapis");
const googleApiAuth_1 = require("../configs/googleApiAuth");
const common_1 = require("../utils/common");
async function listGmailLabels() {
    const auth = await (0, googleApiAuth_1.authorize)();
    if (!auth)
        throw new common_1.CustomError('Authentication failed', 401, true);
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
    const res = await gmail.users.labels.list({ userId: 'me' });
    return res.data.labels;
}
async function listGmailMessages() {
    const auth = await (0, googleApiAuth_1.authorize)();
    if (!auth)
        throw new common_1.CustomError('Authentication failed', 401, true);
    const gmail = googleapis_1.google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.list({ userId: 'me', maxResults: 10 });
    const messages = res.data.messages || [];
    const fullMessages = await Promise.all(messages.map(async (msg) => {
        const msgRes = await gmail.users.messages.get({ userId: 'me', id: msg.id });
        return msgRes.data;
    }));
    return fullMessages;
}
//# sourceMappingURL=gmail.service.js.map