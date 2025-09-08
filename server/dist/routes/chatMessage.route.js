"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatMessage_controller_1 = require("../controllers/chatMessage.controller");
const common_1 = require("../utils/common");
const router = (0, express_1.Router)();
// chats
router.get("/", chatMessage_controller_1.getChats);
router.route('/:chatId')
    .delete(chatMessage_controller_1.deleteChat);
router.route('/:chatId/messages')
    .get(chatMessage_controller_1.getChatMessages)
    .post(chatMessage_controller_1.createMessage);
router.post("/group", common_1.upload.single("chat_pic"), chatMessage_controller_1.createGroup);
router.route('/group/:groupId')
    .get(chatMessage_controller_1.getGroupInfo)
    .put(common_1.upload.single("chat_pic"), chatMessage_controller_1.updateGroup);
exports.default = router;
//# sourceMappingURL=chatMessage.route.js.map