"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_message_controller_1 = require("../controllers/chat&message.controller");
const common_1 = require("../utils/common");
const router = (0, express_1.Router)();
// chats
router.get("/", chat_message_controller_1.getChats);
router.route('/:chatId')
    .delete(chat_message_controller_1.deleteChat);
router.route('/:chatId/messages')
    .get(chat_message_controller_1.getChatMessages)
    .post(chat_message_controller_1.createMessage);
router.post("/group", common_1.upload.single("chat_pic"), chat_message_controller_1.createGroup);
router.route('/group/:groupId')
    .get(chat_message_controller_1.getGroupInfo)
    .put(common_1.upload.single("chat_pic"), chat_message_controller_1.updateGroup);
exports.default = router;
//# sourceMappingURL=chat&message.route.js.map