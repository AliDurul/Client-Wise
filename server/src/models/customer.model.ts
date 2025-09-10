import mongoose, { Document, Schema, Model } from "mongoose";



const customerSchema: Schema<ICustomer> = new Schema({
    customer_type: {
        type: String,
        enum: ['individual', 'corporate'],
        default: 'individual',
    },
    source: {
        type: String,
        enum: ['phone_call', 'whatsapp', 'email', 'in_person', 'referral', 'website', 'social_media', 'other'],
        default: 'phone_call',
    },
    first_name: {
        type: String,
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    last_name: {
        type: String,
        trim: true,
        maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    company_name: {
        type: String,
        trim: true,
        maxlength: [100, 'Company name cannot exceed 100 characters'],
    },
    contact_person: {
        type: String,
        trim: true,
        maxlength: [100, 'Contact person cannot exceed 100 characters'],
    },
    registration_number: {
        type: String,
        trim: true,
        maxlength: [20, 'Registration number cannot exceed 20 characters'],
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone_number: {
        type: String,
        required: true,
        trim: true,
        index: true,
        match: [/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'],
    },
    nationality: {
        type: String,
        trim: true,
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        lowercase: true,
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip_code: String,
    },
    id_type: {
        type: String,
        enum: ['passport', 'nrc', 'license'],
    },
    id_number: {
        type: String,
        trim: true,
    },
    id_front: {
        type: String,
        trim: true,
    },
    id_back: {
        type: String,
        trim: true,
    },
    profession: {
        type: String,
        trim: true,
    },
    marital_status: {
        type: String,
        enum: ['single', 'married', 'divorced', 'widowed', 'other'],
        lowercase: true,
    },
    religion: {
        type: String,
        trim: true,
    },
    father_name: {
        type: String,
        trim: true,
    },
    mother_name: {
        type: String,
        trim: true,
    },
    witness_name: {
        type: String,
        trim: true,
    },
    witness_relation: {
        type: String,
        trim: true,
    },
    medication_type: {
        type: String,
        trim: true,
    },
    number_of_children: {
        type: Number,
        default: 0,
        min: [0, 'Number of children cannot be negative'],
    },
    boys: {
        type: Number,
        default: 0,
        min: [0, 'Number of boys cannot be negative'],
    },
    girls: {
        type: Number,
        default: 0,
        min: [0, 'Number of girls cannot be negative'],
    },
    finincial_institution: {
        type: String,
        trim: true,
    },
    documents: [{
        type: String,
        trim: true,
    }],
    profile_pic: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['prospect', 'lead', 'customer', 'inactive', 'blacklisted'],
        default: 'prospect',
    },
    notes: {
        type: String,
        trim: true,
    },
    assigned_agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    full_name: {
        type: String,
        default: function () {
            return `${this.first_name} ${this.last_name}`.trim();
        },
        transform: function () {
            return `${this.first_name} ${this.last_name}`.trim();
        },
    },
}, {
    collection: 'customers',
    timestamps: true,
});


customerSchema.pre('save', function (next) {
    if (this.boys + this.girls !== this.number_of_children && this.number_of_children > 0) {
        this.number_of_children = this.boys + this.girls;
    }
    next();
});


const Customer = mongoose.model<ICustomer>('Customer', customerSchema);
export default Customer;


export interface ICustomer extends Document {
    customer_type: 'individual' | 'corporate';
    source: 'phone_call' | 'whatsapp' | 'email' | 'in_person' | 'referral' | 'website' | 'social_media' | 'other';
    company_name: string;
    contact_person: string;
    registration_number: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    email?: string;
    phone_number: string;
    dob?: Date;
    nationality?: string;
    gender?: 'male' | 'female' | 'other';
    address: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        zip_code?: string;
    };
    id_type?: 'passport' | 'national_id' | 'driving_license' | 'other';
    id_number?: string;
    id_front?: string;
    id_back?: string;
    profession?: string;
    marital_status?: 'single' | 'married' | 'divorced' | 'widowed' | 'other';
    religion?: string;
    father_name?: string;
    mother_name?: string;
    witness_name?: string;
    witness_relation?: string;
    medication?: boolean;
    medication_type?: string;
    number_of_children?: number;
    boys?: number;
    girls?: number;
    finincial_institution?: string;
    documents?: string[];
    profile_pic?: string;
    status: 'active' | 'inactive' | 'blacklisted' | 'prospect' | 'lead' | 'customer';
    notes?: string;
    assigned_agent?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}