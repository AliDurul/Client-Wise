"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrFindChat = createOrFindChat;
exports.createMessageService = createMessageService;
const chatMessage_model_1 = require("../models/chatMessage.model");
const common_1 = require("../utils/common");
async function createOrFindChat(senderId, receiverId, chatId, source = 'internal') {
    let chat;
    if (chatId && chatId !== "null") {
        chat = await chatMessage_model_1.Chat.findById(chatId);
        if (!chat)
            throw new common_1.CustomError(`Chat not Found with ID: ${chatId}`, 404, true);
    }
    else {
        if (!receiverId)
            throw new common_1.CustomError('Receiver is required.', 401, true);
        if (source === 'whatsapp') {
            // For WhatsApp, senderId is customer, receiverId is agent
            chat = await chatMessage_model_1.Chat.findOneAndUpdate({
                is_group: false,
                source: 'whatsapp',
                customer: senderId,
                users: [receiverId]
            }, {
                $setOnInsert: {
                    source: 'whatsapp',
                    is_group: false,
                    users: [receiverId],
                    customer: senderId
                }
            }, { new: true, upsert: true });
        }
        else {
            // For internal chat, both are users
            chat = await chatMessage_model_1.Chat.findOneAndUpdate({
                is_group: false,
                source: 'internal',
                $or: [
                    { users: [senderId, receiverId] },
                    { users: [receiverId, senderId] }
                ]
            }, {
                $setOnInsert: {
                    source: 'internal',
                    is_group: false,
                    users: [senderId, receiverId],
                    customer: null
                }
            }, { new: true, upsert: true });
        }
    }
    return chat;
}
async function createMessageService({ senderId, receiverId, content, chatId, source = 'internal', }) {
    if (!content)
        throw new common_1.CustomError('Content is required.', 400, true);
    const chat = await createOrFindChat(senderId, receiverId, chatId, source);
    console.log('chat:', chat);
    const message = await chatMessage_model_1.Message.create({
        chat: chat._id,
        sender: senderId,
        content
    });
    console.log('message:', message);
    if (!message)
        throw new common_1.CustomError('Message not created', 404, true);
    let updatedChat;
    if (source === 'whatsapp') {
        updatedChat = await chatMessage_model_1.Chat.findByIdAndUpdate(chat._id, { latest_message: message._id }, { new: true }).populate([
            { path: 'latest_message', select: '-chat -__v -sender -updatedAt' }
        ]);
    }
    else {
        updatedChat = await chatMessage_model_1.Chat.findByIdAndUpdate(chat._id, { latest_message: message._id }, { new: true }).populate([
            { path: 'latest_message', select: '-chat -__v -sender -updatedAt' },
            { path: 'users', select: 'first_name last_name full_name email phone_number profile_pic' }
        ]);
        if (!updatedChat)
            throw new common_1.CustomError('Chat not found after creating message', 404, true);
        await Promise.all(updatedChat.users.map(async (user) => {
            if ((user._id.toString() !== senderId) && user.profile_pic) {
                user.profile_pic = await (0, common_1.getImageUrl)(user.profile_pic);
            }
        }));
        if (updatedChat.is_group && updatedChat.chat_pic) {
            updatedChat.chat_pic = await (0, common_1.getImageUrl)(updatedChat.chat_pic);
        }
    }
    return { message, chat: updatedChat };
}
//# sourceMappingURL=chatMessage.service.js.map