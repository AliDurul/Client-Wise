import { Chat, IChat, Message, IMessage, ChatUser } from "../models/chatMessage.model";
import { CustomError, getImageUrl } from "../utils/common";
import { HydratedDocument } from "mongoose";

export async function createOrFindChat(senderId: string, receiverId: string, chatId?: string, source: 'internal' | 'whatsapp' = 'internal'): Promise<HydratedDocument<IChat>> {
    let chat: HydratedDocument<IChat> | null;

    if (chatId && chatId !== "null") {
        chat = await Chat.findById(chatId);
        if (!chat) throw new CustomError(`Chat not Found with ID: ${chatId}`, 404, true);

    } else {
        if (!receiverId) throw new CustomError('Receiver is required.', 401, true);

        if (source === 'whatsapp') {
            // For WhatsApp, senderId is customer, receiverId is agent
            chat = await Chat.findOneAndUpdate(
                {
                    is_group: false,
                    source: 'whatsapp',
                    customer: senderId,
                    users: [receiverId]
                },
                {
                    $setOnInsert: {
                        source: 'whatsapp',
                        is_group: false,
                        users: [receiverId],
                        customer: senderId
                    }
                },
                { new: true, upsert: true }
            );
        } else {
            // For internal chat, both are users
            chat = await Chat.findOneAndUpdate(
                {
                    is_group: false,
                    source: 'internal',
                    $or: [
                        { users: [senderId, receiverId] },
                        { users: [receiverId, senderId] }
                    ]
                },
                {
                    $setOnInsert: {
                        source: 'internal',
                        is_group: false,
                        users: [senderId, receiverId],
                        customer: null
                    }
                },
                { new: true, upsert: true }
            );
        }
    }
    return chat;
}

export async function createMessageService({
    senderId,
    receiverId,
    content,
    chatId,
    source = 'internal',
}: {
    senderId: string,
    receiverId?: string,
    content: string,
    chatId?: string
    source?: 'internal' | 'whatsapp',
}) {

    if (!content) throw new CustomError('Content is required.', 400, true);

    const chat = await createOrFindChat(senderId, receiverId!, chatId, source);

    const message = await Message.create({
        chat: chat._id,
        sender: senderId,
        content
    });

    if (!message) throw new CustomError('Message not created', 404, true);

    let updatedChat: HydratedDocument<IChat> | null;
    if (source === 'whatsapp') {

        updatedChat = await Chat.findByIdAndUpdate(chat._id, { latest_message: message._id }, { new: true }).populate([
            { path: 'latest_message', select: '-chat -__v -sender -updatedAt' }
        ]);

    } else {

        updatedChat = await Chat.findByIdAndUpdate(chat._id, { latest_message: message._id }, { new: true }).populate([
            { path: 'latest_message', select: '-chat -__v -sender -updatedAt' },
            { path: 'users', select: 'first_name last_name full_name email phone_number profile_pic' }
        ]);

        if (!updatedChat) throw new CustomError('Chat not found after creating message', 404, true);

        await Promise.all(updatedChat.users.map(async (user: ChatUser) => {
            if ((user._id.toString() !== senderId) && user.profile_pic) {
                user.profile_pic = await getImageUrl(user.profile_pic);
            }
        }));

        if (updatedChat.is_group && updatedChat.chat_pic) {
            updatedChat.chat_pic = await getImageUrl(updatedChat.chat_pic);
        }
    }


    return { message, chat: updatedChat };
}