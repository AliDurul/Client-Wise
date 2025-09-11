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
const wpUserState_model_1 = __importDefault(require("../models/wpUserState.model"));
const index_1 = require("../utils/socket/index");
const chatMessage_service_1 = require("../services/chatMessage.service");
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
const defaultValues = {
    assigned_agent: "68baa5a729e7a4f116048fd9",
    category: "68baa5a829e7a4f116049003",
    source: 'whatsapp'
};
const handlePostRequest = async (req, res) => {
    const { entry } = req.body;
    if (!entry || !Array.isArray(entry) || entry.length === 0)
        throw new common_1.CustomError('Invalid webhook data', 400, true);
    const changes = entry[0].changes;
    if (!changes || !Array.isArray(changes) || changes.length === 0)
        throw new common_1.CustomError('Invalid webhook data', 400, true);
    const statuses = changes[0].value.statuses ? changes[0].value.statuses[0] : null;
    const messages = changes[0].value.messages ? changes[0].value.messages[0] : null;
    const contactname = changes[0].value.contacts ? changes[0].value.contacts[0].profile.name : null;
    const from = messages ? messages.from : null;
    console.log('Received webhook:', JSON.stringify(req.body, null, 2));
    if (messages) {
        const queryObj = {
            phone_number: from,
            source: defaultValues.source,
        };
        let customer = await customer_model_1.default.findOne(queryObj).select('_id').lean();
        const userState = await wpUserState_model_1.default.findOne({ wpId: from });
        if (!customer) {
            await (0, wp_service_1.sendReplyMessage)(from, "Customer does not exist with this number. Creating ...", messages.id);
            customer = await customer_model_1.default.create({
                ...queryObj,
                status: 'prospect',
                assigned_agent: defaultValues.assigned_agent,
                first_name: contactname || 'WhatsApp User',
                last_name: '',
            });
        }
        // ------------------------------------
        if (messages.type === 'text' && messages.text.body) {
            // save message to model
            const { message, chat } = await (0, chatMessage_service_1.createMessageService)({
                senderId: customer._id.toString(),
                receiverId: defaultValues.assigned_agent,
                content: messages.text.body,
                chatId: null,
                source: defaultValues.source
            });
            console.log('message created', message);
            console.log('chat created', chat);
            // emit event with socket
            const io = (0, index_1.getSocketInstance)();
            if (io) {
                console.log('io instance found, emitting newMessage event');
                io.to(chat._id.toString()).emit('newMessage', { ...message.toObject(), sender: null, chat });
            }
        }
        // ------------------------------------
        if (userState?.state === 'in_agent_chat') {
            res.sendStatus(200);
            return;
        }
        // ------------------------------------
        // Handle button replies with switch
        if (messages.type === 'interactive' && messages.interactive.type === 'button_reply') {
            const selectedId = messages.interactive.button_reply.id;
            // save message to model
            await (0, chatMessage_service_1.createMessageService)({
                senderId: customer._id.toString(),
                receiverId: defaultValues.assigned_agent,
                content: selectedId,
                chatId: null,
                source: defaultValues.source
            });
            switch (selectedId) {
                case 'already_customer':
                    await (0, wp_service_1.sendReplyButtons)(from, [
                        { type: "reply", reply: { id: "get_support", title: "Get Support" } },
                        { type: "reply", reply: { id: "buy_product", title: "Buy Product" } }
                    ], "Welcome back! What would you like to do?");
                    await wpUserState_model_1.default.findOneAndUpdate({ wpId: from }, { state: 'customer_options' }, { upsert: true });
                    break;
                case 'not_yet_customer':
                    await (0, wp_service_1.sendReplyMessage)(from, "Which product are you interested in?", messages.id);
                    await wpUserState_model_1.default.findOneAndUpdate({ wpId: from }, { state: 'awaiting_lead' }, { upsert: true });
                    break;
                case 'get_support':
                    await (0, wp_service_1.sendReplyMessage)(from, "Please describe your issue. We'll create a support ticket for you.", messages.id);
                    await wpUserState_model_1.default.findOneAndUpdate({ wpId: from }, { state: 'awaiting_ticket' }, { upsert: true });
                    break;
                case 'buy_product':
                    await (0, wp_service_1.sendReplyMessage)(from, "Which product are you interested in?", messages.id);
                    await wpUserState_model_1.default.findOneAndUpdate({ wpId: from }, { state: 'awaiting_lead' }, { upsert: true });
                    break;
                default:
                    await (0, wp_service_1.sendReplyMessage)(from, "Sorry, I didn't understand your selection.", messages.id);
                    break;
            }
            res.sendStatus(200);
            return;
        }
        // ------------------------------------
        console.info('userState', userState);
        // Handle text replies
        if (userState?.state === 'awaiting_ticket' && messages.type === 'text') {
            const customer = await customer_model_1.default.findOne({ phone_number: from }).select('_id').lean();
            if (!customer) {
                await (0, wp_service_1.sendReplyMessage)(from, "Sorry, we couldn't find your customer record. Please contact support.", messages.id);
                await wpUserState_model_1.default.findOneAndUpdate({ wpId: from }, { state: 'in_agent_chat' });
                res.sendStatus(200);
                return;
            }
            const ticket = await ticket_model_1.default.create({
                title: messages.text.body.substring(0, 30),
                description: messages.text.body,
                source: defaultValues.source,
                assigned_agent: defaultValues.assigned_agent,
                customer: customer._id,
                category: defaultValues.category,
            });
            await (0, wp_service_1.sendReplyMessage)(from, `Thank you! Your ticket has been created. Ticket ID: ${ticket._id.toString().slice(-6)}. You will be contacted shortly.`, messages.id);
            await wpUserState_model_1.default.findOneAndUpdate({ wpId: from }, { state: 'in_agent_chat' });
            res.sendStatus(200);
            return;
        }
        // ------------------------------------
        if (userState?.state === 'awaiting_lead' && messages.type === 'text') {
            // createLead(...)
            console.log('awaiting lead body', messages.text.body);
            await (0, wp_service_1.sendReplyMessage)(from, "Thank you! Our team will contact you soon.", messages.id);
            await wpUserState_model_1.default.findOneAndUpdate({ wpId: from }, { state: 'in_agent_chat' });
            res.sendStatus(200);
            return;
        }
        // ------------------------------------
        await (0, wp_service_1.sendReplyButtons)(from, [
            { type: "reply", reply: { id: "already_customer", title: "Already a Customer" } },
            { type: "reply", reply: { id: "not_yet_customer", title: "Not Yet a Customer" } }
        ], "Hi! To help you better, please let us know if you're an existing customer or interested in our products.");
        res.sendStatus(200);
    }
};
exports.handlePostRequest = handlePostRequest;
//# sourceMappingURL=webhook.controller.js.map