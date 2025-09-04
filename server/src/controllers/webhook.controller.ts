import env from "../configs/env";
import { Request, Response } from "express";

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
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    console.log(`\n\nWebhook received ${timestamp}\n`);
    console.log(JSON.stringify(req.body, null, 2));
    res.status(200).end();
}