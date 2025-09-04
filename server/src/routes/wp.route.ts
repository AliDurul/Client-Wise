import { imgMessage, templateMessage, textMessage } from '../controllers/wp.controller';
import { Router } from 'express';

const router = Router();

// -> /api/v1/wp

router.all('/template', templateMessage);
router.post('/text/:to', textMessage);
router.all('/image', imgMessage);

export default router;