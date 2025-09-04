import mongoose, { Document, Schema, Model } from "mongoose";



const escalationSchema: Schema<IEscalation> = new Schema({
    raised_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },

}, { _id: false, timestamps: true });

const commentSchema = new Schema<IComment>({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
    _id: true,
});

const ticketSchema: Schema<ITicket> = new Schema({
    assigned_agent: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },


    category: {
        type: Schema.Types.ObjectId,
        ref: 'TicCat',
        required: true,
    },

    caller_phone: String,

    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: String,
        enum: ['pending', 'active', 'resolved', 'cancelled', 'escalated'],
        default: 'pending',
    },

    email_id: {
        type: String,
        default: null,
        trim: true,
    },

    source: {
        type: String,
        enum: ['email', 'phone', 'whatsapp', 'other'],
        default: 'other',
    },

    priority: {
        type: String,
        enum: ['high', 'medium', 'low', 'critical'],
        default: 'medium',
    },

    flag: {
        type: String,
        enum: ['important', 'moderate', 'least important', 'prank'],
        default: 'moderate'
    },

    escalation: {
        type: escalationSchema,
        default: null,
    },

    comments: {
        type: [commentSchema],
        default: [],
    },

}, {
    timestamps: true,
    collection: 'tickets',
});


const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);
export default Ticket;

// Interface for escalation subdocument
export interface IEscalation {
    raised_by: PersonInfo;
    reason: string;
    createdAt: Date;
    updatedAt: Date;
}

// Interface for caller details subdocument
export interface ICallerDetails {
    first_name: string;
    last_name: string;
    email?: string;
    phone_number: string;
}

interface PersonInfo {
    _id: mongoose.Schema.Types.ObjectId;
    full_name: string;
    email: string;
    phone_number: string;
    profile_pic?: string;
}

export interface IComment {
    author: PersonInfo;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

// Main ticket interface
export interface ITicket extends Document {
    assigned_agent: PersonInfo;
    customer: PersonInfo;
    caller_phone: string;
    title: string;
    description: string;
    status: 'pending' | 'active' | 'resolved' | 'cancelled' | 'escalated';
    email_id: string | null;
    source: 'email' | 'phone' | 'whatsapp' | 'other';
    priority: 'high' | 'medium' | 'low' | 'critical';
    flag: string;
    category: mongoose.Schema.Types.ObjectId;
    escalation?: IEscalation;
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}



// --------------------------------------------------------------
// Ticket Category
const categorySchema: Schema<ITicCat> = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }

}, {
    collection: 'tic-cats',
    timestamps: true
});


export const TicCat: Model<ITicCat> = mongoose.model<ITicCat>('TicCat', categorySchema);


export interface ITicCat extends Document {
    name: string;
    description: string;
}


