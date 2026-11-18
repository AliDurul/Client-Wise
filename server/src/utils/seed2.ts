import mongoose from "mongoose";
import User from "../models/user.model";
import Customer from "../models/customer.model";
import Faq from "../models/faq.model";
import Product from "../models/product.model";
import Task from "../models/task.model";
import Ticket, { TicCat } from "../models/ticket.model";
import Invoice from "../models/invoice.model";
import Lead from "../models/lead.model";
import { Chat, Message } from "../models/chatMessage.model";
import { buildDemoData } from "./demoData";

/**
 * Replaces ALL demo collections with a fresh, realistic dataset.
 * This deletes existing data. Run it through `pnpm seed`, which asks for confirmation.
 */
export const initializeData2 = async () => {
    if (mongoose.connection.readyState !== 1) {
        throw new Error("Mongoose is not connected. Connect before running this script.");
    }

    const data = buildDemoData(new Date(), process.env.DEMO_PASSWORD || undefined);

    console.log("Clearing collections...");
    await Promise.all([
        User.deleteMany({}),
        Customer.deleteMany({}),
        Faq.deleteMany({}),
        Product.deleteMany({}),
        Task.deleteMany({}),
        Ticket.deleteMany({}),
        TicCat.deleteMany({}),
        Invoice.deleteMany({}),
        Lead.deleteMany({}),
        Chat.deleteMany({}),
        Message.deleteMany({}),
    ]);

    // Order matters: later collections reference earlier ones.
    await User.insertMany(data.users);
    await Customer.insertMany(data.customers);
    await Faq.insertMany(data.faqs);
    await Product.insertMany(data.products);
    await TicCat.insertMany(data.categories);
    await Ticket.insertMany(data.tickets);
    await Invoice.insertMany(data.invoices);
    await Lead.insertMany(data.leads);
    await Task.insertMany(data.tasks);

    // Native driver on purpose: Mongoose's insertMany would reset updatedAt to "now",
    // and the chat list is sorted by updatedAt, so every chat would look equally recent.
    await Chat.collection.insertMany(data.chats as any[]);
    await Message.collection.insertMany(data.messages as any[]);

    console.log(
        `Seeded: ${data.users.length} users, ${data.customers.length} customers, ${data.products.length} products, ` +
        `${data.tickets.length} tickets, ${data.invoices.length} invoices, ${data.leads.length} leads, ` +
        `${data.tasks.length} tasks, ${data.faqs.length} FAQs, ${data.chats.length} chats (${data.messages.length} messages).`
    );
    console.log(`Demo login: ${data.users[0].email}`);
};
