"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePostRequest = exports.handleGetRequest = void 0;
const common_1 = require("../utils/common");
const env_1 = __importDefault(require("../configs/env"));
const wp_service_1 = require("../services/wp.service");
const handleGetRequest = (req, res) => {
    const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;
    console.log('web hook api');
    if (mode === 'subscribe' && token === env_1.default.WEB_HOOK_VERIFY_TOKEN) {
        console.log('WEBHOOK VERIFIED');
        res.status(200).send(challenge);
    }
    else {
        res.sendStatus(403);
    }
};
exports.handleGetRequest = handleGetRequest;
const handlePostRequest = (req, res) => {
    const { entry } = req.body;
    if (!entry || !Array.isArray(entry) || entry.length === 0)
        throw new common_1.CustomError('Invalid webhook data', 400, true);
    const changes = entry[0].changes;
    if (!changes || !Array.isArray(changes) || changes.length === 0)
        throw new common_1.CustomError('Invalid webhook data', 400, true);
    const statuses = changes[0].value.statuses ? changes[0].value.statuses[0] : null;
    const messages = changes[0].value.messages ? changes[0].value.messages[0] : null;
    // handle status message
    if (statuses) {
    }
    // handle received message
    if (messages) {
        if (messages.type === 'text') {
            if (messages.text.body.toLowerCase() === 'hello') {
                // sendTextMessage(messages.from, 'Hello! How can I assist you today?');
                (0, wp_service_1.sendReplyMessage)(messages.from, 'Hello! How can I assist you today?', messages.id);
            }
            if (messages.text.body.toLowerCase() === 'list') {
                (0, wp_service_1.sendListMessage)(messages.from);
            }
            if (messages.text.body.toLowerCase() === 'buttons') {
                (0, wp_service_1.sendReplyButton)(messages.from);
            }
        }
        if (messages.type === 'interactive') {
            if (messages.interactive.type === 'list_reply') {
                const selectedId = messages.interactive.list_reply.id;
                (0, wp_service_1.sendReplyMessage)(messages.from, `You selected item with id: ${selectedId}`, messages.id);
            }
            if (messages.interactive.type === 'button_reply') {
                const selectedId = messages.interactive.button_reply.id;
                (0, wp_service_1.sendReplyMessage)(messages.from, `You selected button with id: ${selectedId}`, messages.id);
            }
        }
        console.log(JSON.stringify(req.body, null, 2));
        res.status(200).end();
    }
};
exports.handlePostRequest = handlePostRequest;
//# sourceMappingURL=webhook.controller.js.map