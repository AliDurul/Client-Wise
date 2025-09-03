"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const LeadSchema = new mongoose_1.Schema({
    assigned_agent: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
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
        default: null
    },
    close_date: {
        type: Date,
        default: null
    },
    location: {
        province: String,
        town: String,
        address: String,
    },
    converted_to_invoice: { type: Boolean, default: false },
}, { timestamps: true, collection: 'leads' });
LeadSchema.virtual("status").get(function () {
    if (this.pipeline_stage === "Qualification")
        return "Open";
    if (["Proposal|Quotation", "Negotiation", "Pending Approval"].includes(this.pipeline_stage))
        return "In Progress";
    return this.pipeline_stage; // "Closed-Won" or "Closed-Lost"
});
LeadSchema.virtual("probability").get(function () {
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
LeadSchema.pre("save", function (next) {
    if (!this.follow_up_date) {
        // Default follow-up = 2 days after creation
        this.follow_up_date = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    }
    next();
});
const Lead = mongoose_1.default.model("Lead", LeadSchema);
exports.default = Lead;
//# sourceMappingURL=lead.model.js.map