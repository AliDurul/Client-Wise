"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGmailMessages = getGmailMessages;
exports.getGmailLabels = getGmailLabels;
const gmail_service_1 = require("../services/gmail.service");
async function getGmailMessages(req, res) {
    const messages = await (0, gmail_service_1.listGmailMessages)();
    res.json({ success: true, messages });
}
async function getGmailLabels(req, res) {
    const labels = await (0, gmail_service_1.listGmailLabels)();
    res.json({ success: true, labels });
}
//# sourceMappingURL=gmail.controller.js.map