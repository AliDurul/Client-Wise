import { Request, Response } from "express";
import { Chat, ChatUser, IChat, Message } from "../models/chat&message.model";
import { CustomError, getImageUrl, s3 } from "../utils/common";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import crypto from 'crypto';
import sharp from 'sharp';
import env from '../configs/env';


export const getChats = async (req: Request, res: Response) => {

    const currenUser = req.user.id

    const result = await Chat.find({ users: { $in: [currenUser] } }).populate([
        { path: 'latest_message', select: '-chat -__v -sender -updatedAt' },
        { path: 'users', select: 'full_name email phone_number profile_pic' }
    ]).sort({ updatedAt: -1 }).lean();

    await Promise.all(result.map(async (chat: IChat) => {
        if (!chat.is_group) {
            await Promise.all(chat.users.map(async (user: ChatUser) => {
                if ((user._id.toString() !== currenUser) && user.profile_pic) {
                    user.profile_pic = await getImageUrl(user.profile_pic);
                }
            }));
        }
    }));

    res.status(200).send({
        success: true,
        result
    })
};

export const getChatMessages = async (req: Request, res: Response) => {

    const { chatId } = req.params;

    if (!chatId) throw new CustomError('Chat ID is required.', 400, true);

    const result = await Message.find({ chat: chatId }).populate([
        { path: 'sender', select: 'profile_pic full_name' },
        { path: 'chat', select: '-__v', populate: { path: 'users', select: 'profile_pic full_name' } }
    ]).lean();

    res.status(200).send({
        success: true,
        result
    })
};

export const createMessage = async (req: Request, res: Response) => {

    const { receiverId, content } = req.body;
    const { chatId } = req.params;
    const senderId = req.user.id;

    if (!content) throw new CustomError('Content is required.', 400, true);

    let chat: (IChat & Document) | null;

    if (chatId && chatId !== "null") {

        chat = await Chat.findById(chatId);
        if (!chat) throw new CustomError(`Chat not Found with ID: ${chatId}`, 404, true);

    } else {
        if (!receiverId) throw new CustomError('Receiver is required.', 401, true);

        chat = await Chat.findOneAndUpdate(
            {
                is_group: false,
                $or: [
                    { users: [senderId, receiverId] },
                    { users: [receiverId, senderId] }
                ]
            },
            { $setOnInsert: { is_group: false, users: [senderId, receiverId] } },
            { new: true, upsert: true }
        );
    }

    const message = await Message.create({
        chat: chat._id,
        sender: senderId,
        content
    });

    if (!message) throw new CustomError('Message not created', 404, true);

    chat = await Chat.findByIdAndUpdate(chat._id, { latest_message: message._id }, { new: true });

    if (!chat) throw new CustomError('Chat not found after creating message', 404, true);

    res.status(200).send({
        success: true,
        message,
        chat
    })
};

export const createGroup = async (req: Request, res: Response) => {
    const { users, chat_name } = req.body;
    const currentUser = req.user.id;

    if (!users || !Array.isArray(users) || users.length <= 1) throw new CustomError('User IDs are required to create a group.', 400, true);

    if (!chat_name) throw new CustomError('Chat name is required.', 400, true);

    const chat = await Chat.create({
        is_group: true,
        users: [...users, currentUser],
        group_admin: currentUser,
        chat_name
    });

    if (!chat) throw new CustomError('Group chat not created', 404, true);

    if (req.file && req.file.size > 0 && req.file.buffer) {
        const randomSuffix = crypto.randomBytes(8).toString('hex');
        const fileName = `group_pics/${randomSuffix}_${req.file.originalname}`;

        const buffer = await sharp(req.file.buffer).resize({ height: 90, width: 90, fit: 'contain' }).toBuffer();

        const params = {
            Bucket: env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: req.file.mimetype
        };
        const command = new PutObjectCommand(params)

        await s3.send(command);

        chat.chat_pic = fileName
        await chat.save();
    }

    res.status(201).send({
        success: true,
        chat
    });
}

export const deleteChat = async (req: Request, res: Response) => {

    const { chatId } = req.params;

    if (!chatId) throw new CustomError('Chat ID is required.', 400, true);

    const result = await Chat.deleteOne({ _id: chatId });

    if (result.deletedCount > 0) {
        res.sendStatus(204);
    }

    throw new CustomError('Chat not found.', 404, true);

};


