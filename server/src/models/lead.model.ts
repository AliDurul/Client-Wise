import mongoose, { Document, Schema, Model, Types } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";


const LeadSchema = new Schema<ILead>({
    assigned_agent: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    company_name: {
        type: String,
        trim: true
    },
    person_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    mobile_number: {
        type: String,
        trim: true
    },
    lead_source: {
        type: String,
        trim: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        default: null
    },
    pipeline_stage: {
        type: String,
        enum: [
            "Qualification",
            "Proposal|Quotation",
            "Negotiation",
            "Pending Approval",
            "Closed-Won",
            "Closed-Lost",
        ],
        default: "Qualification",
    },
    deal_value: {
        type: Number,
        default: 0
    },
    expected_revenue: {
        type: Number,
        default: 0
    },
    follow_up_date: {
        type: Date,
        default: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    },
    close_date: {
        type: Date,
        default: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    location: {
        province: String,
        town: String,
        address: String,
    },
    converted_to_invoice: { type: Boolean, default: false },

}, { timestamps: true, collection: 'leads', toJSON: { virtuals: true }, toObject: { virtuals: true } });

LeadSchema.plugin(mongooseLeanVirtuals);

LeadSchema.virtual("status").get(function (this: ILead) {
    if (this.pipeline_stage === "Qualification") return "Open";
    if (["Proposal|Quotation", "Negotiation", "Pending Approval"].includes(this.pipeline_stage)) return "In Progress";
    return this.pipeline_stage; // "Closed-Won" or "Closed-Lost"
});

LeadSchema.virtual("probability").get(function (this: ILead) {
    switch (this.pipeline_stage) {
        case "Qualification": return 10;
        case "Proposal|Quotation": return 25;
        case "Negotiation": return 50;
        case "Pending Approval": return 75;
        case "Closed-Won": return 100;
        default: return 0;
    }
});

// LeadSchema.pre("save", async function (next) {
//     if (!this.isNew) {
//         const LeadModel = this.constructor as mongoose.Model<ILead>;
//         const oldLead = await LeadModel.findById(this._id).lean();
//         this._previousStage = oldLead ? oldLead.pipeline_stage : null;
//     }
//     next();
// });

// LeadSchema.post("save", async function (doc) {
//     // If pipeline_stage just changed to Closed-Won → create Customer
//     if (doc.pipeline_stage === "Closed-Won" && doc._previousStage !== "Closed-Won") {
//         const Customer = mongoose.model("Customer");

//         await Customer.findOneAndUpdate(
//             { email: doc.email }, // prevent duplicates
//             {
//                 company_name: doc.company_name,
//                 email: doc.email,
//                 mobile_number: doc.mobile_number,
//                 location: doc.location,
//             },
//             { upsert: true, new: true }
//         );

//     }

//     // Example: Notify assigned agent if exists
//     if (doc.assigned_agent) {
//         // sendNotification(doc.assigned_agent, `Lead "${doc.company_name}" updated to ${doc.pipeline_stage}`);
//     }
// });

const Lead = mongoose.model<ILead>("Lead", LeadSchema);
export default Lead;

export interface ILead extends Document {
    assigned_agent?: Types.ObjectId | null;
    company_name?: string;
    person_name?: string;
    email?: string;
    mobile_number?: string;
    lead_source?: string;
    product?: Types.ObjectId | null;
    pipeline_stage?:
    | "Qualification"
    | "Proposal|Quotation"
    | "Negotiation"
    | "Pending Approval"
    | "Closed-Won"
    | "Closed-Lost";
    deal_value?: number;
    expected_revenue?: number;
    follow_up_date?: Date | null;
    close_date?: Date | null;
    location?: {
        province?: string;
        town?: string;
        address?: string;
    };
    converted_to_invoice?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    status?: string;
    probability?: number;
    // _previousStage?: string | null; 
}
