"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePostRequest = exports.handleGetRequest = void 0;
const common_1 = require("../utils/common");
const env_1 = __importDefault(require("../configs/env"));
const wp_service_1 = require("../services/wp.service");
const ticket_model_1 = __importDefault(require("../models/ticket.model"));
const customer_model_1 = __importDefault(require("../models/customer.model"));
const handleGetRequest = (req, res) => {
    const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;
    if (mode === 'subscribe' && token === env_1.default.WEB_HOOK_VERIFY_TOKEN) {
        console.log('WEBHOOK VERIFIED');
        res.status(200).send(challenge);
    }
    else {
        res.sendStatus(403);
    }
};
exports.handleGetRequest = handleGetRequest;
let userState = {};
const handlePostRequest = async (req, res) => {
    const { entry } = req.body;
    if (!entry || !Array.isArray(entry) || entry.length === 0)
        throw new common_1.CustomError('Invalid webhook data', 400, true);
    const changes = entry[0].changes;
    if (!changes || !Array.isArray(changes) || changes.length === 0)
        throw new common_1.CustomError('Invalid webhook data', 400, true);
    const statuses = changes[0].value.statuses ? changes[0].value.statuses[0] : null;
    const messages = changes[0].value.messages ? changes[0].value.messages[0] : null;
    const from = messages ? messages.from : null;
    if (messages) {
        // Handle button replies with switch
        if (messages.type === 'interactive' && messages.interactive.type === 'button_reply') {
            const selectedId = messages.interactive.button_reply.id;
            switch (selectedId) {
                case 'already_customer':
                    await (0, wp_service_1.sendReplyButtons)(from, [
                        { type: "reply", reply: { id: "get_support", title: "Get Support" } },
                        { type: "reply", reply: { id: "buy_product", title: "Buy Product" } }
                    ], "Welcome back! What would you like to do?");
                    userState[from] = 'customer_options';
                    break;
                case 'not_yet_customer':
                    await (0, wp_service_1.sendReplyMessage)(from, "Which product are you interested in?", messages.id);
                    userState[from] = 'awaiting_lead';
                    break;
                case 'get_support':
                    await (0, wp_service_1.sendReplyMessage)(from, "Please describe your issue. We'll create a support ticket for you.", messages.id);
                    userState[from] = 'awaiting_ticket';
                    break;
                case 'buy_product':
                    await (0, wp_service_1.sendReplyMessage)(from, "Which product are you interested in?", messages.id);
                    userState[from] = 'awaiting_lead';
                    break;
                default:
                    await (0, wp_service_1.sendReplyMessage)(from, "Sorry, I didn't understand your selection.", messages.id);
                    break;
            }
            res.status(200).end();
            return;
        }
        console.info('userState', userState);
        // Handle text replies
        if (userState[from] === 'awaiting_ticket' && messages.type === 'text') {
            const customer = await customer_model_1.default.findOne({ phone_number: '+19876543214' }).select('_id').lean();
            if (!customer) {
                await (0, wp_service_1.sendReplyMessage)(from, "Sorry, we couldn't find your customer record. Please contact support.", messages.id);
                userState[from] = '';
                res.status(200).end();
                return;
            }
            await ticket_model_1.default.create({
                title: messages.text.body.substring(0, 50),
                description: messages.text.body,
                source: 'whatsapp',
                assigned_agent: "68a9cb641a2a533a19e1b7b9",
                customer: customer._id,
                category: "68a9cb651a2a533a19e1b7e5",
            });
            await (0, wp_service_1.sendReplyMessage)(from, "Thank you! Your ticket has been created.", messages.id);
            userState[from] = '';
            res.status(200).end();
            return;
        }
        if (userState[from] === 'awaiting_lead' && messages.type === 'text') {
            // createLead(...)
            console.log('awaiting lead body', messages.text.body);
            await (0, wp_service_1.sendReplyMessage)(from, "Thank you! Our team will contact you soon.", messages.id);
            userState[from] = '';
            res.status(200).end();
            return;
        }
        try {
            await (0, wp_service_1.sendReplyButtons)(from, [
                { type: "reply", reply: { id: "already_customer", title: "Already a Customer" } },
                { type: "reply", reply: { id: "not_yet_customer", title: "Not Yet a Customer" } }
            ], "Hi! To help you better, please let us know if you're an existing customer or interested in our products.");
        }
        catch (err) {
            console.error('WhatsApp API error:', err.response?.data || err.message);
        }
        res.status(200).end();
    }
};
exports.handlePostRequest = handlePostRequest;
//# sourceMappingURL=webhook.controller.js.map