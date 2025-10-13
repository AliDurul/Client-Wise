import { Router } from 'express';
import {  getEmailById,  getEmails, getEmailStats, modifyEmail, sendEmail } from '../controllers/email.controller';

const router = Router();

// URL: /emails

router.route('/')
    .get(getEmails)
    .post(sendEmail);

router.get('/stats', getEmailStats);

router.route('/:id')
    .put(modifyEmail)
    .get(getEmailById);


export default router;