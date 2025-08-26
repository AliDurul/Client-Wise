import { Router } from "express";
import { createGroup, createMessage, deleteChat, getChatMessages, getChats } from "../controllers/chat&message.controller";

const router = Router();


router.get("/", getChats);

router.route('/:chatId')
    .delete(deleteChat);

router.route('/:chatId/messages')
    .get(getChatMessages)
    .post(createMessage);

router.post("/group", createGroup)
// router.route('/group/:groupId').put(updateGroup)




export default router;