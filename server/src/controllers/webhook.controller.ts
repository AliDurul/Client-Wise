import { CustomError } from "../utils/common";
import env from "../configs/env";
import { Request, Response } from "express";
import { sendListMessage, sendReplyButton, sendReplyMessage, sendTextMessage } from "../services/wp.service";

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


export const handlePostRequest = (req: Request, res: Response) => {

    const { entry } = req.body;
    if (!entry || !Array.isArray(entry) || entry.length === 0) throw new CustomError('Invalid webhook data', 400, true);

    const changes = entry[0].changes;
    if (!changes || !Array.isArray(changes) || changes.length === 0) throw new CustomError('Invalid webhook data', 400, true);

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
                sendReplyMessage(messages.from, 'Hello! How can I assist you today?', messages.id);
            }

            if (messages.text.body.toLowerCase() === 'list') {
                sendListMessage(messages.from);
            }

            if (messages.text.body.toLowerCase() === 'buttons') {
                sendReplyButton(messages.from);
            }
        }

        if (messages.type === 'interactive') {
            if (messages.interactive.type === 'list_reply') {
                const selectedId = messages.interactive.list_reply.id;
                sendReplyMessage(messages.from, `You selected item with id: ${selectedId}`, messages.id);
            }
            if (messages.interactive.type === 'button_reply') {
                const selectedId = messages.interactive.button_reply.id;
                sendReplyMessage(messages.from, `You selected button with id: ${selectedId}`, messages.id);
            }

        }

        console.log(JSON.stringify(req.body, null, 2));
        res.status(200).end();
    }
}