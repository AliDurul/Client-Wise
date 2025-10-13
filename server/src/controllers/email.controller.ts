import { Request, Response } from 'express';
import { getEmailByIdService, getEmailsService, modifyEmailService, sendEmailService } from '../services/email.service';
import { getEmailStatsService } from '../services/email.service';
import { modifyMessage } from '../utils/functions';
import { CustomError } from '../utils/common';
import { sendEmailSchema } from '../utils/validationSchemas';

export async function getEmails(req: Request, res: Response) {

    const {
        page = '1',
        limit = '20',
        pageToken,
        labelIds,
        q,
        includeSpamTrash = 'false'
    } = req.query;

    // Parse and validate query parameters
    const queryParams = {
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        pageToken: pageToken as string | undefined,
        labelIds: labelIds ? (labelIds as string).split(',').filter(Boolean) : undefined,
        q: q as string,
        includeSpamTrash: includeSpamTrash === 'true'
    };

    console.log(queryParams);
    // Validate pagination parameters
    if (isNaN(queryParams.page) || queryParams.page < 1) {
        throw new CustomError('Invalid page number', 400, true);
    }

    if (isNaN(queryParams.limit) || queryParams.limit < 1 || queryParams.limit > 50) {
        throw new CustomError('Invalid limit. Must be between 1 and 50', 400, true);
    }

    const result = await getEmailsService(queryParams);

    const transformed = result.emails.map(modifyMessage);

    res.status(200).send({
        success: true,
        details: result.pagination,
        result: transformed
    });
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

export const getEmailStats = async (req: Request, res: Response) => {
    const stats = await getEmailStatsService();

    res.status(200).send({ success: true, result: stats.counts });
};