"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    chat_name: { type: String, trim: true, default: null },
    is_group: { type: Boolean, default: false },
    chat_pic: { type: String, default: null },
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    latest_message: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Message', default: null },
    group_admin: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
    source: { type: String, enum: ['internal', 'whatsapp'], default: 'internal' },
    wpId: { type: String, default: null },
}, { collection: 'chats', timestamps: true });
exports.Chat = (0, mongoose_1.model)('Chat', chatSchema);
// ----------------------------------------
const messageSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, trim: true },
    chat: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Chat' },
}, { collection: 'messages', timestamps: true });
exports.Message = (0, mongoose_1.model)('Message', messageSchema);
//# sourceMappingURL=chatMessage.model.js.map