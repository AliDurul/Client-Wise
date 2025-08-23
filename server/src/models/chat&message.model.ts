import { Schema, model } from 'mongoose'

const chatSchema = new Schema<IChat>({

    chat_name: { type: String, trim: true },
    is_group: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    latest_message: { type: Schema.Types.ObjectId, ref: 'Message', default: null },
    group_admin: { type: Schema.Types.ObjectId, ref: 'User', default: null },

}, { collection: 'chats', timestamps: true });


export const Chat = model<IChat>('Chat', chatSchema);

export interface IChat {
    _id: Schema.Types.ObjectId;
    chat_name?: string;
    is_group?: boolean;
    users: Schema.Types.ObjectId[];
    latest_message: Schema.Types.ObjectId | null;
    group_admin: Schema.Types.ObjectId | null;
}

// ----------------------------------------


const messageSchema = new Schema<IMessage>({

    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },

}, { collection: 'messages', timestamps: true });


export const Message = model<IMessage>('Message', messageSchema);


export interface IMessage {
    sender: Schema.Types.ObjectId;
    content: string;
    chat: Schema.Types.ObjectId;
}