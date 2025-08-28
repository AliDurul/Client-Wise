"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_message_controller_1 = require("../controllers/chat&message.controller");
const router = (0, express_1.Router)();
router.get("/", chat_message_controller_1.getChats);
router.route('/:chatId')
    .delete(chat_message_controller_1.deleteChat);
router.route('/:chatId/messages')
    .get(chat_message_controller_1.getChatMessages)
    .post(chat_message_controller_1.createMessage);
router.post("/group", chat_message_controller_1.createGroup);
// router.route('/group/:groupId').put(updateGroup)
exports.default = router;
//# sourceMappingURL=chat&message.route.js.map