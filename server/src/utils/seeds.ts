import mongoose from "mongoose";
import User, { USER_ROLES } from "../models/user.model";
import Customer from "../models/customer.model";
import Faq from "../models/faq.model";
import Product from "../models/product.model";
import Task from "../models/task.model";
import Ticket, { TicCat } from "../models/ticket.model";
import Invoice from "../models/invoice.model";

export async function initializeData() {
    // Clear all collections before seeding
    console.log("Clearing all collections...");
    await Promise.all([
        User.deleteMany({}),
        Customer.deleteMany({}),
        Faq.deleteMany({}),
        Product.deleteMany({}),
        Task.deleteMany({}),
        Ticket.deleteMany({}),
        TicCat.deleteMany({}),
        Invoice.deleteMany({}),
    ]);
    console.log("All collections cleared.");

    // USERS
    console.log("Seeding users...");
    const users = [];
    for (let i = 1; i <= 10; i++) {
        users.push({
            email: `user${i}@example.com`,
            password: `Password${i}!`,
            first_name: `First${i}`,
            last_name: `Last${i}`,
            phone_number: `+1234567890${i}`,
            role: Object.values(USER_ROLES)[i % Object.values(USER_ROLES).length],
            department: `Department${i}`,
            employee_id: `EMP${i}`,
            status: "active",
            profile_pic: `profile_pics/profile-${i}.jpeg`,
            is_verified: true,
            permissions: ["read", "write"],
        });
    }
    const userDocs = await User.insertMany(users);
    console.log("Users seeded.");

    // CUSTOMERS
    console.log("Seeding customers...");
    const customers = [];
    for (let i = 1; i <= 10; i++) {
        const customer_type = ["individual", "corporate"][i % 2];
        customers.push({
            customer_type,
            first_name: customer_type === "individual" ? `CustFirst${i}` : null,
            last_name: customer_type === "individual" ? `CustLast${i}` : null,
            company_name: customer_type === "corporate" ? `Company${i}` : null,
            contact_person: customer_type === "corporate" ? `ContactPerson${i}` : null,
            registration_number: customer_type === "corporate" ? `REG${i}` : null,
            phone_number: `+1987654321${i}`,
            email: `customer${i}@example.com`,
            nationality: "CountryX",
            dob: new Date(1990, i, i),
            gender: ["male", "female", "other"][i % 3],
            address: {
                street: `Street ${i}`,
                city: "CityX",
                state: "StateX",
                country: "CountryX",
                zip_code: `1000${i}`,
            },
            id_type: "passport",
            id_number: `ID${i}`,
            profession: "Engineer",
            marital_status: ["single", "married", "divorced", "widowed", "other"][i % 5],
            religion: "ReligionX",
            father_name: `Father${i}`,
            mother_name: `Mother${i}`,
            witness_name: `Witness${i}`,
            witness_relation: "Friend",
            number_of_children: i % 4,
            boys: Math.floor((i % 4) / 2),
            girls: Math.floor((i % 4) / 2),
            finincial_institution: "BankX",
            documents: [`Doc${i}`],
            profile_pic: `profile_pics/profile-${i + 10}.jpeg`,
            status: "active",
            notes: `Note for customer ${i}`,
            assigned_agent: userDocs[i % userDocs.length]._id,
        });
    }
    const customerDocs = await Customer.insertMany(customers);
    console.log("Customers seeded.");

    // FAQS
    console.log("Seeding FAQs...");
    const faqs = [];
    for (let i = 1; i <= 10; i++) {
        faqs.push({
            question: `What is FAQ ${i}?`,
            answer: `This is the answer to FAQ ${i}.`,
        });
    }
    await Faq.insertMany(faqs);
    console.log("FAQs seeded.");

    // PRODUCTS
    console.log("Seeding products...");
    const products = [];
    for (let i = 1; i <= 10; i++) {
        products.push({
            name: `Product${i}`,
            description: `Description for product ${i}`,
            price: 10 * i,
            stock_quantity: 100 + i,
            category: "general",
            is_active: true,
        });
    }
    const productDocs = await Product.insertMany(products);
    console.log("Products seeded.");

    // TICKET CATEGORIES
    console.log("Seeding ticket categories...");
    const categories = [];
    for (let i = 1; i <= 5; i++) {
        categories.push({
            name: `Category${i}`,
            description: `Description for category ${i}`,
        });
    }
    const categoryDocs = await TicCat.insertMany(categories);
    console.log("Ticket categories seeded.");

    // TASKS
    console.log("Seeding tasks...");
    const tasks = [];
    for (let i = 1; i <= 10; i++) {
        tasks.push({
            title: `Task ${i}`,
            assigned_agent: userDocs[i % userDocs.length]._id,
            description: `Description for task ${i}`,
            priority: ["High", "Medium", "Low"][i % 3],
            status: ["Pending", "In-Progress", "Completed", "Cancelled"][i % 4],
        });
    }
    await Task.insertMany(tasks);
    console.log("Tasks seeded.");

    // TICKETS
    console.log("Seeding tickets...");
    const tickets = [];
    for (let i = 1; i <= 10; i++) {
        tickets.push({
            assigned_agent: userDocs[i % userDocs.length]._id,
            customer: customerDocs[i % customerDocs.length]._id,
            category: categoryDocs[i % categoryDocs.length]._id,
            caller_details: {
                first_name: `Caller${i}`,
                last_name: `CallerLast${i}`,
                email: `caller${i}@example.com`,
                phone_number: `+1122334455${i}`,
            },
            title: `Ticket Title ${i}`,
            description: `Description for ticket ${i}`,
            status: ["pending", "active", "resolved", "cancelled", "escalated"][i % 5],
            email_id: `ticket${i}@example.com`,
            priority: ["high", "medium", "low", "critical"][i % 4],
            flag: ["important", "moderate", "least important", "prank"][i % 4],
            escalation: (i % 5 === 4) ? {
                raised_by: userDocs[(i + 1) % userDocs.length]._id,
                reason: `Escalation reason for ticket ${i}`,
            } : undefined,
        });
    }
    await Ticket.insertMany(tickets);
    console.log("Tickets seeded.");

    // INVOICES
    console.log("Seeding invoices...");
    const invoices = [];
    for (let i = 1; i <= 10; i++) {
        invoices.push({
            creator: userDocs[i % userDocs.length]._id,
            customer: customerDocs[i % customerDocs.length]._id,
            invoice_items: [
                {
                    product: productDocs[i % productDocs.length]._id,
                    quantity: 1 + (i % 5),
                    unit_price: productDocs[i % productDocs.length].price,
                    total_price: productDocs[i % productDocs.length].price * (1 + (i % 5)),
                    discount: 0,
                },
            ],
            status: ["draft", "sent", "paid", "overdue", "closed", "refunded"][i % 6],
            shipping_cost: 5 * i,
            discount: 0,
            tax: 16,
            due_date: new Date(Date.now() + i * 86400000),
            payment_type: ["cash", "credit card", "bank transfer", "paypal", "stripe", "mobile", "debit card", "cheque"][i % 8],
            additional_note: `Note for invoice ${i}`,
            subtotal: productDocs[i % productDocs.length].price * (1 + (i % 5)),
            total_amount: productDocs[i % productDocs.length].price * (1 + (i % 5)) + 5 * i,
        });
    }
    await Invoice.insertMany(invoices);
    console.log("Invoices seeded.");

    console.log("✅ Seed data inserted successfully.");
}
