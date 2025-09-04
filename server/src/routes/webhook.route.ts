import { handleGetRequest, handlePostRequest } from "../controllers/webhook.controller";
import { Router } from "express";

const router = Router();

//-> /api/webhook

router.get('/', handleGetRequest)
router.post('/', handlePostRequest)

export default router;