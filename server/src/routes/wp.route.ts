import { sendImgMessage, sendTemplateMessage, sendTextMessage } from '../controllers/wp.controller';
import { Router } from 'express';

const router = Router();

// -> /api/v1/wp

router.all('/template', sendTemplateMessage);
router.all('/text', sendTextMessage);
router.all('/image', sendImgMessage);

export default router;