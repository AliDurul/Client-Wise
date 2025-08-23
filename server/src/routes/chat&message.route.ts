import { Router } from "express";
import { createMessage, deleteChat, getChatMessages, getChats } from "../controllers/chat&message.controller";

const router = Router();


router.get("/", getChats);

router.route('/:chatId')
    .delete(deleteChat);

// router.post("/group",  createGroup)
// router.route('/group/:groupId').put(updateGroup)


router.route('/message/:chatId')
    .get(getChatMessages)
    .post(createMessage);

export default router;