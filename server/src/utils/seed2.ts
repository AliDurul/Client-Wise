import User, { USER_ROLES } from "../models/user.model";
import Customer from "../models/customer.model";
import Faq from "../models/faq.model";
import Product from "../models/product.model";
import Task from "../models/task.model";
import Ticket, { TicCat } from "../models/ticket.model";
import Invoice from "../models/invoice.model";
import { dummyCustomers, dummyFaqs, dummyInvoices, dummyLeads, dummyProducts, dummyTasks, dummyTicketCategories, dummyTickets, dummyUsers } from "./dumyData";
import Lead from "../models/lead.model";
import mongoose from "mongoose";


export const initializeData2 = async () => {
    console.log("Clearing all collections...");
    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
        throw new Error("Mongoose is not connected. Connect before running this script.");
    }

    console.log("Dropping entire database...");
    await mongoose.connection.db.dropDatabase();
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

    await User.insertMany(dummyUsers);
    console.log("Users seeded successfully.");

    await Customer.insertMany(dummyCustomers);
    console.log("Customers seeded successfully.");

    await Faq.insertMany(dummyFaqs);
    console.log("FAQs seeded successfully.");

    await Product.insertMany(dummyProducts);
    console.log("Products seeded successfully.");

    await TicCat.insertMany(dummyTicketCategories);
    console.log("Ticket categories seeded successfully.");

    await Ticket.insertMany(dummyTickets);
    console.log("Tickets seeded successfully.");

    await Invoice.insertMany(dummyInvoices);
    console.log("Invoices seeded successfully.");

    await Lead.insertMany(dummyLeads);
    console.log("Leads seeded successfully.");

    await Task.insertMany(dummyTasks);
    console.log("Tasks seeded successfully.");
}