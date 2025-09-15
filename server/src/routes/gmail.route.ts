import { Router } from 'express';
import { getGmailLabels, getGmailMessages } from '../controllers/gmail.controller';

const router = Router();
router.get('/messages', getGmailMessages);
router.get('/labels', getGmailLabels);

export default router;