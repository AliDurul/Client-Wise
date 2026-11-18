import { Router } from 'express';
import {  getEmailById,  getEmails, getEmailStats, modifyEmail, sendEmail } from '../controllers/email.controller';

import { requireAuth } from '../middlewares/common';

const router = Router();

// URL: /emails
// These routes read and send mail from the connected Gmail account, so they require a signed-in user.
router.use(requireAuth);

router.route('/')
    .get(getEmails)
    .post(sendEmail);

router.get('/stats', getEmailStats);

router.route('/:id')
    .put(modifyEmail)
    .get(getEmailById);


export default router;