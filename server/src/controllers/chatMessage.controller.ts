import { Request, Response } from "express";
import { Chat, ChatUser, IChat, IMessage, Message } from "../models/chatMessage.model";
import { CustomError, getImageUrl, s3 } from "../utils/common";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import crypto from 'crypto';
import sharp from 'sharp';
import env from '../configs/env';
import { createMessageService } from "../services/chatMessage.service";


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
        } else {
            if (chat.chat_pic) {
                chat.chat_pic = await getImageUrl(chat.chat_pic);
            }
        }
    }));

    res.status(200).send({
        success: true,
        result
    })
};

export const getGroupInfo = async (req: Request, res: Response) => {

    const { groupId } = req.params;

    const result = await Chat.findById(groupId).populate([
        { path: 'users', select: 'full_name email phone_number profile_pic' },
        { path: 'group_admin', select: 'full_name email phone_number profile_pic' }
    ]).lean();

    if (!result) throw new CustomError(`Group not found with ID: ${groupId}`, 404, true);



    if (result.chat_pic) {
        result.chat_pic = await getImageUrl(result.chat_pic);
    }

    // if (result.group_admin.profile_pic) {
    //     result.group_admin.profile_pic = await getImageUrl(result.group_admin.profile_pic);
    // }

    await Promise.all(
        result.users.map(async (user: ChatUser) => {
            if (user.profile_pic) {
                user.profile_pic = await getImageUrl(user.profile_pic);
            }
        })
    );






    res.status(200).send({
        success: true,
        result
    });
};

export const getChatMessages = async (req: Request, res: Response) => {

    const { chatId } = req.params;
    const currenUser = req.user.id

    if (!chatId) throw new CustomError('Chat ID is required.', 400, true);

    const result = await Message.find({ chat: chatId }).populate([
        { path: 'sender', select: 'profile_pic full_name' },
        { path: 'chat', select: '-__v', populate: { path: 'users', select: 'profile_pic full_name' } }
    ]).lean();


    await Promise.all(result.map(async (chat: IMessage) => {
        if ((chat.sender._id.toString() !== currenUser) && chat.sender.profile_pic) {
            chat.sender.profile_pic = await getImageUrl(chat.sender.profile_pic);
        }
    }));

    res.status(200).send({
        success: true,
        result
    })
};

export const createMessage = async (req: Request, res: Response) => {

    const { receiverId, content } = req.body;
    const { chatId } = req.params;
    const senderId = req.user.id;

    const { message, chat } = await createMessageService({
        senderId,
        receiverId,
        content,
        chatId
    });

    res.status(200).send({
        success: true,
        message,
        chat
    })
};

export const createGroup = async (req: Request, res: Response) => {
    const { users, chat_name } = req.body;
    const currentUser = req.user.id;
    let chat_pic = null;

    if (!users || !Array.isArray(users) || users.length <= 1) throw new CustomError('User IDs are required to create a group.', 400, true);

    if (!chat_name) throw new CustomError('Chat name is required.', 400, true);

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

        chat_pic = fileName
    }

    const chat = await Chat.create({
        is_group: true,
        users: [...users, currentUser],
        group_admin: currentUser,
        chat_name,
        chat_pic
    });

    if (!chat) throw new CustomError('Group chat not created', 404, true);

    res.status(201).send({
        success: true,
        chat
    });
}

export const deleteChat = async (req: Request, res: Response) => {

    const { chatId } = req.params;

    if (!chatId) throw new CustomError('Chat ID is required.', 400, true);

    // Delete all messages for this chat
    await Message.deleteMany({ chat: chatId });

    // Delete the chat itself
    const result = await Chat.deleteOne({ _id: chatId });

    if (result.deletedCount > 0) {
        res.sendStatus(204);
    }

    throw new CustomError('Chat not found.', 404, true);

};


export const updateGroup = async (req: Request, res: Response) => {
    const { groupId } = req.params;
    const { chat_name, users } = req.body;
    const currentUser = req.user.id;

    if (!groupId) throw new CustomError('Group ID is required.', 400, true);

    const group = await Chat.findById(groupId);

    if (!group) throw new CustomError('Group not found.', 404, true);

    group.chat_name = chat_name || group.chat_name;
    let updatedUsers = users || group.users;
    if (!updatedUsers.includes(currentUser)) {
        updatedUsers.push(currentUser);
    }
    group.users = updatedUsers;

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

        group.chat_pic = fileName
    }

    await group.save();

    res.status(200).send({
        success: true,
        group
    });
};
