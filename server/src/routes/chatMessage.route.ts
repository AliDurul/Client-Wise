import { Router } from "express";
import { createGroup, createMessage, deleteChat, getChatMessages, getChats, getGroupInfo, updateGroup } from "../controllers/chatMessage.controller";
import { upload } from "../utils/common";

const router = Router();

// chats

router.get("/", getChats);

router.route('/:chatId')
    .delete(deleteChat);

router.route('/:chatId/messages')
    .get(getChatMessages)
    .post(createMessage);

router.post("/group", upload.single("chat_pic"), createGroup);
router.route('/group/:groupId')
    .get(getGroupInfo)
    .put(upload.single("chat_pic"), updateGroup);

export default router;