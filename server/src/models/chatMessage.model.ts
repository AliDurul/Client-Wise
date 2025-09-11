import { Schema, model } from 'mongoose'

const chatSchema = new Schema<IChat>({

    chat_name: { type: String, trim: true, default: null },
    is_group: { type: Boolean, default: false },
    chat_pic: { type: String, default: null },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    latest_message: { type: Schema.Types.ObjectId, ref: 'Message', default: null },
    group_admin: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    source: { type: String, enum: ['internal', 'whatsapp'], default: 'internal' },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', default: null },

}, { collection: 'chats', timestamps: true });


export const Chat = model<IChat>('Chat', chatSchema);

export interface IChat {
    _id: Schema.Types.ObjectId;
    chat_pic: null | string;
    chat_name?: string;
    is_group?: boolean;
    users: ChatUser[];
    latest_message: Schema.Types.ObjectId | null;
    group_admin: ChatUser | null;
    source: 'internal' | 'whatsapp';
    customer: ChatUser | null;
}

export interface ChatUser {
    _id: string;
    email: string;
    phone_number: string;
    profile_pic: string;
    full_name: string;
}

// ----------------------------------------


const messageSchema = new Schema<IMessage>({

    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },

}, { collection: 'messages', timestamps: true });


export const Message = model<IMessage>('Message', messageSchema);


export interface IMessage {
    sender: ChatUser;
    content: string;
    chat: IChat;
}