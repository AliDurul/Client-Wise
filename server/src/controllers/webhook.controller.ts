import { CustomError } from "../utils/common";
import env from "../configs/env";
import { Request, Response } from "express";
import { sendReplyButtons, sendReplyMessage, sendTextMessage } from "../services/wp.service";
import Ticket from "../models/ticket.model";
import Customer from "../models/customer.model";

export const handleGetRequest = (req: Request, res: Response) => {
    const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

    if (mode === 'subscribe' && token === env.WEB_HOOK_VERIFY_TOKEN) {
        console.log('WEBHOOK VERIFIED');
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
};

let userState: Record<string, string> = {};
export const handlePostRequest = async (req: Request, res: Response) => {

    const { entry } = req.body;
    if (!entry || !Array.isArray(entry) || entry.length === 0) throw new CustomError('Invalid webhook data', 400, true);

    const changes = entry[0].changes;
    if (!changes || !Array.isArray(changes) || changes.length === 0) throw new CustomError('Invalid webhook data', 400, true);

    const statuses = changes[0].value.statuses ? changes[0].value.statuses[0] : null;
    const messages = changes[0].value.messages ? changes[0].value.messages[0] : null;
    const from = messages ? messages.from : null;

    if (messages) {
        // Handle button replies with switch
        if (messages.type === 'interactive' && messages.interactive.type === 'button_reply') {
            const selectedId = messages.interactive.button_reply.id;

            switch (selectedId) {
                case 'already_customer':
                    await sendReplyButtons(
                        from,
                        [
                            { type: "reply", reply: { id: "get_support", title: "Get Support" } },
                            { type: "reply", reply: { id: "buy_product", title: "Buy Product" } }
                        ],
                        "Welcome back! What would you like to do?"
                    );
                    userState[from] = 'customer_options';
                    break;

                case 'not_yet_customer':
                    await sendReplyMessage(from, "Which product are you interested in?", messages.id);
                    userState[from] = 'awaiting_lead';
                    break;

                case 'get_support':
                    await sendReplyMessage(from, "Please describe your issue. We'll create a support ticket for you.", messages.id);
                    userState[from] = 'awaiting_ticket';
                    break;

                case 'buy_product':
                    await sendReplyMessage(from, "Which product are you interested in?", messages.id);
                    userState[from] = 'awaiting_lead';
                    break;

                default:
                    await sendReplyMessage(from, "Sorry, I didn't understand your selection.", messages.id);
                    break;
            }
            res.status(200).end();
            return;
        }

        console.info('userState', userState);

        // Handle text replies
        if (userState[from] === 'awaiting_ticket' && messages.type === 'text') {

            const customer = await Customer.findOne({ phone_number: from }).select('_id').lean();

            if (!customer) {
                await sendReplyMessage(from, "Sorry, we couldn't find your customer record. Please contact support.", messages.id);
                userState[from] = '';
                res.status(200).end();
                return;
            }

            const ticket = await Ticket.create({
                title: messages.text.body.substring(0, 50),
                description: messages.text.body,
                source: 'whatsapp',
                assigned_agent: "68baa5a729e7a4f116048fd9",
                customer: customer._id,
                category: "68baa5a829e7a4f116049003", 
            });

            await sendReplyMessage(from, `Thank you! Your ticket has been created. Ticket ID: ${ticket._id.toString().slice(-6)}`, messages.id);
            userState[from] = '';
            res.status(200).end();
            return;
        }

        if (userState[from] === 'awaiting_lead' && messages.type === 'text') {
            // createLead(...)
            console.log('awaiting lead body', messages.text.body);
            await sendReplyMessage(from, "Thank you! Our team will contact you soon.", messages.id);
            userState[from] = '';
            res.status(200).end();
            return;
        }

        try {
            await sendReplyButtons(
                from,
                [
                    { type: "reply", reply: { id: "already_customer", title: "Already a Customer" } },
                    { type: "reply", reply: { id: "not_yet_customer", title: "Not Yet a Customer" } }
                ],
                "Hi! To help you better, please let us know if you're an existing customer or interested in our products."
            );
        } catch (err: any) {
            console.error('WhatsApp API error:', err.response?.data || err.message);
        }
        res.status(200).end();
    }
}