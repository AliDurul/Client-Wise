"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailStats = exports.sendEmail = exports.getEmailById = void 0;
exports.getEmails = getEmails;
exports.modifyEmail = modifyEmail;
const email_service_1 = require("../services/email.service");
const email_service_2 = require("../services/email.service");
const functions_1 = require("../utils/functions");
const common_1 = require("../utils/common");
const validationSchemas_1 = require("../utils/validationSchemas");
async function getEmails(req, res) {
    const { page = '1', limit = '20', pageToken, labelIds, q, includeSpamTrash = 'false' } = req.query;
    // Parse and validate query parameters
    const queryParams = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        pageToken: pageToken,
        labelIds: labelIds ? labelIds.split(',').filter(Boolean) : undefined,
        q: q,
        includeSpamTrash: includeSpamTrash === 'true'
    };
    // Validate pagination parameters
    if (isNaN(queryParams.page) || queryParams.page < 1) {
        throw new common_1.CustomError('Invalid page number', 400, true);
    }
    if (isNaN(queryParams.limit) || queryParams.limit < 1 || queryParams.limit > 50) {
        throw new common_1.CustomError('Invalid limit. Must be between 1 and 50', 400, true);
    }
    const result = await (0, email_service_1.getEmailsService)(queryParams);
    const transformed = result.emails.map(functions_1.modifyMessage);
    res.status(200).send({
        success: true,
        details: result.pagination,
        result: transformed
    });
}
async function modifyEmail(req, res) {
    const { id } = req.params;
    const { read, starred, important } = req.body;
    await (0, email_service_1.modifyEmailService)(id, { read, starred, important });
    res.status(200).send({ success: true });
}
const getEmailById = async (req, res) => {
    const { id } = req.params;
    const message = await (0, email_service_1.getEmailByIdService)(id);
    if (!message)
        throw new common_1.CustomError('Email not found', 404, true);
    res.status(200).send({ success: true, result: (0, functions_1.modifyMessage)(message) });
};
exports.getEmailById = getEmailById;
const sendEmail = async (req, res) => {
    // Validate request body
    const validation = validationSchemas_1.sendEmailSchema.safeParse(req.body);
    if (!validation.success)
        throw new common_1.CustomError(validation.error.errors.map(e => e.message).join(', '), 400, true);
    const { to, subject, textBody, htmlBody, cc, bcc, attachments = [] } = validation.data;
    const result = await (0, email_service_1.sendEmailService)({
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
exports.sendEmail = sendEmail;
const getEmailStats = async (req, res) => {
    const stats = await (0, email_service_2.getEmailStatsService)();
    res.status(200).send({ success: true, result: stats.counts });
};
exports.getEmailStats = getEmailStats;
//# sourceMappingURL=email.controller.js.map