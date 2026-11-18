import mongoose from "mongoose";

/**
 * Realistic, deterministic demo dataset for Client White.
 * Dates are relative to `now`, so dashboard charts always look current.
 * Same seed => same people and numbers every run. Only the ObjectIds are new.
 */

const oid = () => new mongoose.Types.ObjectId();

// Small deterministic PRNG (mulberry32) so reruns produce the same dataset.
function makeRng(seed: number) {
    let a = seed;
    return () => {
        a |= 0; a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

type Pair<T> = [T, number];

export function buildDemoData(now: Date = new Date(), demoPassword = "ClientWhite!2026") {
    const rnd = makeRng(20260101);
    const int = (min: number, max: number) => Math.floor(rnd() * (max - min + 1)) + min;
    const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(rnd() * arr.length)];
    const weighted = <T,>(pairs: Pair<T>[]): T => {
        const total = pairs.reduce((s, [, w]) => s + w, 0);
        let r = rnd() * total;
        for (const [v, w] of pairs) { if ((r -= w) <= 0) return v; }
        return pairs[pairs.length - 1][0];
    };
    const DAY = 24 * 60 * 60 * 1000;
    const daysAgo = (d: number, hour = int(8, 17)) => {
        const x = new Date(now.getTime() - d * DAY);
        x.setHours(hour, int(0, 59), 0, 0);
        return x;
    };
    const daysAhead = (d: number) => new Date(now.getTime() + d * DAY);
    const money = (n: number) => Math.round(n * 100) / 100;
    const phone = () => `+44 7700 900${String(int(100, 999))}`;
    const slug = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "");

    /* ------------------------------ Users ------------------------------ */
    const userSeeds = [
        ["Amelia", "Hart", "admin", "Management", "demo@clientwhite.demo"],
        ["Marcus", "Bell", "manager", "Sales", ""],
        ["Priya", "Shah", "agent", "Support", ""],
        ["Daniel", "Okafor", "agent", "Sales", ""],
        ["Chloe", "Martin", "agent", "Support", ""],
        ["Tom", "Reeves", "employee", "Finance", ""],
        ["Hannah", "Webb", "moderator", "Customer Success", ""],
        ["Luca", "Romano", "agent", "Sales", ""],
    ] as const;

    const users = userSeeds.map(([first, last, role, department, email], i) => ({
        _id: oid(),
        employee_id: `EMP-${1001 + i}`,
        email: email || `${first.toLowerCase()}.${last.toLowerCase()}@clientwhite.demo`,
        password: demoPassword,
        first_name: first,
        last_name: last,
        phone_number: phone(),
        role,
        department,
        status: "active",
        is_verified: true,
        last_login: daysAgo(int(0, 3)),
        date_joined: daysAgo(400 - i * 30),
    }));
    const agents = users.filter((u) => ["agent", "manager", "admin"].includes(u.role));
    const supportAgents = users.filter((u) => u.department === "Support" || u.role === "admin");
    const salesAgents = users.filter((u) => u.department === "Sales");
    const finance = users.find((u) => u.department === "Finance")!;

    /* ---------------------------- Customers ---------------------------- */
    type Place = [string, string, string, string]; // city, region, postcode, street
    const places: Place[] = [
        ["Leeds", "West Yorkshire", "LS1 4AP", "22 Wellington Street"],
        ["Bristol", "Bristol", "BS1 5TR", "8 Queen Square"],
        ["Manchester", "Greater Manchester", "M2 3WQ", "41 Deansgate"],
        ["Sheffield", "South Yorkshire", "S1 2GU", "5 Division Street"],
        ["Birmingham", "West Midlands", "B3 2PB", "70 Colmore Row"],
        ["Glasgow", "Scotland", "G2 4QE", "19 West George Street"],
        ["Southampton", "Hampshire", "SO14 3FH", "3 Ocean Way"],
        ["London", "Greater London", "EC1V 2NX", "14 Granary Row"],
        ["Brighton", "East Sussex", "BN1 1AE", "27 North Laine"],
        ["Edinburgh", "Scotland", "EH2 4DY", "11 Rose Street"],
        ["Cardiff", "Wales", "CF10 1AA", "6 Mill Lane"],
        ["Nottingham", "Nottinghamshire", "NG1 6HH", "33 Friar Lane"],
        ["Huddersfield", "West Yorkshire", "HD1 2QB", "9 Station Street"],
        ["Norwich", "Norfolk", "NR2 1NF", "15 Pottergate"],
        ["Reading", "Berkshire", "RG1 2LP", "52 Broad Street"],
        ["Newcastle upon Tyne", "Tyne and Wear", "NE1 4ST", "4 Quayside"],
    ];

    const corporates: [string, string, string, string][] = [
        ["Northwind Logistics", "Sarah", "Kingsley", "Freight and haulage, 24 vehicles"],
        ["Harbour & Pine Ltd", "James", "Whitlock", "Interior design studio"],
        ["Brightwater Dental Group", "Anita", "Rao", "Five dental practices"],
        ["Kestrel Engineering", "Owen", "Pritchard", "Precision parts manufacturer"],
        ["Fernhill Property Management", "Laura", "Bennett", "Residential lettings, 300+ units"],
        ["Oakline Furniture Co", "Callum", "Murray", "Online and showroom retail"],
        ["Tidewell Marine Supplies", "Rebecca", "Hollis", "Chandlery and boat servicing"],
        ["Lumen Architects", "Tariq", "Hussain", "Architecture practice, 18 staff"],
        ["Cobalt Digital Studio", "Mia", "Fletcher", "Web and brand agency"],
        ["Redwood Catering", "Fiona", "MacLeod", "Events and corporate catering"],
        ["Marlow & Finch Solicitors", "Gareth", "Lloyd", "Family and conveyancing law"],
        ["Stonebridge Accountants", "Neil", "Ashworth", "Small business accountancy"],
        ["Pennine Outdoor Gear", "Holly", "Sutcliffe", "Outdoor clothing retailer"],
        ["Greenfield Veterinary Clinics", "Dr Ian", "Cooper", "Three veterinary clinics"],
        ["Ashdown Fitness", "Jade", "Morrison", "Gym and personal training"],
        ["Quayside Print Works", "Peter", "Dunn", "Commercial printing"],
    ];

    const individuals: [string, string, string, "male" | "female", string][] = [
        ["Oliver", "Thompson", "Freelance photographer", "male", "Referred by Cobalt Digital Studio"],
        ["Zainab", "Malik", "Pharmacist", "female", "Interested in the Business Support plan"],
        ["Henry", "Clarke", "Landlord", "male", "Owns four rental properties"],
        ["Isla", "Campbell", "Personal trainer", "female", "Prefers WhatsApp"],
        ["Rhys", "Davies", "Electrician", "male", "Sole trader, growing quickly"],
        ["Sophie", "Brennan", "Wedding planner", "female", "Seasonal workload, spring to autumn"],
        ["Kwame", "Mensah", "Consultant", "male", "Prefers email, replies in the evening"],
        ["Eleanor", "Price", "Tutor", "female", "Runs an online tutoring service"],
        ["Callum", "Reid", "Mortgage adviser", "male", "Wants a shared inbox for his team"],
        ["Aisha", "Khan", "Boutique owner", "female", "Switching from spreadsheets"],
        ["Joseph", "Walsh", "Plumber", "male", "Needs a simple invoice workflow"],
        ["Grace", "Holloway", "Illustrator", "female", "Referred by Isla Campbell"],
    ];

    const sources = ["phone_call", "whatsapp", "email", "in_person", "referral", "website", "social_media"] as const;

    const customers: any[] = [];
    corporates.forEach(([company, first, last, note], i) => {
        const [city, region, postcode, street] = places[i % places.length];
        customers.push({
            _id: oid(),
            assigned_agent: pick(salesAgents.concat(supportAgents))._id,
            customer_type: "corporate",
            source: pick(sources),
            company_name: company,
            contact_person: `${first} ${last}`,
            registration_number: `${int(10000000, 15999999)}`,
            first_name: first,
            last_name: last,
            email: `${first.toLowerCase().replace(/[^a-z]/g, "")}.${last.toLowerCase()}@${slug(company)}.example`,
            phone_number: phone(),
            nationality: "British",
            address: { street, city, state: region, country: "United Kingdom", zip_code: postcode },
            status: weighted<string>([["customer", 70], ["lead", 15], ["prospect", 10], ["inactive", 5]]),
            notes: note,
            createdAt: daysAgo(int(30, 380)),
        });
    });
    individuals.forEach(([first, last, profession, gender, note], i) => {
        const [city, region, postcode, street] = places[(i + 5) % places.length];
        customers.push({
            _id: oid(),
            assigned_agent: pick(agents)._id,
            customer_type: "individual",
            source: pick(sources),
            first_name: first,
            last_name: last,
            email: `${first.toLowerCase()}.${last.toLowerCase()}@${pick(["mailbox", "inboxmail", "postbox"])}.example`,
            phone_number: phone(),
            nationality: "British",
            gender,
            dob: new Date(`${int(1962, 1996)}-${String(int(1, 12)).padStart(2, "0")}-${String(int(1, 28)).padStart(2, "0")}`),
            address: { street: `${int(1, 120)} ${street.split(" ").slice(1).join(" ")}`, city, state: region, country: "United Kingdom", zip_code: postcode },
            profession,
            marital_status: pick(["single", "married", "married", "divorced"]),
            status: weighted<string>([["customer", 55], ["lead", 20], ["prospect", 20], ["inactive", 5]]),
            notes: note,
            createdAt: daysAgo(int(10, 300)),
        });
    });

    /* ----------------------------- Products ---------------------------- */
    const productSeeds: [string, string, number, string][] = [
        ["Starter Support Plan", "Email support during business hours, 1 business day response, up to 3 users.", 49, "Support Plans"],
        ["Business Support Plan", "Priority email and phone support, 4 hour response, shared inbox for up to 15 users.", 149, "Support Plans"],
        ["Premium 24/7 Support", "Round-the-clock support with a named account manager and 1 hour response on critical issues.", 399, "Support Plans"],
        ["CRM Onboarding Package", "Guided setup: import contacts, configure pipelines, roles and ticket categories.", 950, "Implementation"],
        ["Data Migration", "We move your customers, leads and invoices from spreadsheets or another CRM.", 1400, "Implementation"],
        ["Custom Integration", "Connect Client White to your accounting, website forms or internal tools.", 2800, "Implementation"],
        ["Team Training Workshop", "Half-day live workshop for your team, with recorded sessions and a quick-start guide.", 600, "Training"],
        ["Admin Masterclass", "Two-hour session on roles, permissions, reporting and automation for administrators.", 350, "Training"],
        ["WhatsApp Integration", "Receive WhatsApp messages in the CRM and turn them into tickets or leads.", 120, "Add-ons"],
        ["Email Sync Add-on", "Connect a Gmail inbox to send, read and convert emails into tickets.", 80, "Add-ons"],
        ["Advanced Reporting", "Pipeline forecasts, ticket resolution times and revenue dashboards.", 210, "Add-ons"],
        ["Extra User Seats (5 pack)", "Five additional user seats for growing teams.", 95, "Add-ons"],
    ];
    const products = productSeeds.map(([name, description, price, category]) => ({
        _id: oid(), name, description, price, category, stock_quantity: int(120, 900), is_active: true,
    }));

    /* ------------------------- Ticket categories ----------------------- */
    const catSeeds: [string, string][] = [
        ["Billing", "Invoices, payments, refunds and subscription changes."],
        ["Technical Support", "Errors, performance problems and how-to questions."],
        ["Onboarding", "Setup, data import and first-week questions."],
        ["Feature Request", "Ideas and improvements suggested by customers."],
        ["Account Access", "Logins, password resets and permissions."],
        ["Complaint", "Service issues that need a manager's attention."],
    ];
    const categories = catSeeds.map(([name, description]) => ({ _id: oid(), name, description }));
    const cat = (name: string) => categories.find((c) => c.name === name)!._id;

    /* ------------------------------ Tickets ---------------------------- */
    const ticketTemplates: [string, string, string][] = [
        ["Billing", "Invoice shows the wrong billing address", "The latest invoice still carries our old address. Please correct it and reissue the PDF."],
        ["Billing", "Charged twice for the Business Support plan", "Two identical payments left our account this month. Could you check and refund the duplicate?"],
        ["Billing", "Need a VAT receipt for last quarter", "Our accountant needs VAT receipts for the last three invoices."],
        ["Technical Support", "Customer list takes a long time to load", "The customers page needs about 15 seconds to open since we imported our contacts."],
        ["Technical Support", "Cannot attach a PDF to a ticket", "Uploading a 6 MB PDF to a ticket fails with an error. Smaller files work."],
        ["Technical Support", "Pipeline stage does not save", "When I drag a lead to Negotiation it jumps back after a refresh."],
        ["Technical Support", "WhatsApp messages are not arriving", "Messages sent to our company number stopped appearing in the inbox this morning."],
        ["Onboarding", "Help importing contacts from a spreadsheet", "We have 1,200 contacts in Excel. What columns do we need and how do we map them?"],
        ["Onboarding", "How do we set up roles for the sales team?", "We want agents to see only their own leads, with managers seeing everything."],
        ["Onboarding", "Connecting our Gmail inbox", "We followed the Google steps but the connection asks for permissions again."],
        ["Feature Request", "Recurring invoices for monthly retainers", "We bill most clients the same amount every month. A recurring invoice would save hours."],
        ["Feature Request", "Export tickets to CSV", "Could we export the ticket list with filters so we can share reports with management?"],
        ["Feature Request", "Reminders for lead follow-ups", "An email or push reminder on the follow-up date would stop leads going cold."],
        ["Account Access", "Password reset email never arrives", "I requested a reset three times and nothing reached my inbox, even in spam."],
        ["Account Access", "New starter needs agent access", "Please add our new colleague as an agent with access to tickets and customers."],
        ["Complaint", "Slow response on an urgent ticket", "We waited two days for a reply on a ticket we marked critical."],
        ["Complaint", "Training session overran and missed topics", "The workshop did not cover reporting, which was the main reason we booked it."],
    ];
    const comments = [
        "Thanks for flagging this. I'm looking into it now.",
        "I've reproduced the problem and passed it to the engineering team.",
        "Could you send a screenshot or the exact time it happened?",
        "This is fixed on our side. Please try again and let me know.",
        "I've called the customer and agreed a next step.",
        "Refund has been issued and should arrive in 3 to 5 working days.",
    ];

    const tickets: any[] = [];
    for (let i = 0; i < 60; i++) {
        const [catName, title, description] = ticketTemplates[i % ticketTemplates.length];
        const customer = pick(customers);
        const age = i < 12 ? int(0, 14) : int(15, 240);
        const status = age < 3
            ? weighted<string>([["pending", 60], ["active", 40]])
            : weighted<string>([["resolved", 50], ["active", 20], ["pending", 12], ["escalated", 8], ["cancelled", 10]]);
        const agent = pick(supportAgents);
        const createdAt = daysAgo(age);
        const ticket: any = {
            _id: oid(),
            assigned_agent: agent._id,
            customer: customer._id,
            category: cat(catName),
            caller_phone: customer.phone_number,
            title: customer.company_name ? `${title} (${customer.company_name})` : title,
            description,
            status,
            source: pick(["email", "phone", "whatsapp", "email", "other"]),
            priority: catName === "Complaint" ? pick(["high", "critical"]) : weighted<string>([["low", 25], ["medium", 45], ["high", 25], ["critical", 5]]),
            flag: weighted<string>([["important", 20], ["moderate", 65], ["least important", 15]]),
            comments: [],
            createdAt,
            updatedAt: new Date(Math.min(now.getTime(), createdAt.getTime() + int(1, 48) * 60 * 60 * 1000)),
        };
        if (status !== "pending" && status !== "cancelled") {
            const n = int(1, 3);
            for (let c = 0; c < n; c++) {
                ticket.comments.push({
                    author: agent._id,
                    comment: comments[(i + c) % comments.length],
                    createdAt: new Date(createdAt.getTime() + (c + 1) * 3 * 60 * 60 * 1000),
                    updatedAt: new Date(createdAt.getTime() + (c + 1) * 3 * 60 * 60 * 1000),
                });
            }
        }
        if (status === "escalated") {
            ticket.escalation = { raised_by: agent._id, reason: "Customer is waiting on engineering and the SLA is at risk." };
        }
        tickets.push(ticket);
    }

    /* ------------------------------ Invoices --------------------------- */
    const billable = customers.filter((c) => c.status !== "prospect");
    const invoices: any[] = [];
    // 64 spread over ~11 months, plus 8 from the last two weeks so the dashboard's weekly profit cards show real numbers.
    for (let i = 0; i < 72; i++) {
        const customer = pick(billable);
        const isRecent = i >= 64;
        const age = isRecent ? int(0, 13) : int(2, 330);
        // Invoices are due 30 days after creation, so only recent ones can still be "sent" (not yet due).
        const status = isRecent
            ? weighted<string>([["paid", 85], ["sent", 15]])
            : age < 10
            ? weighted<string>([["draft", 30], ["sent", 50], ["paid", 20]])
            : age <= 30
                ? weighted<string>([["paid", 45], ["sent", 40], ["draft", 5], ["closed", 10]])
                : weighted<string>([["paid", 68], ["overdue", 14], ["closed", 10], ["refunded", 6], ["draft", 2]]);
        const itemCount = int(1, 3);
        const chosen = Array.from(new Set(Array.from({ length: itemCount }, () => pick(products))));
        const items = chosen.map((p) => {
            const quantity = p.category === "Support Plans" ? int(1, 12) : int(1, 2);
            const discount = rnd() < 0.2 ? money(p.price * quantity * 0.1) : 0;
            return {
                product: p._id,
                quantity,
                unit_price: p.price,
                discount,
                total_price: money(p.price * quantity - discount),
            };
        });
        const subtotal = money(items.reduce((s, it) => s + it.total_price, 0));
        const invoiceDiscount = rnd() < 0.1 ? money(subtotal * 0.05) : 0;
        const createdAt = daysAgo(age);
        const dueDate = new Date(createdAt.getTime() + 30 * DAY);
        // Past-due invoices that are still unpaid are "overdue"; keep the label consistent with dates.
        const finalStatus = status === "sent" && dueDate < now ? "overdue" : status;
        invoices.push({
            _id: oid(),
            creator: pick([finance, ...salesAgents])._id,
            customer: customer._id,
            invoice_items: items,
            status: finalStatus,
            shipping_cost: 0,
            discount: invoiceDiscount,
            tax: 0,
            due_date: dueDate,
            payment_type: pick(["bank transfer", "bank transfer", "credit card", "debit card", "stripe"]),
            additional_note: pick([
                "Thank you for your business. Payment terms: 30 days.",
                "Includes onboarding support for your team.",
                "Annual plan billed upfront. Renewal reminder will be sent 30 days before.",
                "Please quote the invoice number with your bank transfer.",
            ]),
            subtotal,
            total_amount: money(subtotal - invoiceDiscount),
            createdAt,
            updatedAt: new Date(Math.min(now.getTime(), createdAt.getTime() + int(1, 20) * DAY)),
        });
    }

    /* ------------------------------- Leads ----------------------------- */
    const leadCompanies: [string, string, string][] = [
        ["Aldgate Wealth Partners", "Victoria", "Sterling"],
        ["Beacon Hill Nurseries", "Martin", "Ellery"],
        ["Copperleaf Bakery", "Dana", "Whitaker"],
        ["Driftwood Surf School", "Josh", "Penhale"],
        ["Elmstead Physiotherapy", "Katie", "Nash"],
        ["Foxglove Florists", "Ruth", "Gallagher"],
        ["Granite Row Estate Agents", "Imran", "Qureshi"],
        ["Hollybush Childcare", "Beth", "Tanner"],
        ["Ironbridge Cycles", "Alfie", "Jarvis"],
        ["Juniper & Rowe Opticians", "Natalie", "Rowe"],
        ["Kingfisher Travel", "Colin", "Harper"],
        ["Larkspur Interiors", "Emma", "Doyle"],
        ["Millbrook Auto Repairs", "Dave", "Pickering"],
        ["Nettlebed Brewery", "Sam", "Oakes"],
        ["Orchard Lane Dental", "Sunita", "Verma"],
        ["Pebble Street Café", "Luis", "Moreno"],
        ["Quarry Hill Builders", "Gary", "Heslop"],
        ["Rosehip Skincare", "Tilly", "Bancroft"],
        ["Saltmarsh Seafood", "Declan", "Boyle"],
        ["Thistle & Thorn Garden Design", "Heather", "Grant"],
        ["Underhill Insurance Brokers", "Paul", "Winters"],
        ["Vantage Recruitment", "Chantelle", "Okoye"],
        ["Wren & Willow Photography", "Jonah", "Frost"],
        ["Yarrow Wellness", "Maya", "Pearce"],
        ["Zephyr Drone Surveys", "Callan", "Rhodes"],
        ["Abbey Road Tutors", "Wendy", "Chu"],
        ["Bluebell Care Homes", "Frank", "Eastwood"],
        ["Cinder Yard Studios", "Noor", "Siddiqui"],
        ["Dunmore Legal Services", "Rory", "Kincaid"],
        ["Everly Events", "Poppy", "Lindqvist"],
    ];
    const stages = ["Qualification", "Proposal|Quotation", "Negotiation", "Pending Approval", "Closed-Won", "Closed-Lost"] as const;
    const leadSources = ["website", "referral", "linkedin", "cold email", "event", "whatsapp", "google ads"];
    const leads = leadCompanies.map(([company, first, last], i) => {
        const [city, region, , street] = places[(i + 3) % places.length];
        const stage = weighted<(typeof stages)[number]>([
            ["Qualification", 22], ["Proposal|Quotation", 20], ["Negotiation", 16], ["Pending Approval", 10], ["Closed-Won", 20], ["Closed-Lost", 12],
        ]);
        const product = pick(products);
        const dealValue = money(product.price * pick([1, 3, 6, 12]) + (rnd() < 0.4 ? 950 : 0));
        const prob = { "Qualification": 0.1, "Proposal|Quotation": 0.25, "Negotiation": 0.5, "Pending Approval": 0.75, "Closed-Won": 1, "Closed-Lost": 0 }[stage];
        const createdAt = daysAgo(int(3, 270));
        const closed = stage === "Closed-Won" || stage === "Closed-Lost";
        return {
            _id: oid(),
            assigned_agent: pick(salesAgents)._id,
            company_name: company,
            person_name: `${first} ${last}`,
            email: `${first.toLowerCase()}@${slug(company)}.example`,
            mobile_number: phone(),
            lead_source: pick(leadSources),
            product: product._id,
            pipeline_stage: stage,
            deal_value: dealValue,
            expected_revenue: money(dealValue * prob),
            follow_up_date: closed ? daysAgo(int(1, 20)) : daysAhead(int(0, 10)),
            close_date: closed ? daysAgo(int(0, 15)) : daysAhead(int(7, 45)),
            location: { province: region, town: city, address: `${int(1, 90)} ${street.split(" ").slice(1).join(" ")}` },
            converted_to_invoice: stage === "Closed-Won" && rnd() < 0.7,
            createdAt,
            updatedAt: new Date(Math.min(now.getTime(), createdAt.getTime() + int(1, 40) * DAY)),
        };
    });

    /* ------------------------------- Tasks ----------------------------- */
    const taskSeeds: [string, string][] = [
        ["Send proposal to Granite Row Estate Agents", "Prepare the Business Support proposal with the onboarding package and send it before Friday."],
        ["Chase overdue invoices", "Contact customers with overdue invoices, offer a payment link and update the notes."],
        ["Prepare onboarding checklist for Kestrel Engineering", "Draft the data import plan, user roles and training dates."],
        ["Review escalated tickets", "Go through all escalated tickets and agree owners and next steps with engineering."],
        ["Book training workshop for Brightwater Dental", "Find a date that suits all five practices and send the calendar invite."],
        ["Update FAQ: password reset steps", "Rewrite the password reset FAQ with screenshots and the expected email delay."],
        ["Call back Zainab Malik about plan options", "She asked to compare Business and Premium support. Prepare a one page summary."],
        ["Reconcile this month's bank transfers", "Match incoming bank transfers to open invoices and mark them as paid."],
        ["Follow up with leads in Negotiation", "Check each negotiation lead, agree a close date and log the outcome."],
        ["Prepare monthly pipeline report", "Export pipeline by stage and compare with last month for the management meeting."],
        ["Set up WhatsApp integration for Northwind Logistics", "Connect their number, test inbound messages and train the dispatch team."],
        ["Clean up duplicate customers", "Merge duplicate records created during the spreadsheet import."],
    ];
    const tasks = Array.from({ length: 26 }, (_, i) => {
        const [title, description] = taskSeeds[i % taskSeeds.length];
        const createdAt = daysAgo(int(0, 30));
        return {
            _id: oid(),
            title: i < taskSeeds.length ? title : `${title} (follow-up)`,
            assigned_agent: pick(users.filter((u) => u.role !== "moderator"))._id,
            description,
            priority: weighted<string>([["High", 30], ["Medium", 45], ["Low", 25]]),
            status: weighted<string>([["Pending", 30], ["In-Progress", 30], ["Completed", 35], ["Cancelled", 5]]),
            createdAt,
            updatedAt: new Date(Math.min(now.getTime(), createdAt.getTime() + int(1, 5) * DAY)),
        };
    });

    /* -------------------------------- FAQs ----------------------------- */
    const faqs = [
        ["How do I reset my password?", "Select \"Forgot password?\" on the sign-in page and enter your work email. The reset link arrives within a few minutes and stays valid for one hour."],
        ["How do I import customers from a spreadsheet?", "Export your sheet as CSV with columns for name, email, phone and company, then use the import option on the Customers page. Our onboarding package can do this for you."],
        ["Can I connect my Gmail inbox?", "Yes. The Email Sync add-on connects a Gmail account through Google's secure sign-in, so you can read, send and turn emails into tickets."],
        ["How do roles and permissions work?", "Admins manage everything, managers see all leads and tickets, and agents see the records assigned to them."],
        ["How are leads organised?", "Leads move through six stages from Qualification to Closed-Won or Closed-Lost. Each stage has a win probability that feeds the expected revenue figure."],
        ["Can customers message us on WhatsApp?", "Yes. With the WhatsApp integration, inbound messages land in the shared inbox and can become tickets or leads in one click."],
        ["How do I create and send an invoice?", "Open Invoices, choose New, pick a customer and products, then send. You can mark it as paid when the payment arrives."],
        ["What does each ticket priority mean?", "Critical means service is down, high means a customer is blocked, medium is a normal request and low is a question or idea."],
        ["How quickly will support respond?", "Starter plans get a reply within one business day, Business within four hours and Premium within one hour, any time of day."],
        ["Can I export my data?", "Customers, leads and invoices can be exported to CSV at any time from their list pages."],
        ["Is there a limit on users?", "Plans include a set number of seats. You can add more with a five-seat pack whenever your team grows."],
        ["Who can I contact about a billing issue?", "Open a ticket in the Billing category and our finance team will respond within one business day."],
    ].map(([question, answer]) => ({ _id: oid(), question, answer }));

    /* ------------------------------- Chats ----------------------------- */
    // WhatsApp chats list only the signed-in agent as a member (the client shows the other member's name for 1:1 chats,
    // and a WhatsApp chat must show the customer instead). Other agents appear as message senders.
    // Every chat includes the demo admin (Amelia, users[0]) because the chat list only returns chats the signed-in user is in.
    const u = (first: string) => users.find((x) => x.first_name === first)!;
    const cust = (first: string, last: string) => customers.find((c) => c.first_name === first && c.last_name === last)!;

    type Line = [string | null, string]; // [sender first name, or null for the customer on WhatsApp, text]
    type ChatSeed = {
        name: string | null; group: boolean; admin?: string; members: string[]; source: "internal" | "whatsapp";
        customer?: [string, string]; minutesAgo: number; lines: Line[];
    };

    const chatSeeds: ChatSeed[] = [
        {
            name: null, group: false, members: ["Amelia", "Marcus"], source: "internal", minutesAgo: 25, lines: [
                ["Marcus", "Morning! Can you review the Northwind proposal before 2pm?"],
                ["Amelia", "Sure, I'll send notes within the hour."],
                ["Marcus", "Great. They asked about a 12-month term, so the discount may need your sign-off."],
                ["Amelia", "10% is fine for 12 months. Let's not go further than that."],
                ["Marcus", "Agreed. I'll update the quote now."],
            ],
        },
        {
            name: "Support Team", group: true, admin: "Amelia", members: ["Amelia", "Priya", "Chloe", "Hannah"], source: "internal", minutesAgo: 70, lines: [
                ["Priya", "Queue check: 8 active tickets, 2 escalated."],
                ["Chloe", "I'll take the two billing ones."],
                ["Hannah", "I can follow up with Brightwater about the training dates."],
                ["Amelia", "Great. Please keep critical tickets under a 1 hour response."],
                ["Priya", "Will do. The Gmail connection guide is in the FAQ now if anyone needs it."],
            ],
        },
        {
            name: null, group: false, members: ["Amelia", "Priya"], source: "internal", minutesAgo: 190, lines: [
                ["Priya", "FYI the WhatsApp issue at Northwind looks like an expired access token."],
                ["Amelia", "Thanks. Can you refresh it and confirm with Sarah?"],
                ["Priya", "Done, messages are arriving again. I'll close the ticket once they confirm."],
                ["Amelia", "Perfect."],
            ],
        },
        {
            name: "Sales Pipeline", group: true, admin: "Marcus", members: ["Marcus", "Amelia", "Daniel", "Luca"], source: "internal", minutesAgo: 60 * 26, lines: [
                ["Marcus", "Pipeline review at 3pm. Please update your lead stages beforehand."],
                ["Luca", "Updated mine. Two moved to Negotiation."],
                ["Daniel", "Mine too. Aldgate Wealth wants a revised quote by Friday."],
                ["Marcus", "Thanks. Daniel, loop in Priya for the onboarding estimate."],
                ["Daniel", "Will do."],
            ],
        },
        {
            name: null, group: false, members: ["Amelia", "Daniel"], source: "internal", minutesAgo: 60 * 30, lines: [
                ["Daniel", "Closed Quarry Hill Builders today 🎉"],
                ["Amelia", "Brilliant work! Can you add the onboarding package to the invoice?"],
                ["Daniel", "Already done, it went out this morning."],
            ],
        },
        {
            name: "Finance and Billing", group: true, admin: "Tom", members: ["Tom", "Amelia", "Marcus"], source: "internal", minutesAgo: 60 * 50, lines: [
                ["Tom", "Month-end is Friday. Please make sure sent invoices have the correct due dates."],
                ["Marcus", "Will do. Two of mine are still drafts."],
                ["Amelia", "Thanks both. Tom, can you share the revenue summary on Monday?"],
                ["Tom", "Yes, I'll post it here."],
            ],
        },
        {
            name: null, group: false, members: ["Amelia", "Tom"], source: "internal", minutesAgo: 60 * 75, lines: [
                ["Tom", "Three invoices are overdue by more than 30 days. Want me to send reminders?"],
                ["Amelia", "Yes, a polite reminder first. Move to a phone call after a week."],
                ["Tom", "On it. I'll log each reminder in the invoice note."],
            ],
        },
        {
            name: null, group: false, members: ["Amelia"], source: "whatsapp", customer: ["Sarah", "Kingsley"], minutesAgo: 140, lines: [
                [null, "Hi, our dispatch team stopped receiving WhatsApp messages this morning."],
                ["Priya", "Hi Sarah, thanks for letting us know. I'm checking it now."],
                ["Priya", "We've fixed it. Could you send a quick test message?"],
                [null, "Got it, everything is arriving again. Thank you!"],
            ],
        },
        {
            name: null, group: false, members: ["Amelia"], source: "whatsapp", customer: ["Anita", "Rao"], minutesAgo: 60 * 22, lines: [
                [null, "Hello! Can we book the team training for Thursday the 12th?"],
                ["Hannah", "Yes, Thursday works. I'm sending the calendar invite now."],
                [null, "Perfect, all five practices can attend."],
            ],
        },
        {
            name: null, group: false, members: ["Amelia"], source: "whatsapp", customer: ["Zainab", "Malik"], minutesAgo: 60 * 40, lines: [
                [null, "Hello, what's the difference between Business and Premium support?"],
                ["Daniel", "Premium adds 24/7 cover, a named account manager and a 1 hour response on critical issues. Business is 4 hours during working hours."],
                [null, "Thanks, I'll talk to my partners and come back to you."],
            ],
        },
        {
            name: null, group: false, members: ["Amelia"], source: "whatsapp", customer: ["Gareth", "Lloyd"], minutesAgo: 60 * 60, lines: [
                [null, "Payment for INV-1042 went out today."],
                ["Tom", "Thanks Gareth, we'll confirm as soon as it lands."],
            ],
        },
    ];

    const chats: any[] = [];
    const messages: any[] = [];
    for (const seed of chatSeeds) {
        const chatId = oid();
        const last = new Date(now.getTime() - seed.minutesAgo * 60 * 1000);
        let t = last.getTime() - (seed.lines.length - 1) * 8 * 60 * 1000; // about 8 minutes between messages
        const startedAt = new Date(t);
        let lastMessageId: mongoose.Types.ObjectId | null = null;

        seed.lines.forEach(([who, content], i) => {
            const id = oid();
            const at = new Date(t + i * 8 * 60 * 1000 + int(0, 120) * 1000);
            messages.push({
                _id: id,
                chat: chatId,
                ...(who ? { sender: u(who)._id } : {}), // WhatsApp messages from the customer have no sender
                content,
                createdAt: at,
                updatedAt: at,
                __v: 0,
            });
            lastMessageId = id;
        });

        chats.push({
            _id: chatId,
            chat_name: seed.name,
            is_group: seed.group,
            chat_pic: null,
            users: seed.members.map((m) => u(m)._id),
            latest_message: lastMessageId,
            group_admin: seed.admin ? u(seed.admin)._id : null,
            source: seed.source,
            customer: seed.customer ? cust(seed.customer[0], seed.customer[1])._id : null,
            createdAt: startedAt,
            updatedAt: last,
            __v: 0,
        });
    }

    return { users, customers, products, categories, tickets, invoices, leads, tasks, faqs, chats, messages };
}
