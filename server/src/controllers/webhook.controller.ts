import { CustomError } from "../utils/common";
import env from "../configs/env";
import { Request, Response } from "express";
import { sendIntroButtons, sendListMessage, sendReplyButton, sendReplyMessage, sendTextMessage } from "../services/wp.service";

export const handleGetRequest = (req: Request, res: Response) => {
    const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

    console.log('web hook api');

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

    // handle received message
    if (messages) {
        // Handle button replies
        if (messages.type === 'interactive' && messages.interactive.type === 'button_reply') {
            const selectedId = messages.interactive.button_reply.id;

            if (selectedId === 'already_customer') {
                // Ask what the customer wants
                await sendReplyButton(from, [
                    { id: "get_support", title: "Get Support" },
                    { id: "buy_product", title: "Buy Product" }
                ], "Welcome back! What would you like to do?");
                userState[from] = 'customer_options';
                res.status(200).end();
                return;
            }

            if (selectedId === 'interested_products') {
                await sendReplyMessage(from, "Which product are you interested in?", messages.id);
                userState[from] = 'awaiting_lead';
                res.status(200).end();
                return;
            }

            if (selectedId === 'get_support') {
                await sendReplyMessage(from, "Please describe your issue. We'll create a support ticket for you.", messages.id);
                userState[from] = 'awaiting_ticket';
                res.status(200).end();
                return;
            }

            if (selectedId === 'buy_product') {
                await sendReplyMessage(from, "Which product are you interested in?", messages.id);
                userState[from] = 'awaiting_lead';
                res.status(200).end();
                return;
            }
        }

        // Handle text replies
        if (userState[from] === 'awaiting_ticket' && messages.type === 'text') {
            // createTicket(...)
            await sendReplyMessage(from, "Thank you! Your ticket has been created.", messages.id);
            userState[from] = '';
            res.status(200).end();
            return;
        }

        if (userState[from] === 'awaiting_lead' && messages.type === 'text') {
            // createLead(...)
            await sendReplyMessage(from, "Thank you! Our team will contact you soon.", messages.id);
            userState[from] = '';
            res.status(200).end();
            return;
        }

        // Default: send intro buttons
        await sendIntroButtons(from);
        res.status(200).end();
    }

}