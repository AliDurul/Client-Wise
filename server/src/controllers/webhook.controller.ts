import { Request, Response } from "express";

const verifyToken = process.env.VERIFY_TOKEN;

export const handleGetRequest = (req: Request, res: Response) => {
    const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

    console.log('web hook api');
    res.status(200).send('web hook works')
    // if (mode === 'subscribe' && token === verifyToken) {
    //     console.log('WEBHOOK VERIFIED');
    //     res.status(200).send(challenge);
    // } else {
    //     res.status(403).end();
    // }
};


export const handlePostRequest = (req: Request, res: Response) => {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    console.log(`\n\nWebhook received ${timestamp}\n`);
    console.log(JSON.stringify(req.body, null, 2));
    res.status(200).end();
}