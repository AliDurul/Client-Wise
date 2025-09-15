import { Request, Response } from 'express';
import { listGmailLabels, listGmailMessages } from '../services/gmail.service';

export async function getGmailMessages(req: Request, res: Response) {
    const messages = await listGmailMessages();
    
    res.json({ success: true, messages });
}

export async function getGmailLabels(req: Request, res: Response) {
    const labels = await listGmailLabels();
    res.json({ success: true, labels });
}