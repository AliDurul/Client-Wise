"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGroup = exports.deleteChat = exports.createGroup = exports.createMessage = exports.getChatMessages = exports.getGroupInfo = exports.getChats = void 0;
const chatMessage_model_1 = require("../models/chatMessage.model");
const common_1 = require("../utils/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto_1 = __importDefault(require("crypto"));
const sharp_1 = __importDefault(require("sharp"));
const env_1 = __importDefault(require("../configs/env"));
const chatMessage_service_1 = require("../services/chatMessage.service");
const wp_service_1 = require("../services/wp.service");
const customer_model_1 = __importDefault(require("../models/customer.model"));
const getChats = async (req, res) => {
    const currenUser = req.user.id;
    const result = await chatMessage_model_1.Chat.find({ users: { $in: [currenUser] } }).populate([
        { path: 'latest_message', select: '-chat -__v -sender -updatedAt' },
        { path: 'users', select: 'full_name email phone_number profile_pic' },
        { path: 'customer', select: 'full_name email phone_number profile_pic' },
    ]).sort({ updatedAt: -1 }).lean();
    await Promise.all(result.map(async (chat) => {
        if (!chat.is_group) {
            await Promise.all(chat.users.map(async (user) => {
                if ((user._id.toString() !== currenUser) && user.profile_pic) {
                    user.profile_pic = await (0, common_1.getImageUrl)(user.profile_pic);
                }
            }));
        }
        else {
            if (chat.chat_pic) {
                chat.chat_pic = await (0, common_1.getImageUrl)(chat.chat_pic);
            }
        }
    }));
    res.status(200).send({
        success: true,
        result
    });
};
exports.getChats = getChats;
const getGroupInfo = async (req, res) => {
    const { groupId } = req.params;
    const result = await chatMessage_model_1.Chat.findById(groupId).populate([
        { path: 'users', select: 'full_name email phone_number profile_pic' },
        { path: 'group_admin', select: 'full_name email phone_number profile_pic' }
    ]).lean();
    if (!result)
        throw new common_1.CustomError(`Group not found with ID: ${groupId}`, 404, true);
    if (result.chat_pic) {
        result.chat_pic = await (0, common_1.getImageUrl)(result.chat_pic);
    }
    // if (result.group_admin.profile_pic) {
    //     result.group_admin.profile_pic = await getImageUrl(result.group_admin.profile_pic);
    // }
    await Promise.all(result.users.map(async (user) => {
        if (user.profile_pic) {
            user.profile_pic = await (0, common_1.getImageUrl)(user.profile_pic);
        }
    }));
    res.status(200).send({
        success: true,
        result
    });
};
exports.getGroupInfo = getGroupInfo;
const getChatMessages = async (req, res) => {
    const { chatId } = req.params;
    const currentUser = req.user.id;
    if (!chatId)
        throw new common_1.CustomError('Chat ID is required.', 400, true);
    const result = await chatMessage_model_1.Message.find({ chat: chatId }).populate([
        { path: 'chat', select: '-__v', populate: { path: 'users', select: 'profile_pic full_name' } },
        { path: 'sender', select: 'profile_pic full_name' },
    ]).lean();
    if (!result)
        throw new common_1.CustomError('No messages found for this chat.', 404, true);
    await Promise.all(result.map(async (message) => {
        if (message.chat.source === 'whatsapp')
            return;
        if ((message.sender._id.toString() !== currentUser) && message.sender.profile_pic) {
            message.sender.profile_pic = await (0, common_1.getImageUrl)(message.sender.profile_pic);
        }
    }));
    // const result = await Message.find({ chat: chatId }).populate([
    //     { path: 'sender', select: 'profile_pic full_name' },
    //     { path: 'chat', select: '-__v', populate: { path: 'users', select: 'profile_pic full_name' } }
    // ]).lean();
    // await Promise.all(result.map(async (chat: IMessage) => {
    //     if ((chat.sender._id.toString() !== currentUser) && chat.sender.profile_pic) {
    //         chat.sender.profile_pic = await getImageUrl(chat.sender.profile_pic);
    //     }
    // }));
    res.status(200).send({
        success: true,
        result
    });
};
exports.getChatMessages = getChatMessages;
const createMessage = async (req, res) => {
    const { receiverId, content } = req.body;
    const { chatId } = req.params;
    const senderId = req.user.id;
    const { message, chat } = await (0, chatMessage_service_1.createMessageService)({
        senderId,
        receiverId,
        content,
        chatId
    });
    if (chat.source === 'whatsapp') {
        const customerinfo = await customer_model_1.default.findOne({ _id: chat.customer }).select('phone_number').lean();
        await (0, wp_service_1.sendTextMessage)(customerinfo.phone_number, content);
    }
    ;
    res.status(200).send({
        success: true,
        message,
        chat
    });
};
exports.createMessage = createMessage;
const createGroup = async (req, res) => {
    const { users, chat_name } = req.body;
    const currentUser = req.user.id;
    let chat_pic = null;
    if (!users || !Array.isArray(users) || users.length <= 1)
        throw new common_1.CustomError('User IDs are required to create a group.', 400, true);
    if (!chat_name)
        throw new common_1.CustomError('Chat name is required.', 400, true);
    if (req.file && req.file.size > 0 && req.file.buffer) {
        const randomSuffix = crypto_1.default.randomBytes(8).toString('hex');
        const fileName = `group_pics/${randomSuffix}_${req.file.originalname}`;
        const buffer = await (0, sharp_1.default)(req.file.buffer).resize({ height: 90, width: 90, fit: 'contain' }).toBuffer();
        const params = {
            Bucket: env_1.default.AWS_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: req.file.mimetype
        };
        const command = new client_s3_1.PutObjectCommand(params);
        await common_1.s3.send(command);
        chat_pic = fileName;
    }
    const chat = await chatMessage_model_1.Chat.create({
        is_group: true,
        users: [...users, currentUser],
        group_admin: currentUser,
        chat_name,
        chat_pic
    });
    if (!chat)
        throw new common_1.CustomError('Group chat not created', 404, true);
    res.status(201).send({
        success: true,
        chat
    });
};
exports.createGroup = createGroup;
const deleteChat = async (req, res) => {
    const { chatId } = req.params;
    if (!chatId)
        throw new common_1.CustomError('Chat ID is required.', 400, true);
    // Delete all messages for this chat
    await chatMessage_model_1.Message.deleteMany({ chat: chatId });
    // Delete the chat itself
    const result = await chatMessage_model_1.Chat.deleteOne({ _id: chatId });
    if (result.deletedCount > 0) {
        res.sendStatus(204);
    }
    throw new common_1.CustomError('Chat not found.', 404, true);
};
exports.deleteChat = deleteChat;
const updateGroup = async (req, res) => {
    const { groupId } = req.params;
    const { chat_name, users } = req.body;
    const currentUser = req.user.id;
    if (!groupId)
        throw new common_1.CustomError('Group ID is required.', 400, true);
    const group = await chatMessage_model_1.Chat.findById(groupId);
    if (!group)
        throw new common_1.CustomError('Group not found.', 404, true);
    group.chat_name = chat_name || group.chat_name;
    let updatedUsers = users || group.users;
    if (!updatedUsers.includes(currentUser)) {
        updatedUsers.push(currentUser);
    }
    group.users = updatedUsers;
    if (req.file && req.file.size > 0 && req.file.buffer) {
        const randomSuffix = crypto_1.default.randomBytes(8).toString('hex');
        const fileName = `group_pics/${randomSuffix}_${req.file.originalname}`;
        const buffer = await (0, sharp_1.default)(req.file.buffer).resize({ height: 90, width: 90, fit: 'contain' }).toBuffer();
        const params = {
            Bucket: env_1.default.AWS_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: req.file.mimetype
        };
        const command = new client_s3_1.PutObjectCommand(params);
        await common_1.s3.send(command);
        group.chat_pic = fileName;
    }
    await group.save();
    res.status(200).send({
        success: true,
        group
    });
};
exports.updateGroup = updateGroup;
//# sourceMappingURL=chatMessage.controller.js.map