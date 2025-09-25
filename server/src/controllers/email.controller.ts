import { Request, Response } from 'express';
import { getEmailByIdService, getEmailsService, modifyEmailService, sendEmailService } from '../services/email.service';
import { modifyMessage } from '../utils/functions';
import { CustomError } from '../utils/common';
import { sendEmailSchema } from '../utils/validationSchemas';


export async function getEmails(req: Request, res: Response) {


    const result = await getEmailsService();

    const transformed = result.map(modifyMessage);

    res.status(200).send({ success: true, result: transformed });
}


export async function modifyEmail(req: Request, res: Response) {
    const { id } = req.params;
    const { read, starred, important } = req.body;

    await modifyEmailService(id, { read, starred, important });

    res.status(200).send({ success: true });
}

export const getEmailById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const message = await getEmailByIdService(id);

    if (!message) throw new CustomError('Email not found', 404, true);


    res.status(200).send({ success: true, result: modifyMessage(message) });
};

export const sendEmail = async (req: Request, res: Response) => {
    // Validate request body
    const validation = sendEmailSchema.safeParse(req.body);
    
    if (!validation.success)
        throw new CustomError(validation.error.errors.map(e => e.message).join(', '), 400, true);


    const { to, subject, textBody, htmlBody, cc, bcc, attachments = [] } = validation.data;

    const result = await sendEmailService({
        to,
        subject,
        textBody,
        htmlBody,
        cc,
        bcc,
        attachments
    });

    res.status(200).send({
        success: true,
        message: 'Email sent successfully',
        result: {
            messageId: result.messageId,
            threadId: result.threadId
        }
    });

};