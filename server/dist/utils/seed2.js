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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeData2 = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const customer_model_1 = __importDefault(require("../models/customer.model"));
const faq_model_1 = __importDefault(require("../models/faq.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const task_model_1 = __importDefault(require("../models/task.model"));
const ticket_model_1 = __importStar(require("../models/ticket.model"));
const invoice_model_1 = __importDefault(require("../models/invoice.model"));
const dumyData_1 = require("./dumyData");
const lead_model_1 = __importDefault(require("../models/lead.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const initializeData2 = async () => {
    console.log("Clearing all collections...");
    if (!mongoose_1.default.connection || mongoose_1.default.connection.readyState !== 1) {
        throw new Error("Mongoose is not connected. Connect before running this script.");
    }
    console.log("Dropping entire database...");
    await mongoose_1.default.connection.db.dropDatabase();
    console.log("Database dropped successfully.");
    // await Promise.all([
    //     User.deleteMany({}),
    //     Customer.deleteMany({}),
    //     Faq.deleteMany({}),
    //     Product.deleteMany({}),
    //     Task.deleteMany({}),
    //     Ticket.deleteMany({}),
    //     TicCat.deleteMany({}),
    //     Invoice.deleteMany({}),
    // ]);
    // console.log("All collections cleared.");
    await user_model_1.default.insertMany(dumyData_1.dummyUsers);
    console.log("Users seeded successfully.");
    await customer_model_1.default.insertMany(dumyData_1.dummyCustomers);
    console.log("Customers seeded successfully.");
    await faq_model_1.default.insertMany(dumyData_1.dummyFaqs);
    console.log("FAQs seeded successfully.");
    await product_model_1.default.insertMany(dumyData_1.dummyProducts);
    console.log("Products seeded successfully.");
    await ticket_model_1.TicCat.insertMany(dumyData_1.dummyTicketCategories);
    console.log("Ticket categories seeded successfully.");
    await ticket_model_1.default.insertMany(dumyData_1.dummyTickets);
    console.log("Tickets seeded successfully.");
    await invoice_model_1.default.insertMany(dumyData_1.dummyInvoices);
    console.log("Invoices seeded successfully.");
    await lead_model_1.default.insertMany(dumyData_1.dummyLeads);
    console.log("Leads seeded successfully.");
    await task_model_1.default.insertMany(dumyData_1.dummyTasks);
    console.log("Tasks seeded successfully.");
};
exports.initializeData2 = initializeData2;
//# sourceMappingURL=seed2.js.map