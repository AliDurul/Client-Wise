"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePostRequest = exports.handleGetRequest = void 0;
const env_1 = __importDefault(require("../configs/env"));
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
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    console.log(`\n\nWebhook received ${timestamp}\n`);
    console.log(JSON.stringify(req.body, null, 2));
    res.status(200).end();
};
exports.handlePostRequest = handlePostRequest;
//# sourceMappingURL=webhook.controller.js.map