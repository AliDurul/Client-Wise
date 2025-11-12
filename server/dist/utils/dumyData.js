"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummyTasks = exports.dummyLeads = exports.dummyInvoices = exports.dummyTickets = exports.dummyTicketCategories = exports.dummyProducts = exports.dummyFaqs = exports.dummyCustomers = exports.dummyUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.dummyUsers = [
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439011"),
        employee_id: "EMP-1001",
        email: "admin@cms.com",
        password: "Admin@123",
        first_name: "John",
        last_name: "Anderson",
        phone_number: "+27 11 234 5678",
        role: "admin",
        department: "Management",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-1.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439012"),
        employee_id: "EMP-1002",
        email: "sarah.manager@cms.com",
        password: "Manager@123",
        first_name: "Sarah",
        last_name: "Williams",
        phone_number: "+27 21 345 6789",
        role: "manager",
        department: "Sales",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-2.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439013"),
        employee_id: "EMP-1003",
        email: "michael.jones@cms.com",
        password: "Employee@123",
        first_name: "Michael",
        last_name: "Jones",
        phone_number: "+27 31 456 7890",
        role: "employee",
        department: "Operations",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-3.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"),
        employee_id: "EMP-1004",
        email: "emma.davis@cms.com",
        password: "Agent@123",
        first_name: "Emma",
        last_name: "Davis",
        phone_number: "+27 12 567 8901",
        role: "agent",
        department: "Customer Support",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-4.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439015"),
        employee_id: "EMP-1005",
        email: "james.moderator@cms.com",
        password: "Mod@123",
        first_name: "James",
        last_name: "Miller",
        phone_number: "+27 41 678 9012",
        role: "moderator",
        department: "Quality Assurance",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-5.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"),
        employee_id: "EMP-1006",
        email: "olivia.brown@cms.com",
        password: "Agent@456",
        first_name: "Olivia",
        last_name: "Brown",
        phone_number: "+27 51 789 0123",
        role: "agent",
        department: "Customer Support",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-6.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439017"),
        employee_id: "EMP-1007",
        email: "william.wilson@cms.com",
        password: "Employee@456",
        first_name: "William",
        last_name: "Wilson",
        phone_number: "+27 15 890 1234",
        role: "employee",
        department: "Technical",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-7.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439018"),
        employee_id: "EMP-1008",
        email: "sophia.taylor@cms.com",
        password: "Manager@456",
        first_name: "Sophia",
        last_name: "Taylor",
        phone_number: "+27 13 901 2345",
        role: "manager",
        department: "Marketing",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-8.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"),
        employee_id: "EMP-1009",
        email: "benjamin.thomas@cms.com",
        password: "Agent@789",
        first_name: "Benjamin",
        last_name: "Thomas",
        phone_number: "+27 18 012 3456",
        role: "agent",
        department: "Customer Support",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-9.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901a"),
        employee_id: "EMP-1010",
        email: "ava.jackson@cms.com",
        password: "Employee@789",
        first_name: "Ava",
        last_name: "Jackson",
        phone_number: "+27 53 123 4567",
        role: "employee",
        department: "Finance",
        status: "active",
        is_verified: false,
        profile_pic: "profile_pics/profile-10.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901b"),
        employee_id: "EMP-1011",
        email: "lucas.white@cms.com",
        password: "Moderator@456",
        first_name: "Lucas",
        last_name: "White",
        phone_number: "+27 11 234 5679",
        role: "moderator",
        department: "Compliance",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-11.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901c"),
        employee_id: "EMP-1012",
        email: "mia.harris@cms.com",
        password: "Agent@012",
        first_name: "Mia",
        last_name: "Harris",
        phone_number: "+27 21 345 6780",
        role: "agent",
        department: "Customer Support",
        status: "inactive",
        is_verified: true,
        profile_pic: "profile_pics/profile-12.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901d"),
        employee_id: "EMP-1013",
        email: "ethan.martin@cms.com",
        password: "Employee@012",
        first_name: "Ethan",
        last_name: "Martin",
        phone_number: "+27 31 456 7891",
        role: "employee",
        department: "IT",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-13.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901e"),
        employee_id: "EMP-1014",
        email: "isabella.garcia@cms.com",
        password: "Manager@789",
        first_name: "Isabella",
        last_name: "Garcia",
        phone_number: "+27 12 567 8902",
        role: "manager",
        department: "Human Resources",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-14.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"),
        employee_id: "EMP-1015",
        email: "alexander.rodriguez@cms.com",
        password: "Agent@345",
        first_name: "Alexander",
        last_name: "Rodriguez",
        phone_number: "+27 41 678 9013",
        role: "agent",
        department: "Customer Support",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-11.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439020"),
        employee_id: "EMP-1016",
        email: "charlotte.martinez@cms.com",
        password: "Employee@345",
        first_name: "Charlotte",
        last_name: "Martinez",
        phone_number: "+27 51 789 0124",
        role: "employee",
        department: "Operations",
        status: "active",
        is_verified: false,
        profile_pic: "profile_pics/profile-12.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439021"),
        employee_id: "EMP-1017",
        email: "daniel.lopez@cms.com",
        password: "Moderator@789",
        first_name: "Daniel",
        last_name: "Lopez",
        phone_number: "+27 15 890 1235",
        role: "moderator",
        department: "Content Management",
        status: "suspended",
        is_verified: true,
        profile_pic: "profile_pics/profile-13.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"),
        employee_id: "EMP-1018",
        email: "amelia.gonzalez@cms.com",
        password: "Agent@678",
        first_name: "Amelia",
        last_name: "Gonzalez",
        phone_number: "+27 13 901 2346",
        role: "agent",
        department: "Customer Support",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-14.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439023"),
        employee_id: "EMP-1019",
        email: "matthew.hernandez@cms.com",
        password: "Employee@678",
        first_name: "Matthew",
        last_name: "Hernandez",
        phone_number: "+27 18 012 3457",
        role: "employee",
        department: "Logistics",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-15.jpeg",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439024"),
        employee_id: "EMP-1020",
        email: "harper.young@cms.com",
        password: "Manager@012",
        first_name: "Harper",
        last_name: "Young",
        phone_number: "+27 53 123 4568",
        role: "manager",
        department: "Product Development",
        status: "active",
        is_verified: true,
        profile_pic: "profile_pics/profile-16.jpeg",
    },
];
exports.dummyCustomers = [
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439011"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        customer_type: "individual",
        source: "phone_call",
        first_name: "Thabo",
        last_name: "Mokwena",
        email: "thabo.mokwena@gmail.com",
        phone_number: "+27 82 345 6789",
        nationality: "South African",
        dob: new Date("1985-03-15"),
        gender: "male",
        address: {
            street: "45 Mandela Street",
            city: "Johannesburg",
            state: "Gauteng",
            country: "South Africa",
            zip_code: "2001",
        },
        id_type: "nrc",
        id_number: "85031552340",
        profession: "Software Engineer",
        marital_status: "married",
        religion: "Christian",
        father_name: "David Mokwena",
        mother_name: "Grace Mokwena",
        number_of_children: 2,
        boys: 1,
        girls: 1,
        finincial_institution: "Standard Bank",
        profile_pic: "profile_pics/customer-1.jpeg",
        status: "customer",
        notes: "VIP customer, prefers morning calls",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439012"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439012"), // Sarah Williams - Manager
        id_type: "nrc",
        id_number: "92072256700",
        customer_type: "corporate",
        source: "website",
        company_name: "Tech Solutions Ltd",
        contact_person: "Sipho Ndlovu",
        registration_number: "2019/123456/07",
        email: "info@techsolutions.co.za",
        phone_number: "+27 11 234 5678",
        address: {
            street: "123 Business Park",
            city: "Sandton",
            state: "Gauteng",
            country: "South Africa",
            zip_code: "2196",
        },
        finincial_institution: "Nedbank",
        status: "customer",
        notes: "Large corporate client, quarterly reviews",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439013"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        customer_type: "individual",
        source: "referral",
        first_name: "Nomsa",
        last_name: "Khumalo",
        email: "nomsa.k@outlook.com",
        phone_number: "+27 83 456 7890",
        nationality: "South African",
        dob: new Date("1992-07-22"),
        gender: "female",
        address: {
            street: "78 Victoria Road",
            city: "Durban",
            state: "KwaZulu-Natal",
            country: "South Africa",
            zip_code: "4001",
        },
        id_type: "nrc",
        id_number: "92072256789",
        profession: "Teacher",
        marital_status: "single",
        religion: "Christian",
        father_name: "John Khumalo",
        mother_name: "Mary Khumalo",
        number_of_children: 0,
        finincial_institution: "FNB",
        profile_pic: "profile_pics/customer-2.jpeg",
        status: "lead",
        notes: "Interested in premium services",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439014"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        customer_type: "individual",
        source: "social_media",
        first_name: "Ahmed",
        last_name: "Hassan",
        email: "ahmed.hassan@yahoo.com",
        phone_number: "+27 84 567 8901",
        nationality: "Egyptian",
        dob: new Date("1988-11-30"),
        gender: "male",
        address: {
            street: "12 Long Street",
            city: "Cape Town",
            state: "Western Cape",
            country: "South Africa",
            zip_code: "8001",
        },
        id_type: "nrc",
        id_number: "84111523456",
        profession: "Business Consultant",
        marital_status: "married",
        religion: "Muslim",
        father_name: "Hassan Mohamed",
        mother_name: "Fatima Hassan",
        number_of_children: 3,
        boys: 2,
        girls: 1,
        finincial_institution: "ABSA",
        profile_pic: "profile_pics/customer-3.jpeg",
        status: "customer",
        notes: "Prefers email communication",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439015"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        customer_type: "corporate",
        id_type: 'nrc',
        id_number: '85062312345',
        source: "email",
        company_name: "Green Energy Solutions",
        contact_person: "Linda van der Merwe",
        registration_number: "2020/456789/07",
        email: "contact@greenenergy.co.za",
        phone_number: "+27 21 345 6789",
        address: {
            street: "56 Innovation Drive",
            city: "Cape Town",
            state: "Western Cape",
            country: "South Africa",
            zip_code: "7700",
        },
        finincial_institution: "Capitec Bank",
        status: "prospect",
        notes: "Potential high-value client, follow up monthly",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439016"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        customer_type: "individual",
        source: "whatsapp",
        first_name: "Zanele",
        last_name: "Dlamini",
        email: "zanele.dlamini@hotmail.com",
        phone_number: "+27 72 234 5678",
        nationality: "South African",
        dob: new Date("1995-05-18"),
        gender: "female",
        address: {
            street: "34 Hilltop Avenue",
            city: "Pretoria",
            state: "Gauteng",
            country: "South Africa",
            zip_code: "0002",
        },
        id_type: "nrc",
        id_number: "95051854321",
        profession: "Nurse",
        marital_status: "single",
        religion: "Christian",
        father_name: "Peter Dlamini",
        mother_name: "Susan Dlamini",
        number_of_children: 1,
        boys: 0,
        girls: 1,
        finincial_institution: "Standard Bank",
        profile_pic: "profile_pics/customer-4.jpeg",
        status: "customer",
        notes: "Responsive via WhatsApp",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439017"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        customer_type: "individual",
        source: "in_person",
        first_name: "Pieter",
        last_name: "Botha",
        email: "pieter.botha@gmail.com",
        phone_number: "+27 81 345 6789",
        nationality: "South African",
        dob: new Date("1978-09-12"),
        gender: "male",
        address: {
            street: "89 Oak Street",
            city: "Bloemfontein",
            state: "Free State",
            country: "South Africa",
            zip_code: "9301",
        },
        id_type: "nrc",
        id_number: "78091256781",
        profession: "Farmer",
        marital_status: "married",
        religion: "Christian",
        father_name: "Jan Botha",
        mother_name: "Maria Botha",
        witness_name: "Hennie Du Plessis",
        witness_relation: "Neighbor",
        number_of_children: 4,
        boys: 2,
        girls: 2,
        finincial_institution: "Absa",
        profile_pic: "profile_pics/customer-5.jpeg",
        status: "customer",
        notes: "Long-time customer, excellent payment history",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439018"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439012"), // Sarah Williams - Manager
        customer_type: "corporate",
        source: "referral",
        id_type: "nrc",
        id_number: "85062312345",
        company_name: "Coastal Logistics",
        contact_person: "Andile Mthembu",
        registration_number: "2018/987654/07",
        email: "operations@coastallogistics.co.za",
        phone_number: "+27 31 456 7890",
        address: {
            street: "200 Harbor Road",
            city: "Durban",
            state: "KwaZulu-Natal",
            country: "South Africa",
            zip_code: "4001",
        },
        finincial_institution: "Investec",
        status: "customer",
        notes: "Logistics partner, regular shipments",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439019"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        customer_type: "individual",
        source: "phone_call",
        first_name: "Lerato",
        last_name: "Molefe",
        email: "lerato.molefe@icloud.com",
        phone_number: "+27 73 456 7890",
        nationality: "South African",
        dob: new Date("1990-02-28"),
        gender: "female",
        address: {
            street: "67 Park Lane",
            city: "Polokwane",
            state: "Limpopo",
            country: "South Africa",
            zip_code: "0699",
        },
        id_type: "nrc",
        id_number: "90022854321",
        profession: "Accountant",
        marital_status: "divorced",
        religion: "Christian",
        father_name: "Moses Molefe",
        mother_name: "Ruth Molefe",
        number_of_children: 2,
        boys: 1,
        girls: 1,
        finincial_institution: "FNB",
        profile_pic: "profile_pics/customer-6.jpeg",
        status: "lead",
        notes: "Requested product information",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901a"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        customer_type: "individual",
        source: "website",
        first_name: "Rajesh",
        last_name: "Patel",
        email: "rajesh.patel@gmail.com",
        phone_number: "+27 82 567 8901",
        nationality: "Indian",
        dob: new Date("1982-04-10"),
        gender: "male",
        address: {
            street: "145 Gandhi Street",
            city: "Johannesburg",
            state: "Gauteng",
            country: "South Africa",
            zip_code: "2092",
        },
        id_type: "nrc",
        id_number: "82031876543",
        profession: "Restaurant Owner",
        marital_status: "married",
        religion: "Hindu",
        father_name: "Vijay Patel",
        mother_name: "Priya Patel",
        number_of_children: 3,
        boys: 2,
        girls: 1,
        finincial_institution: "Standard Bank",
        profile_pic: "profile_pics/customer-7.jpeg",
        status: "customer",
        notes: "Business owner, looking for expansion opportunities",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901b"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439018"), // Sophia Garcia - Manager
        customer_type: "corporate",
        source: "other",
        company_name: "Horizon Construction",
        contact_person: "James Nkosi",
        registration_number: "2017/234567/07",
        email: "info@horizonconstruction.co.za",
        phone_number: "+27 12 567 8901",
        address: {
            street: "88 Builder's Avenue",
            city: "Pretoria",
            state: "Gauteng",
            country: "South Africa",
            zip_code: "0081",
        },
        id_type: "nrc",
        id_number: "77061567890",
        finincial_institution: "Nedbank",
        status: "customer",
        notes: "Construction projects, seasonal business",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901c"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        customer_type: "individual",
        source: "referral",
        first_name: "Fatima",
        last_name: "Abrahams",
        email: "fatima.abrahams@webmail.co.za",
        phone_number: "+27 74 678 9012",
        nationality: "South African",
        dob: new Date("1987-08-05"),
        gender: "female",
        address: {
            street: "23 Mosque Road",
            city: "Cape Town",
            state: "Western Cape",
            country: "South Africa",
            zip_code: "7925",
        },
        id_type: "nrc",
        id_number: "87080552345",
        profession: "Social Worker",
        marital_status: "married",
        religion: "Muslim",
        father_name: "Ibrahim Abrahams",
        mother_name: "Ayesha Abrahams",
        number_of_children: 2,
        boys: 1,
        girls: 1,
        finincial_institution: "Capitec Bank",
        profile_pic: "profile_pics/customer-8.jpeg",
        status: "prospect",
        notes: "Referred by existing customer",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901d"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        customer_type: "individual",
        source: "social_media",
        first_name: "Kyle",
        last_name: "Thompson",
        email: "kyle.thompson@yahoo.com",
        phone_number: "+27 83 789 0123",
        nationality: "South African",
        dob: new Date("1993-12-20"),
        gender: "male",
        address: {
            street: "56 Beach Front",
            city: "Port Elizabeth",
            state: "Eastern Cape",
            country: "South Africa",
            zip_code: "6001",
        },
        id_type: "nrc",
        id_number: "93122054321",
        profession: "Marketing Manager",
        marital_status: "single",
        religion: "Christian",
        father_name: "Robert Thompson",
        mother_name: "Helen Thompson",
        number_of_children: 0,
        finincial_institution: "ABSA",
        profile_pic: "profile_pics/customer-9.jpeg",
        status: "lead",
        notes: "Active on LinkedIn, interested in digital services",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901e"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901e"), // Isabella Martinez - Manager
        customer_type: "corporate",
        source: "website",
        company_name: "Prime Medical Supplies",
        contact_person: "Dr. Sarah Mnguni",
        registration_number: "2021/345678/07",
        email: "procurement@primemedical.co.za",
        phone_number: "+27 11 678 9012",
        address: {
            street: "45 Medical Park",
            city: "Johannesburg",
            state: "Gauteng",
            country: "South Africa",
            zip_code: "2193",
        },
        id_type: "nrc",
        id_number: "80010167890",
        finincial_institution: "Standard Bank",
        status: "customer",
        notes: "Medical supplies distributor, monthly orders",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901f"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        customer_type: "individual",
        source: "phone_call",
        first_name: "Mandla",
        last_name: "Ngubane",
        email: "mandla.ngubane@outlook.com",
        phone_number: "+27 71 890 1234",
        nationality: "South African",
        dob: new Date("1975-06-14"),
        gender: "male",
        address: {
            street: "12 Township Road",
            city: "Nelspruit",
            state: "Mpumalanga",
            country: "South Africa",
            zip_code: "1200",
        },
        id_type: "nrc",
        id_number: "75061456782",
        profession: "Taxi Owner",
        marital_status: "married",
        religion: "Christian",
        father_name: "Samuel Ngubane",
        mother_name: "Thandi Ngubane",
        number_of_children: 5,
        boys: 3,
        girls: 2,
        finincial_institution: "Capitec Bank",
        profile_pic: "profile_pics/customer-10.jpeg",
        status: "customer",
        notes: "Transport business owner, cash payments preferred",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439020"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        customer_type: "individual",
        source: "email",
        first_name: "Chloe",
        last_name: "Williams",
        email: "chloe.williams@gmail.com",
        phone_number: "+27 82 901 2345",
        nationality: "South African",
        dob: new Date("1998-01-25"),
        gender: "female",
        address: {
            street: "78 Student Avenue",
            city: "Stellenbosch",
            state: "Western Cape",
            country: "South Africa",
            zip_code: "7600",
        },
        id_type: "nrc",
        id_number: "98012556783",
        profession: "Student",
        marital_status: "single",
        religion: "Christian",
        father_name: "Michael Williams",
        mother_name: "Jennifer Williams",
        number_of_children: 0,
        finincial_institution: "FNB",
        profile_pic: "profile_pics/customer-11.jpeg",
        status: "prospect",
        notes: "University student, potential future customer",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439021"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439024"), // Harper Lewis - Manager
        customer_type: "corporate",
        source: "referral",
        company_name: "Smart IT Solutions",
        contact_person: "Tshepo Mokoena",
        registration_number: "2019/567890/07",
        email: "hello@smartit.co.za",
        phone_number: "+27 21 012 3456",
        address: {
            street: "90 Tech Hub",
            city: "Cape Town",
            state: "Western Cape",
            country: "South Africa",
            zip_code: "8001",
        },
        id_type: "nrc",
        id_number: "86072912345",
        finincial_institution: "FNB Business",
        status: "customer",
        notes: "IT services provider, ongoing partnership",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439022"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        customer_type: "individual",
        source: "in_person",
        first_name: "Elizabeth",
        last_name: "Mbatha",
        email: "elizabeth.mbatha@hotmail.com",
        phone_number: "+27 84 123 4567",
        nationality: "South African",
        dob: new Date("1980-10-08"),
        gender: "female",
        address: {
            street: "34 Church Street",
            city: "Pietermaritzburg",
            state: "KwaZulu-Natal",
            country: "South Africa",
            zip_code: "3201",
        },
        id_type: "nrc",
        id_number: "80100856784",
        profession: "School Principal",
        marital_status: "widowed",
        religion: "Christian",
        father_name: "Joseph Mbatha",
        mother_name: "Martha Mbatha",
        number_of_children: 3,
        boys: 1,
        girls: 2,
        finincial_institution: "Nedbank",
        profile_pic: "profile_pics/customer-12.jpeg",
        status: "customer",
        notes: "Education professional, reliable customer",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439023"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        customer_type: "individual",
        source: "whatsapp",
        first_name: "Deon",
        last_name: "Kruger",
        email: "deon.kruger@gmail.com",
        phone_number: "+27 76 234 5678",
        nationality: "South African",
        dob: new Date("1991-03-03"),
        gender: "male",
        address: {
            street: "67 Vineyard Road",
            city: "Paarl",
            state: "Western Cape",
            country: "South Africa",
            zip_code: "7646",
        },
        id_type: "nrc",
        id_number: "91030356785",
        profession: "Wine Farmer",
        marital_status: "married",
        religion: "Christian",
        father_name: "Piet Kruger",
        mother_name: "Anna Kruger",
        number_of_children: 1,
        boys: 1,
        girls: 0,
        finincial_institution: "ABSA",
        profile_pic: "profile_pics/customer-13.jpeg",
        status: "customer",
        notes: "Agricultural sector, seasonal business cycles",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439024"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        customer_type: "corporate",
        source: "website",
        company_name: "Urban Retail Group",
        contact_person: "Nadia Patel",
        registration_number: "2016/678901/07",
        email: "contact@urbanretail.co.za",
        phone_number: "+27 11 345 6789",
        address: {
            street: "123 Shopping Mall",
            city: "Sandton",
            state: "Gauteng",
            country: "South Africa",
            zip_code: "2196",
        },
        id_type: "nrc",
        id_number: "75082912345",
        finincial_institution: "Standard Bank",
        status: "lead",
        notes: "Retail chain, exploring bulk purchase options",
    },
];
exports.dummyFaqs = [
    {
        _id: new mongoose_1.default.Types.ObjectId("707f1f77bcf86cd799439011"),
        question: "How do I reset my password?",
        answer: "To reset your password, click on the 'Forgot Password' link on the login page. Enter your registered email address, and you will receive a password reset link via email. Click the link and follow the instructions to create a new password."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("707f1f77bcf86cd799439012"),
        question: "What are your business hours?",
        answer: "Our customer support team is available Monday to Friday from 8:00 AM to 6:00 PM (SAST), and Saturday from 9:00 AM to 1:00 PM. For urgent matters outside business hours, you can use our ticketing system, and we'll respond as soon as possible."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("707f1f77bcf86cd799439013"),
        question: "How can I contact customer support?",
        answer: "You can reach our customer support team through multiple channels: phone at +27 11 234 5678, email at support@cms.com, WhatsApp messaging, or through our live chat feature available on the dashboard. You can also submit a support ticket directly from your account."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("707f1f77bcf86cd799439014"),
        question: "What payment methods do you accept?",
        answer: "We accept various payment methods including bank transfers (EFT), credit/debit cards (Visa, Mastercard), instant EFT, SnapScan, and direct debit arrangements for corporate clients. All transactions are processed securely through our encrypted payment gateway."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("707f1f77bcf86cd799439015"),
        question: "How long does it take to process my application?",
        answer: "Standard applications are typically processed within 2-3 business days. Once submitted, you'll receive a confirmation email, and our team will review your documents. If additional information is needed, we'll contact you directly. Priority processing is available for urgent cases."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("707f1f77bcf86cd799439016"),
        question: "Can I update my personal information after registration?",
        answer: "Yes, you can update most of your personal information through your account dashboard under 'Profile Settings'. For security reasons, certain critical changes like email address or phone number may require verification. Contact your assigned agent if you need assistance."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("707f1f77bcf86cd799439017"),
        question: "What documents do I need to provide?",
        answer: "Required documents vary based on customer type. For individuals: valid ID (passport, national ID, or driver's license), proof of residence, and bank statements. For corporate clients: company registration documents, tax clearance certificate, and authorized signatory details. Your agent will provide a complete checklist."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("707f1f77bcf86cd799439018"),
        question: "Is my personal information secure?",
        answer: "Absolutely. We employ industry-standard security measures including SSL encryption, secure data storage, and regular security audits. Your personal information is stored on secure servers and is only accessible to authorized personnel. We comply with POPIA (Protection of Personal Information Act) regulations."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("707f1f77bcf86cd799439019"),
        question: "How do I track my service requests?",
        answer: "All your service requests can be tracked through the 'Tickets' section in your dashboard. Each ticket has a unique reference number and shows real-time status updates. You'll also receive email notifications when there are updates or changes to your requests."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("707f1f77bcf86cd79943901a"),
        question: "Can I have multiple users on one account?",
        answer: "Yes, corporate accounts can have multiple user profiles with different permission levels. The primary account holder can invite team members and assign roles such as admin, manager, or employee. Each user will have their own login credentials and customized access."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("707f1f77bcf86cd79943901b"),
        question: "What is your refund policy?",
        answer: "Refund requests are evaluated on a case-by-case basis. For service cancellations within 7 days of purchase, full refunds are typically granted. After this period, partial refunds may apply depending on services rendered. Please contact your account manager to discuss specific situations."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("707f1f77bcf86cd79943901c"),
        question: "How do I upgrade or downgrade my service plan?",
        answer: "You can change your service plan at any time through your account settings or by contacting your assigned agent. Upgrades are effective immediately, while downgrades typically take effect at the start of the next billing cycle. Any price differences will be prorated accordingly."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("707f1f77bcf86cd79943901d"),
        question: "Do you offer training for new users?",
        answer: "Yes, we provide comprehensive onboarding training for all new users. This includes video tutorials, user guides, and one-on-one training sessions with your dedicated agent. We also conduct regular webinars covering advanced features and best practices."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("707f1f77bcf86cd79943901e"),
        question: "What happens if I miss a payment?",
        answer: "If a payment is missed, you'll receive a reminder notification via email and SMS. Your account will remain active for 7 days after the due date. After this grace period, certain features may be temporarily suspended until payment is received. Late fees may apply according to your service agreement."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("707f1f77bcf86cd79943901f"),
        question: "How can I provide feedback or suggestions?",
        answer: "We value your feedback! You can submit suggestions through the 'Feedback' section in your dashboard, email us at feedback@cms.com, or discuss directly with your assigned agent. We regularly review all feedback and use it to improve our services and user experience."
    },
];
exports.dummyProducts = [
    {
        _id: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439011"),
        name: "Comprehensive Life Insurance",
        description: "Full life coverage with death benefit, terminal illness cover, and funeral expenses. Provides financial security for your family with flexible premium options and guaranteed payout.",
        price: 1250,
        stock_quantity: 500,
        category: "Life Insurance",
        is_active: true
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439012"),
        name: "Term Life Insurance - 20 Year",
        description: "Affordable term life coverage for 20 years. Ideal for young families and those seeking temporary coverage during critical financial obligations like mortgage payments.",
        price: 450,
        stock_quantity: 1000,
        category: "Life Insurance",
        is_active: true
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439013"),
        name: "Whole Life Insurance Plus",
        description: "Permanent life insurance with cash value accumulation. Covers you for your entire lifetime with guaranteed death benefit and the ability to borrow against policy value.",
        price: 2800,
        stock_quantity: 300,
        category: "Life Insurance",
        is_active: true
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439014"),
        name: "Funeral Cover Standard",
        description: "Comprehensive funeral insurance covering burial costs, tombstone, groceries, and memorial service expenses. Includes cover for spouse and up to 6 children.",
        price: 180,
        stock_quantity: 2000,
        category: "Funeral Insurance",
        is_active: true
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439015"),
        name: "Funeral Cover Premium",
        description: "Extended funeral coverage with additional benefits including repatriation costs, premium waiver on death of breadwinner, and extended family cover up to 12 dependents.",
        price: 350,
        stock_quantity: 1500,
        category: "Funeral Insurance",
        is_active: true
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439016"),
        name: "Comprehensive Motor Insurance",
        description: "Full coverage for your vehicle including accident damage, theft, hijacking, fire, and third-party liability. Includes roadside assistance and courtesy car benefits.",
        price: 950,
        stock_quantity: 800,
        category: "Motor Insurance",
        is_active: true
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439017"),
        name: "Third Party Motor Insurance",
        description: "Essential motor insurance covering damage to third-party vehicles and property. Affordable option meeting legal requirements for vehicle owners on a budget.",
        price: 320,
        stock_quantity: 1200,
        category: "Motor Insurance",
        is_active: true
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439018"),
        name: "Home & Contents Insurance",
        description: "Complete protection for your home structure and belongings against fire, theft, natural disasters, and water damage. Includes alternative accommodation cover.",
        price: 680,
        stock_quantity: 600,
        category: "Home Insurance",
        is_active: true
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439019"),
        name: "Building Insurance Only",
        description: "Structural coverage for your property against risks like fire, lightning, storms, and malicious damage. Ideal for landlords and property owners.",
        price: 420,
        stock_quantity: 450,
        category: "Home Insurance",
        is_active: true
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901a"),
        name: "Hospital Cash Plan",
        description: "Daily cash benefit during hospital stays to cover out-of-pocket expenses. Pays R1,000 per day for up to 365 days per year, no waiting periods for accidents.",
        price: 295,
        stock_quantity: 1800,
        category: "Health Insurance",
        is_active: true
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901b"),
        name: "Gap Cover Insurance",
        description: "Covers shortfalls between medical scheme payments and actual medical costs. Essential supplement to medical aid for hospitalization and specialist visits.",
        price: 380,
        stock_quantity: 900,
        category: "Health Insurance",
        is_active: true
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901c"),
        name: "Disability Income Protection",
        description: "Monthly income replacement if you're unable to work due to disability or serious illness. Covers up to 75% of your salary with benefits payable until retirement age.",
        price: 520,
        stock_quantity: 700,
        category: "Income Protection",
        is_active: true
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901d"),
        name: "Critical Illness Cover",
        description: "Lump sum payout on diagnosis of specified critical illnesses including cancer, heart attack, stroke, and organ failure. Helps cover medical costs and lifestyle adjustments.",
        price: 890,
        stock_quantity: 550,
        category: "Health Insurance",
        is_active: true
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901e"),
        name: "Business Insurance Package",
        description: "Comprehensive SME protection including business property, stock, liability, and business interruption. Customizable coverage for shops, offices, and manufacturing operations.",
        price: 1650,
        stock_quantity: 400,
        category: "Business Insurance",
        is_active: true
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901f"),
        name: "Travel Insurance - Annual Multi-Trip",
        description: "Unlimited trips worldwide for 12 months covering medical emergencies, trip cancellation, lost luggage, and travel delays. Includes family cover option and adventure sports.",
        price: 1200,
        stock_quantity: 350,
        category: "Travel Insurance",
        is_active: true
    },
];
exports.dummyTicketCategories = [
    {
        _id: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439011"),
        name: "Policy Inquiry",
        description: "General questions about insurance policies, coverage details, terms and conditions, policy documents, and premium information."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439012"),
        name: "Claims Processing",
        description: "Issues related to filing claims, claim status updates, required documentation, claim approval/rejection, and payout timelines."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439013"),
        name: "Premium Payment",
        description: "Payment-related queries including payment methods, due dates, payment confirmation, failed transactions, and refund requests."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439014"),
        name: "Policy Renewal",
        description: "Assistance with policy renewal processes, renewal reminders, updating policy details during renewal, and renewal premium calculations."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439015"),
        name: "Policy Cancellation",
        description: "Requests for policy cancellation, cancellation procedures, refund calculations, cooling-off period queries, and cancellation documentation."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439016"),
        name: "Beneficiary Changes",
        description: "Requests to add, remove, or modify beneficiary information on life insurance and funeral policies, including required documentation."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439017"),
        name: "Coverage Modification",
        description: "Requests to increase or decrease coverage amounts, add riders, remove optional coverage, or upgrade/downgrade policy plans."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439018"),
        name: "Medical Underwriting",
        description: "Medical examination scheduling, health questionnaire assistance, pre-existing condition queries, and medical report submissions."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439019"),
        name: "Billing & Statements",
        description: "Requests for billing statements, premium receipts, tax certificates, payment history, and billing address updates."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd79943901a"),
        name: "Account Management",
        description: "Profile updates, contact information changes, password resets, online portal access issues, and document uploads."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd79943901b"),
        name: "Motor Insurance Claims",
        description: "Vehicle accident claims, theft reports, windscreen claims, roadside assistance requests, and third-party liability claims."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd79943901c"),
        name: "Home Insurance Claims",
        description: "Property damage claims, theft/burglary reports, water damage, fire damage, storm damage, and alternative accommodation requests."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd79943901d"),
        name: "Life Insurance Claims",
        description: "Death benefit claims, terminal illness claims, disability claims, and required documentation for life insurance payouts."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd79943901e"),
        name: "Technical Support",
        description: "Website navigation issues, mobile app problems, online payment errors, document upload failures, and system error reports."
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd79943901f"),
        name: "Complaint & Escalation",
        description: "Formal complaints about service quality, dissatisfaction with claim processing, agent behavior issues, and requests for management review."
    },
];
exports.dummyTickets = [
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd799439011"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439011"), // Thabo Mthembu
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439012"), // Claims Processing
        caller_phone: "+27 81 234 5678",
        title: "Motor Vehicle Accident Claim - Urgent Processing Required",
        description: "Customer involved in a minor collision on N1 highway near Johannesburg. Vehicle sustained front bumper and headlight damage. Other party admitted fault at the scene. Police case reference: JHB2024/11/1234. Requesting expedited claim processing as vehicle is customer's primary transport to work.",
        status: "active",
        source: "phone",
        priority: "high",
        flag: "important",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd799439012"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439012"), // Nomsa Khumalo
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439011"), // Policy Inquiry
        caller_phone: "+27 82 345 6789",
        title: "Life Insurance Policy Coverage Clarification",
        description: "Customer requesting detailed explanation of policy coverage, specifically regarding critical illness riders and exclusions. Wants to understand if pre-existing diabetes condition affects payout eligibility. Also inquiring about increasing coverage amount from R500,000 to R1,000,000.",
        status: "pending",
        source: "whatsapp",
        priority: "medium",
        flag: "moderate",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd799439013"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439013"), // Sipho Ndlovu
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd79943901d"), // Life Insurance Claims
        caller_phone: "+27 83 456 7890",
        title: "Death Benefit Claim Submission - Policy Holder Deceased",
        description: "Beneficiary calling to file death benefit claim. Policy holder (spouse) passed away on October 28, 2024. Death certificate obtained. Policy number: LIF-2018-045782. Beneficiary requesting guidance on required documentation and expected payout timeline. Claim amount: R750,000.",
        status: "active",
        source: "phone",
        priority: "critical",
        flag: "important",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd799439014"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439014"), // Lerato Mahlangu
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439013"), // Premium Payment
        caller_phone: "+27 84 567 8901",
        title: "Debit Order Failed - Premium Payment Issue",
        description: "Customer's monthly premium payment of R1,250 failed to process due to insufficient funds. Customer now wants to make immediate payment to avoid policy lapse. Grace period ends on November 15, 2024. Requesting alternative payment methods and confirmation of policy status.",
        status: "active",
        source: "email",
        priority: "high",
        flag: "important",
        email_id: "INBOX-20241111-001",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd799439015"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439015"), // Zanele Dlamini
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd79943901c"), // Home Insurance Claims
        caller_phone: "+27 85 678 9012",
        title: "Home Burglary Claim - Electronics and Jewelry Stolen",
        description: "Customer's home was burglarized on November 8, 2024 while family was away. Stolen items include: 65-inch Samsung TV (R18,000), MacBook Pro (R25,000), jewelry (estimated R45,000), and various household electronics. Police case opened: CPT2024/11/5678. Requesting claim assessor visit for damage evaluation.",
        status: "pending",
        source: "phone",
        priority: "high",
        flag: "important",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd799439016"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439016"), // Mandla Nkosi
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439014"), // Policy Renewal
        caller_phone: "+27 86 789 0123",
        title: "Funeral Policy Renewal - Update Beneficiary Information",
        description: "Customer's funeral policy expires on November 30, 2024. Requesting renewal with updated beneficiary details (recent marriage). Current coverage: R50,000. Wants to increase to R75,000 and add spouse as primary beneficiary. Also requesting premium quote for increased coverage.",
        status: "pending",
        source: "whatsapp",
        priority: "medium",
        flag: "moderate",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd799439017"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439017"), // Precious Mokoena
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd79943901b"), // Motor Insurance Claims
        caller_phone: "+27 87 890 1234",
        title: "Windscreen Damage Claim - Stone Chip Repair",
        description: "Customer's vehicle windscreen damaged by stone on highway. Large crack spreading from chip point, affecting driver's visibility. Vehicle: 2022 Toyota Hilux. Requesting approved glass repair service provider details and confirmation of excess amount. Claim value: approximately R4,500.",
        status: "resolved",
        source: "phone",
        priority: "low",
        flag: "moderate",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd799439018"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439018"), // Thandeka Zulu
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439015"), // Policy Cancellation
        caller_phone: "+27 88 901 2345",
        title: "Short-Term Insurance Policy Cancellation Request",
        description: "Customer requesting immediate cancellation of short-term insurance policy due to financial constraints. Policy start date: June 1, 2024. Paid 5 months premiums (R6,250). Requesting refund calculation for unused premium period and cancellation confirmation letter. No claims filed during coverage period.",
        status: "active",
        source: "email",
        priority: "medium",
        flag: "moderate",
        email_id: "INBOX-20241111-002",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd799439019"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439019"), // Bongani Ngcobo
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439018"), // Medical Underwriting
        caller_phone: "+27 89 012 3456",
        title: "Life Insurance Medical Examination Scheduling",
        description: "New life insurance application requires medical examination for coverage above R2,000,000. Customer available for examination next week, preferably in Durban area. Requesting list of approved medical practitioners and examination requirements. Also clarifying if full blood work is mandatory.",
        status: "pending",
        source: "whatsapp",
        priority: "medium",
        flag: "moderate",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd79943901a"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901a"), // Sizwe Buthelezi
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd79943901c"), // Home Insurance Claims
        caller_phone: "+27 71 123 4567",
        title: "Storm Damage Claim - Roof and Water Damage",
        description: "Severe storm on November 7, 2024 caused significant roof damage, leading to water ingress. Affected areas: master bedroom ceiling, lounge, and water damage to furniture. Emergency repairs completed to prevent further damage (invoice: R12,500). Requesting full damage assessment and claim processing. Estimated total: R85,000.",
        status: "active",
        source: "phone",
        priority: "critical",
        flag: "important",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd79943901b"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901b"), // Nozipho Khoza
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439016"), // Beneficiary Changes
        caller_phone: "+27 72 234 5678",
        title: "Update Life Insurance Beneficiaries - Birth of Child",
        description: "Customer recently had a baby and wants to add child as beneficiary alongside existing spouse beneficiary. Current split: 100% to spouse. Requested new split: 60% spouse, 40% child. Also requesting updated policy schedule reflecting changes. Policy type: Whole Life Insurance, coverage R1,500,000.",
        status: "pending",
        source: "email",
        priority: "low",
        flag: "moderate",
        email_id: "INBOX-20241111-003",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd79943901c"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901c"), // Kabelo Molefe
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd79943901b"), // Motor Insurance Claims
        caller_phone: "+27 73 345 6789",
        title: "Third-Party Liability Claim - Pedestrian Incident",
        description: "Customer's vehicle involved in incident with pedestrian in shopping center parking lot. Pedestrian sustained minor injuries (medical report attached). Customer admits liability. Third-party claiming R35,000 for medical expenses and loss of income. Requesting claim handler assignment and liability coverage confirmation.",
        status: "active",
        source: "phone",
        priority: "high",
        flag: "important",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd79943901d"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901d"), // Thembi Radebe
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd79943901e"), // Technical Support
        caller_phone: "+27 74 456 7890",
        title: "Mobile App Login Issues - Cannot Access Policy Documents",
        description: "Customer unable to log into mobile app for past 3 days. Error message: 'Invalid credentials' despite using correct password. Password reset attempts failing. Needs urgent access to policy documents for medical aid claim submission. Account email: thembi.radebe@email.com. User ID: TRI2024789.",
        status: "active",
        source: "whatsapp",
        priority: "medium",
        flag: "moderate",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd79943901e"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901e"), // Mpho Chabalala
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439017"), // Coverage Modification
        caller_phone: "+27 75 567 8901",
        title: "Increase Home Insurance Coverage - Property Renovations",
        description: "Customer completed major home renovations (R450,000 investment) including new kitchen, bathrooms, and garage conversion. Current home insurance coverage: R1,800,000. Requesting increase to R2,500,000 to reflect property improvements. Also wants to add all-risk cover for new appliances worth R120,000.",
        status: "pending",
        source: "email",
        priority: "medium",
        flag: "moderate",
        email_id: "INBOX-20241111-004",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd79943901f"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901f"), // Johannes van Wyk
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439019"), // Billing & Statements
        caller_phone: "+27 76 678 9012",
        title: "Request Tax Certificate for Life Insurance Premiums",
        description: "Customer requesting tax certificate (IRP5/IT3C) for life insurance premiums paid during 2024 tax year. Total premiums paid: R18,750. Needs certificate for SARS submission by November 30, 2024. Policy numbers: LIF-2020-034567, LIF-2021-045678. Email certificate to johannes.vw@company.co.za.",
        status: "resolved",
        source: "phone",
        priority: "low",
        flag: "moderate",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd799439020"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439020"), // Lindiwe Sithole
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd79943901f"), // Complaint & Escalation
        caller_phone: "+27 77 789 0123",
        title: "Formal Complaint - Delayed Claim Processing",
        description: "Customer filed motor vehicle claim on October 15, 2024 (Claim ref: MVC-2024-8934). Over 3 weeks with no assessor visit or communication. Vehicle remains undriveable. Multiple follow-up calls unreturned. Customer threatening legal action and media exposure. Requesting immediate manager escalation and complaint resolution within 48 hours.",
        status: "escalated",
        source: "email",
        priority: "critical",
        flag: "important",
        email_id: "INBOX-20241111-005",
        escalation: {
            raised_by: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"),
            reason: "Unacceptable claim processing delays, customer threatening legal action and reputational damage. Multiple service failures requiring immediate management intervention.",
            createdAt: new Date("2025-03-15T09:30:00Z"),
            updatedAt: new Date("2025-03-15T09:30:00Z"),
        },
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd799439021"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439021"), // Patrick Naidoo
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd79943901a"), // Account Management
        caller_phone: "+27 78 890 1234",
        title: "Update Contact Details and Banking Information",
        description: "Customer relocated from Durban to Cape Town. Requesting update of residential address, contact number, and banking details for premium debit orders. New address: 45 Beach Road, Camps Bay, Cape Town, 8005. New bank: Standard Bank, Account: 123456789, Branch: 051001. Effective date: December 1, 2024.",
        status: "active",
        source: "whatsapp",
        priority: "low",
        flag: "moderate",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd799439022"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439022"), // Thulisile Dube
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439012"), // Claims Processing
        caller_phone: "+27 79 901 2345",
        title: "Hospital Cash Plan Claim - Recent Surgery",
        description: "Customer underwent emergency appendectomy on November 5, 2024 at Netcare Milpark Hospital. Hospitalized for 3 days (Nov 5-8). Hospital cash plan policy provides R1,500 per day. Submitting claim for R4,500. All medical records and hospital invoices attached. Policy number: HCP-2023-067890.",
        status: "pending",
        source: "email",
        priority: "medium",
        flag: "moderate",
        email_id: "INBOX-20241111-006",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd799439023"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439023"), // Ayanda Mthethwa
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd79943901b"), // Motor Insurance Claims
        caller_phone: "+27 60 012 3456",
        title: "Vehicle Theft Claim - Car Stolen from Driveway",
        description: "Customer's 2021 VW Polo stolen from home driveway overnight on November 9, 2024. Vehicle last seen at 22:00, discovered missing at 06:00. Police case opened: JHB2024/11/7890. Vehicle tracking device not installed. Finance outstanding: R185,000. Insured value: R245,000. Requesting claim process guidance and rental car authorization.",
        status: "active",
        source: "phone",
        priority: "critical",
        flag: "important",
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("a07f1f77bcf86cd799439024"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439024"), // Sbusiso Ntuli
        category: new mongoose_1.default.Types.ObjectId("907f1f77bcf86cd799439011"), // Policy Inquiry
        caller_phone: "+27 61 123 4567",
        title: "Business Insurance Package Inquiry - New SME Coverage",
        description: "Small business owner (retail store) requesting comprehensive business insurance quote. Coverage needed: Building (R2.5M), Stock (R800K), Equipment (R350K), Public Liability (R5M), Business Interruption. Located in Pretoria CBD. 5 employees. Annual turnover: R4.2M. Requesting detailed quote and policy comparison options.",
        status: "pending",
        source: "phone",
        priority: "low",
        flag: "moderate",
    },
];
exports.dummyInvoices = [
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd799439011"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439011"), // Thabo Mthembu
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439011"), // Comprehensive Life Insurance
                quantity: 1,
                unit_price: 850.00,
                total_price: 850.00,
                discount: 0
            }
        ],
        status: "paid",
        shipping_cost: 0,
        discount: 0,
        tax: 0, // Insurance premiums are typically tax-exempt
        due_date: new Date("2024-12-01"),
        payment_type: "bank transfer",
        additional_note: "Monthly premium payment for Comprehensive Life Insurance policy. Policy number: LIF-2024-001234. Coverage amount: R2,000,000.",
        subtotal: 850.00,
        total_amount: 850.00,
        createdAt: new Date("2025-01-15T08:30:00Z"),
        updatedAt: new Date("2025-01-20T14:20:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd799439012"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439012"), // Nomsa Khumalo
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439012"), // Funeral Cover Plan
                quantity: 1,
                unit_price: 285.00,
                total_price: 285.00,
                discount: 0
            }
        ],
        status: "paid",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-12-01"),
        payment_type: "debit card",
        additional_note: "Monthly premium for Funeral Cover Plan. Policy covers policyholder and 5 extended family members. Total coverage: R75,000.",
        subtotal: 285.00,
        total_amount: 285.00,
        createdAt: new Date("2025-02-22T09:15:00Z"),
        updatedAt: new Date("2025-02-23T10:45:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd799439013"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439013"), // Sipho Ndlovu
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439013"), // Comprehensive Motor Insurance
                quantity: 1,
                unit_price: 1245.00,
                total_price: 1245.00,
                discount: 0
            }
        ],
        status: "overdue",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-11-10"),
        payment_type: "bank transfer",
        additional_note: "Monthly premium for Comprehensive Motor Insurance. Vehicle: 2020 Toyota Corolla. Insured value: R280,000. URGENT: Payment overdue, please settle immediately to avoid policy lapse.",
        subtotal: 1245.00,
        total_amount: 1245.00,
        createdAt: new Date("2025-04-18T07:00:00Z"),
        updatedAt: new Date("2025-05-12T08:00:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd799439014"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439014"), // Lerato Mahlangu
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439014"), // Home Insurance - Buildings & Contents
                quantity: 1,
                unit_price: 895.00,
                total_price: 895.00,
                discount: 0
            }
        ],
        status: "sent",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-11-25"),
        payment_type: "bank transfer",
        additional_note: "Monthly premium for Home Insurance covering buildings (R1.8M) and contents (R500K). Property located in Sandton, Johannesburg.",
        subtotal: 895.00,
        total_amount: 895.00,
        createdAt: new Date("2025-06-05T10:30:00Z"),
        updatedAt: new Date("2025-06-05T10:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd799439015"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439015"), // Zanele Dlamini
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439015"), // Medical Aid Gap Cover
                quantity: 1,
                unit_price: 425.00,
                total_price: 425.00,
                discount: 0
            }
        ],
        status: "paid",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-12-01"),
        payment_type: "debit card",
        additional_note: "Monthly premium for Medical Aid Gap Cover. Covers shortfalls from medical aid up to R250,000 per year. Primary member + 2 dependents.",
        subtotal: 425.00,
        total_amount: 425.00,
        createdAt: new Date("2025-07-28T11:00:00Z"),
        updatedAt: new Date("2025-07-28T15:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd799439016"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439016"), // Mandla Nkosi
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439012"), // Funeral Cover Plan
                quantity: 1,
                unit_price: 385.00,
                total_price: 385.00,
                discount: 38.50 // 10% discount for annual payment
            }
        ],
        status: "paid",
        shipping_cost: 0,
        discount: 38.50,
        tax: 0,
        due_date: new Date("2024-11-15"),
        payment_type: "bank transfer",
        additional_note: "Annual premium payment for Funeral Cover Plan (10% discount applied). Policy renewed for 12 months. Updated beneficiary: Spouse - Thandi Nkosi.",
        subtotal: 385.00,
        total_amount: 346.50,
        createdAt: new Date("2025-08-22T09:45:00Z"),
        updatedAt: new Date("2025-08-23T13:20:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd799439017"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439017"), // Precious Mokoena
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439013"), // Comprehensive Motor Insurance
                quantity: 1,
                unit_price: 1680.00,
                total_price: 1680.00,
                discount: 0
            }
        ],
        status: "paid",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-12-01"),
        payment_type: "debit card",
        additional_note: "Monthly premium for Comprehensive Motor Insurance. Vehicle: 2022 Toyota Hilux. Insured value: R485,000. Includes roadside assistance and windscreen cover.",
        subtotal: 1680.00,
        total_amount: 1680.00,
        createdAt: new Date("2025-09-17T08:00:00Z"),
        updatedAt: new Date("2025-09-19T16:45:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd799439018"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439018"), // Thandeka Zulu
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439016"), // Personal Accident Cover
                quantity: 1,
                unit_price: 195.00,
                total_price: 195.00,
                discount: 0
            }
        ],
        status: "closed",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-10-01"),
        payment_type: "bank transfer",
        additional_note: "Final premium payment before policy cancellation. Policy cancelled at customer's request effective October 31, 2024. Refund processed for unused period.",
        subtotal: 195.00,
        total_amount: 195.00,
        createdAt: new Date("2025-10-15T10:00:00Z"),
        updatedAt: new Date("2025-10-25T14:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd799439019"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439019"), // Bongani Ngcobo
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439011"), // Comprehensive Life Insurance
                quantity: 1,
                unit_price: 1450.00,
                total_price: 1450.00,
                discount: 0
            }
        ],
        status: "draft",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-12-01"),
        payment_type: "bank transfer",
        additional_note: "DRAFT - Awaiting medical examination results for new life insurance application. Coverage amount: R3,500,000. Premium subject to medical underwriting approval.",
        subtotal: 1450.00,
        total_amount: 1450.00,
        createdAt: new Date("2025-11-08T11:30:00Z"),
        updatedAt: new Date("2025-11-08T11:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd79943901a"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901a"), // Sizwe Buthelezi
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439014"), // Home Insurance - Buildings & Contents
                quantity: 1,
                unit_price: 1125.00,
                total_price: 1125.00,
                discount: 0
            }
        ],
        status: "paid",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-12-01"),
        payment_type: "bank transfer",
        additional_note: "Monthly premium for Home Insurance. Emergency repairs claim of R12,500 approved for storm damage. Premium increase due to claim history.",
        subtotal: 1125.00,
        total_amount: 1125.00,
        createdAt: new Date("2025-12-10T09:00:00Z"),
        updatedAt: new Date("2025-12-13T10:15:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd79943901b"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901b"), // Nozipho Khoza
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439011"), // Comprehensive Life Insurance
                quantity: 1,
                unit_price: 725.00,
                total_price: 725.00,
                discount: 0
            },
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901a"), // Hospital Cash Plan
                quantity: 1,
                unit_price: 245.00,
                total_price: 245.00,
                discount: 0
            }
        ],
        status: "paid",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-12-01"),
        payment_type: "debit card",
        additional_note: "Combined monthly premium for Life Insurance (R1.5M coverage) and Hospital Cash Plan (R1,500/day). Beneficiaries updated to include newborn child.",
        subtotal: 970.00,
        total_amount: 970.00,
        createdAt: new Date("2025-01-18T10:30:00Z"),
        updatedAt: new Date("2025-01-19T09:45:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd79943901c"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901c"), // Kabelo Molefe
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439013"), // Comprehensive Motor Insurance
                quantity: 1,
                unit_price: 1385.00,
                total_price: 1385.00,
                discount: 0
            }
        ],
        status: "paid",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-12-01"),
        payment_type: "bank transfer",
        additional_note: "Monthly premium for Comprehensive Motor Insurance. Third-party liability claim under investigation (Ref: TP-2024-5678). Premium may be affected upon claim settlement.",
        subtotal: 1385.00,
        total_amount: 1385.00,
        createdAt: new Date("2025-04-08T08:45:00Z"),
        updatedAt: new Date("2025-04-12T11:20:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd79943901d"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901d"), // Thembi Radebe
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439015"), // Medical Aid Gap Cover
                quantity: 1,
                unit_price: 385.00,
                total_price: 385.00,
                discount: 0
            }
        ],
        status: "sent",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-11-20"),
        payment_type: "debit card",
        additional_note: "Monthly premium for Medical Aid Gap Cover. Family plan covering 4 members. Annual benefit limit: R300,000.",
        subtotal: 385.00,
        total_amount: 385.00,
        createdAt: new Date("2025-06-23T09:30:00Z"),
        updatedAt: new Date("2025-06-23T09:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd79943901e"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901e"), // Mpho Chabalala
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439014"), // Home Insurance - Buildings & Contents
                quantity: 1,
                unit_price: 1450.00,
                total_price: 1450.00,
                discount: 0
            }
        ],
        status: "sent",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-11-25"),
        payment_type: "bank transfer",
        additional_note: "Updated monthly premium after property renovations. New coverage: Buildings R2.5M, Contents R650K. All-risk cover added for high-value appliances (R120K).",
        subtotal: 1450.00,
        total_amount: 1450.00,
        createdAt: new Date("2025-08-04T10:00:00Z"),
        updatedAt: new Date("2025-08-04T10:00:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd79943901f"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd79943901f"), // Johannes van Wyk
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439011"), // Comprehensive Life Insurance
                quantity: 2,
                unit_price: 625.00,
                total_price: 1250.00,
                discount: 0
            }
        ],
        status: "paid",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-12-01"),
        payment_type: "bank transfer",
        additional_note: "Monthly premium for two life insurance policies. Policy 1: R1.2M coverage. Policy 2: R800K coverage. Combined premium eligible for tax deduction.",
        subtotal: 1250.00,
        total_amount: 1250.00,
        createdAt: new Date("2025-09-20T07:30:00Z"),
        updatedAt: new Date("2025-09-20T16:00:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd799439020"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439020"), // Lindiwe Sithole
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439013"), // Comprehensive Motor Insurance
                quantity: 1,
                unit_price: 1575.00,
                total_price: 1575.00,
                discount: 0
            }
        ],
        status: "overdue",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-10-15"),
        payment_type: "bank transfer",
        additional_note: "URGENT OVERDUE: Monthly premium for Comprehensive Motor Insurance. Outstanding claim for vehicle repairs (Claim: MVC-2024-8934). Payment required immediately to maintain coverage during claim processing.",
        subtotal: 1575.00,
        total_amount: 1575.00,
        createdAt: new Date("2025-10-18T08:00:00Z"),
        updatedAt: new Date("2025-11-10T09:00:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd799439021"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439021"), // Patrick Naidoo
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439014"), // Home Insurance - Buildings & Contents
                quantity: 1,
                unit_price: 765.00,
                total_price: 765.00,
                discount: 0
            }
        ],
        status: "sent",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-12-01"),
        payment_type: "bank transfer",
        additional_note: "Monthly premium for Home Insurance. Address updated: 45 Beach Road, Camps Bay, Cape Town. Banking details updated for debit order. Effective December 1, 2024.",
        subtotal: 765.00,
        total_amount: 765.00,
        createdAt: new Date("2025-11-22T14:00:00Z"),
        updatedAt: new Date("2025-11-22T14:00:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd799439022"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439022"), // Thulisile Dube
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901a"), // Hospital Cash Plan
                quantity: 1,
                unit_price: 295.00,
                total_price: 295.00,
                discount: 0
            }
        ],
        status: "paid",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-12-01"),
        payment_type: "debit card",
        additional_note: "Monthly premium for Hospital Cash Plan. Recent claim approved: R4,500 for 3-day hospitalization (appendectomy). Benefit paid out successfully.",
        subtotal: 295.00,
        total_amount: 295.00,
        createdAt: new Date("2025-02-14T09:45:00Z"),
        updatedAt: new Date("2025-02-21T15:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd799439023"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439023"), // Ayanda Mthethwa
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439013"), // Comprehensive Motor Insurance
                quantity: 1,
                unit_price: 985.00,
                total_price: 985.00,
                discount: 0
            }
        ],
        status: "sent",
        shipping_cost: 0,
        discount: 0,
        tax: 0,
        due_date: new Date("2024-11-20"),
        payment_type: "bank transfer",
        additional_note: "Monthly premium for Comprehensive Motor Insurance. Vehicle theft claim filed (Ref: THF-2024-7890). Premium suspended pending claim investigation. Rental car authorization approved.",
        subtotal: 985.00,
        total_amount: 985.00,
        createdAt: new Date("2025-06-10T11:30:00Z"),
        updatedAt: new Date("2025-06-10T11:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("b07f1f77bcf86cd799439024"),
        creator: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        customer: new mongoose_1.default.Types.ObjectId("607f1f77bcf86cd799439024"), // Sbusiso Ntuli
        invoice_items: [
            {
                product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901e"), // Business Insurance Package
                quantity: 1,
                unit_price: 2850.00,
                total_price: 2850.00,
                discount: 285.00 // 10% discount for new business
            }
        ],
        status: "draft",
        shipping_cost: 0,
        discount: 285.00,
        tax: 0,
        due_date: new Date("2024-12-01"),
        payment_type: "bank transfer",
        additional_note: "DRAFT QUOTE - Comprehensive Business Insurance Package for retail store in Pretoria CBD. Coverage: Building R2.5M, Stock R800K, Equipment R350K, Public Liability R5M, Business Interruption. 10% new business discount applied. Awaiting customer approval.",
        subtotal: 2850.00,
        total_amount: 2565.00,
        createdAt: new Date("2025-10-29T10:00:00Z"),
        updatedAt: new Date("2025-10-29T10:00:00Z"),
    },
];
exports.dummyLeads = [
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd799439011"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        company_name: "Khulani Manufacturing (Pty) Ltd",
        person_name: "Thabo Maseko",
        email: "thabo.maseko@khulanimfg.co.za",
        mobile_number: "+27 82 456 7891",
        lead_source: "website",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901e"), // Business Insurance Package
        pipeline_stage: "Proposal|Quotation",
        deal_value: 45000.00,
        expected_revenue: 45000.00,
        follow_up_date: new Date("2024-11-15T10:00:00Z"),
        close_date: new Date("2024-11-30T17:00:00Z"),
        location: {
            province: "Gauteng",
            town: "Johannesburg",
            address: "12 Industrial Drive, Midrand, 1685"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-01-12T09:30:00Z"),
        updatedAt: new Date("2025-01-19T14:20:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd799439012"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        person_name: "Nomvula Dlamini",
        email: "nomvula.d@gmail.com",
        mobile_number: "+27 83 567 8902",
        lead_source: "referral",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439011"), // Comprehensive Life Insurance
        pipeline_stage: "Negotiation",
        deal_value: 12500.00,
        expected_revenue: 12500.00,
        follow_up_date: new Date("2024-11-14T11:00:00Z"),
        close_date: new Date("2024-11-25T17:00:00Z"),
        location: {
            province: "KwaZulu-Natal",
            town: "Durban",
            address: "45 Marine Parade, Durban Central, 4001"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-02-05T10:15:00Z"),
        updatedAt: new Date("2025-02-20T16:45:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd799439013"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        person_name: "Johan van der Merwe",
        email: "johan.vdm@outlook.com",
        mobile_number: "+27 84 678 9013",
        lead_source: "phone_call",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439013"), // Comprehensive Motor Insurance
        pipeline_stage: "Qualification",
        deal_value: 18000.00,
        expected_revenue: 18000.00,
        follow_up_date: new Date("2024-11-13T09:00:00Z"),
        close_date: new Date("2024-12-05T17:00:00Z"),
        location: {
            province: "Western Cape",
            town: "Cape Town",
            address: "89 Kloof Street, Gardens, 8001"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-03-28T08:45:00Z"),
        updatedAt: new Date("2025-03-28T08:45:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd799439014"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        person_name: "Zanele Khumalo",
        email: "zkhumalo@company.co.za",
        mobile_number: "+27 85 789 0124",
        lead_source: "social_media",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439014"), // Home Insurance - Buildings & Contents
        pipeline_stage: "Closed-Won",
        deal_value: 15600.00,
        expected_revenue: 15600.00,
        follow_up_date: null,
        close_date: new Date("2024-11-05T15:30:00Z"),
        location: {
            province: "Gauteng",
            town: "Pretoria",
            address: "23 Jacaranda Avenue, Brooklyn, 0181"
        },
        converted_to_invoice: true,
        createdAt: new Date("2025-04-15T11:00:00Z"),
        updatedAt: new Date("2025-05-01T15:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd799439015"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        company_name: "Rainbow Lodge & Resort",
        person_name: "Mpho Mokoena",
        email: "mpho@rainbowlodge.co.za",
        mobile_number: "+27 86 890 1235",
        lead_source: "website",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901f"), // Travel Insurance - Annual Multi-Trip
        pipeline_stage: "Pending Approval",
        deal_value: 8500.00,
        expected_revenue: 8500.00,
        follow_up_date: new Date("2024-11-12T10:30:00Z"),
        close_date: new Date("2024-11-20T17:00:00Z"),
        location: {
            province: "Mpumalanga",
            town: "Nelspruit",
            address: "56 Kruger Park Road, Nelspruit, 1200"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-05-18T13:20:00Z"),
        updatedAt: new Date("2025-05-26T09:15:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd799439016"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        person_name: "Sipho Ndlovu",
        email: "sipho.ndlovu78@gmail.com",
        mobile_number: "+27 87 901 2346",
        lead_source: "email",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439012"), // Funeral Cover Plan
        pipeline_stage: "Qualification",
        deal_value: 4200.00,
        expected_revenue: 4200.00,
        follow_up_date: new Date("2024-11-14T14:00:00Z"),
        close_date: new Date("2024-12-01T17:00:00Z"),
        location: {
            province: "Free State",
            town: "Bloemfontein",
            address: "78 President Brand Street, Bloemfontein, 9301"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-07-03T10:30:00Z"),
        updatedAt: new Date("2025-07-03T10:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd799439017"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        person_name: "Lerato Moloi",
        email: "lerato.moloi@webmail.co.za",
        mobile_number: "+27 88 012 3457",
        lead_source: "referral",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901d"), // Critical Illness Cover
        pipeline_stage: "Proposal|Quotation",
        deal_value: 9800.00,
        expected_revenue: 9800.00,
        follow_up_date: new Date("2024-11-16T11:00:00Z"),
        close_date: new Date("2024-11-28T17:00:00Z"),
        location: {
            province: "Gauteng",
            town: "Sandton",
            address: "15 Rivonia Road, Sandton, 2196"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-08-02T09:00:00Z"),
        updatedAt: new Date("2025-08-07T15:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd799439018"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        company_name: "Mzansi Transport Solutions",
        person_name: "Bongani Sithole",
        email: "bongani@mzansitransport.co.za",
        mobile_number: "+27 71 123 4568",
        lead_source: "website",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439013"), // Comprehensive Motor Insurance
        pipeline_stage: "Negotiation",
        deal_value: 85000.00,
        expected_revenue: 85000.00,
        follow_up_date: new Date("2024-11-13T10:00:00Z"),
        close_date: new Date("2024-11-22T17:00:00Z"),
        location: {
            province: "KwaZulu-Natal",
            town: "Pietermaritzburg",
            address: "34 Commercial Road, Pietermaritzburg, 3201"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-09-10T11:45:00Z"),
        updatedAt: new Date("2025-09-22T16:20:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd799439019"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        person_name: "Thandiwe Nkosi",
        email: "thandiwe.nkosi@gmail.com",
        mobile_number: "+27 72 234 5679",
        lead_source: "phone_call",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439015"), // Medical Aid Gap Cover
        pipeline_stage: "Closed-Lost",
        deal_value: 5400.00,
        expected_revenue: 0,
        follow_up_date: null,
        close_date: new Date("2024-11-07T14:00:00Z"),
        location: {
            province: "Eastern Cape",
            town: "Port Elizabeth",
            address: "67 Main Road, Summerstrand, 6019"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-10-20T09:30:00Z"),
        updatedAt: new Date("2025-11-02T14:00:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd79943901a"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        person_name: "Pieter Botha",
        email: "p.botha@corporate.co.za",
        mobile_number: "+27 73 345 6780",
        lead_source: "social_media",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901a"), // Hospital Cash Plan
        pipeline_stage: "Qualification",
        deal_value: 3600.00,
        expected_revenue: 3600.00,
        follow_up_date: new Date("2024-11-15T09:30:00Z"),
        close_date: new Date("2024-12-03T17:00:00Z"),
        location: {
            province: "Western Cape",
            town: "Stellenbosch",
            address: "12 Church Street, Stellenbosch, 7600"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-11-08T08:00:00Z"),
        updatedAt: new Date("2025-11-08T08:00:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd79943901b"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        person_name: "Nthabiseng Mahlangu",
        email: "nthabiseng.m@outlook.com",
        mobile_number: "+27 74 456 7891",
        lead_source: "referral",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439011"), // Comprehensive Life Insurance
        pipeline_stage: "Pending Approval",
        deal_value: 16200.00,
        expected_revenue: 16200.00,
        follow_up_date: new Date("2024-11-13T13:00:00Z"),
        close_date: new Date("2024-11-19T17:00:00Z"),
        location: {
            province: "Gauteng",
            town: "Soweto",
            address: "89 Vilakazi Street, Orlando West, 1804"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-03-12T14:30:00Z"),
        updatedAt: new Date("2025-03-21T10:45:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd79943901c"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        company_name: "Cape Tech Innovations",
        person_name: "Sarah Johnson",
        email: "sarah.j@capetechinno.com",
        mobile_number: "+27 75 567 8902",
        lead_source: "website",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901e"), // Business Insurance Package
        pipeline_stage: "Closed-Won",
        deal_value: 38500.00,
        expected_revenue: 38500.00,
        follow_up_date: null,
        close_date: new Date("2024-11-06T16:00:00Z"),
        location: {
            province: "Western Cape",
            town: "Cape Town",
            address: "102 Long Street, Cape Town CBD, 8001"
        },
        converted_to_invoice: true,
        createdAt: new Date("2025-06-28T10:00:00Z"),
        updatedAt: new Date("2025-07-16T16:00:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd79943901d"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        person_name: "Mandla Zwane",
        email: "mandla.zwane90@gmail.com",
        mobile_number: "+27 76 678 9013",
        lead_source: "email",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439016"), // Personal Accident Cover
        pipeline_stage: "Proposal|Quotation",
        deal_value: 2800.00,
        expected_revenue: 2800.00,
        follow_up_date: new Date("2024-11-14T10:00:00Z"),
        close_date: new Date("2024-11-27T17:00:00Z"),
        location: {
            province: "Limpopo",
            town: "Polokwane",
            address: "45 Schoeman Street, Polokwane, 0699"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-08-17T11:15:00Z"),
        updatedAt: new Date("2025-08-19T14:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd79943901e"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        person_name: "Ayanda Mthethwa",
        email: "ayanda.m@webmail.co.za",
        mobile_number: "+27 77 789 0124",
        lead_source: "phone_call",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439014"), // Home Insurance - Buildings & Contents
        pipeline_stage: "Negotiation",
        deal_value: 13800.00,
        expected_revenue: 13800.00,
        follow_up_date: new Date("2024-11-12T15:00:00Z"),
        close_date: new Date("2024-11-23T17:00:00Z"),
        location: {
            province: "KwaZulu-Natal",
            town: "Durban North",
            address: "23 Umhlanga Rocks Drive, Durban North, 4051"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-10-26T09:45:00Z"),
        updatedAt: new Date("2025-11-07T11:20:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd79943901f"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        person_name: "David Smith",
        email: "david.smith@mailbox.co.za",
        mobile_number: "+27 78 890 1235",
        lead_source: "social_media",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901c"), // Disability Income Protection
        pipeline_stage: "Qualification",
        deal_value: 11500.00,
        expected_revenue: 11500.00,
        follow_up_date: new Date("2024-11-16T09:00:00Z"),
        close_date: new Date("2024-12-08T17:00:00Z"),
        location: {
            province: "Gauteng",
            town: "Centurion",
            address: "67 Lenchen Avenue, Centurion, 0157"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-11-18T07:30:00Z"),
        updatedAt: new Date("2025-11-18T07:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd799439020"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        company_name: "Eastern Cape Logistics",
        person_name: "Thabo Radebe",
        email: "thabo@eclogistics.co.za",
        mobile_number: "+27 79 901 2346",
        lead_source: "referral",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439013"), // Comprehensive Motor Insurance
        pipeline_stage: "Pending Approval",
        deal_value: 125000.00,
        expected_revenue: 125000.00,
        follow_up_date: new Date("2024-11-14T11:30:00Z"),
        close_date: new Date("2024-11-21T17:00:00Z"),
        location: {
            province: "Eastern Cape",
            town: "East London",
            address: "156 Oxford Street, East London, 5201"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-04-20T10:00:00Z"),
        updatedAt: new Date("2025-04-27T12:15:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd799439021"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        person_name: "Nokuthula Dube",
        email: "nokuthula.dube@outlook.com",
        mobile_number: "+27 60 012 3457",
        lead_source: "website",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439012"), // Funeral Cover Plan
        pipeline_stage: "Closed-Won",
        deal_value: 4800.00,
        expected_revenue: 4800.00,
        follow_up_date: null,
        close_date: new Date("2024-11-08T14:30:00Z"),
        location: {
            province: "Mpumalanga",
            town: "Mbombela",
            address: "34 Brown Street, Mbombela, 1201"
        },
        converted_to_invoice: true,
        createdAt: new Date("2025-11-12T13:00:00Z"),
        updatedAt: new Date("2025-11-28T14:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd799439022"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        person_name: "Kagiso Molete",
        email: "kagiso.molete85@gmail.com",
        mobile_number: "+27 61 123 4568",
        lead_source: "email",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901b"), // Gap Cover Insurance
        pipeline_stage: "Proposal|Quotation",
        deal_value: 5200.00,
        expected_revenue: 5200.00,
        follow_up_date: new Date("2024-11-17T10:30:00Z"),
        close_date: new Date("2024-11-29T17:00:00Z"),
        location: {
            province: "North West",
            town: "Rustenburg",
            address: "78 Beyers Naude Drive, Rustenburg, 0299"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-07-09T09:15:00Z"),
        updatedAt: new Date("2025-07-13T13:45:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd799439023"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        person_name: "Lindiwe Cele",
        email: "lindiwe.cele@company.co.za",
        mobile_number: "+27 62 234 5679",
        lead_source: "phone_call",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd799439011"), // Comprehensive Life Insurance
        pipeline_stage: "Negotiation",
        deal_value: 18900.00,
        expected_revenue: 18900.00,
        follow_up_date: new Date("2024-11-13T14:00:00Z"),
        close_date: new Date("2024-11-24T17:00:00Z"),
        location: {
            province: "KwaZulu-Natal",
            town: "Richards Bay",
            address: "45 Kruger Street, Richards Bay, 3900"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-01-05T11:30:00Z"),
        updatedAt: new Date("2025-01-16T15:00:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("c07f1f77bcf86cd799439024"),
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        company_name: "Northern Cape Farming Co-op",
        person_name: "Jacobus Pretorius",
        email: "jacobus@ncfarmingcoop.co.za",
        mobile_number: "+27 63 345 6780",
        lead_source: "referral",
        product: new mongoose_1.default.Types.ObjectId("807f1f77bcf86cd79943901e"), // Business Insurance Package
        pipeline_stage: "Qualification",
        deal_value: 62000.00,
        expected_revenue: 62000.00,
        follow_up_date: new Date("2024-11-18T10:00:00Z"),
        close_date: new Date("2024-12-10T17:00:00Z"),
        location: {
            province: "Northern Cape",
            town: "Kimberley",
            address: "23 Bultfontein Road, Kimberley, 8301"
        },
        converted_to_invoice: false,
        createdAt: new Date("2025-12-08T08:30:00Z"),
        updatedAt: new Date("2025-12-08T08:30:00Z"),
    },
];
exports.dummyTasks = [
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd799439011"),
        title: "Follow up on life insurance medical examination results",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        description: "Contact Bongani Ngcobo regarding his life insurance application. Medical examination completed on Nov 5th. Results received, but need to discuss pre-existing condition disclosure and premium adjustment. Schedule callback for Nov 13th at 2:00 PM.",
        priority: "High",
        status: "In-Progress",
        createdAt: new Date("2025-02-14T09:00:00Z"),
        updatedAt: new Date("2025-02-17T14:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd799439012"),
        title: "Process motor vehicle theft claim documentation",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        description: "Review and verify all submitted documents for Ayanda Mthethwa's vehicle theft claim (2021 VW Polo). Police report received, tracking device report pending. Coordinate with claims assessor and finance department to confirm outstanding loan amount. Target completion: Nov 15th.",
        priority: "High",
        status: "In-Progress",
        createdAt: new Date("2025-04-07T10:30:00Z"),
        updatedAt: new Date("2025-04-09T16:45:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd799439013"),
        title: "Send policy renewal reminders for November expirations",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        description: "Prepare and send policy renewal notices to 15 customers with policies expiring end of November. Include updated premium quotes, benefit summaries, and online renewal links. Ensure all contact details are current before sending. Priority: Funeral and life insurance policies.",
        priority: "Medium",
        status: "Pending",
        createdAt: new Date("2025-05-15T08:00:00Z"),
        updatedAt: new Date("2025-05-15T08:00:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd799439014"),
        title: "Prepare business insurance quote for new corporate client",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        description: "Create comprehensive business insurance proposal for Sbusiso Ntuli's retail store in Pretoria CBD. Coverage needed: Building R2.5M, Stock R800K, Equipment R350K, Public Liability R5M, Business Interruption. Research competitor rates and apply 10% new business discount. Deadline: Nov 14th.",
        priority: "High",
        status: "In-Progress",
        createdAt: new Date("2025-07-12T09:30:00Z"),
        updatedAt: new Date("2025-07-12T15:20:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd799439015"),
        title: "Resolve customer complaint about delayed claim payment",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        description: "Urgent: Address Lindiwe Sithole's formal complaint regarding motor vehicle claim (MVC-2024-8934) processing delays. Claim filed Oct 15th, no assessor visit yet. Customer threatening legal action. Escalate to claims manager, arrange immediate assessor appointment, and provide daily updates.",
        priority: "High",
        status: "In-Progress",
        createdAt: new Date("2025-09-03T08:45:00Z"),
        updatedAt: new Date("2025-09-03T11:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd799439016"),
        title: "Update customer database with new contact details",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        description: "Process contact information updates for Patrick Naidoo who relocated from Durban to Cape Town. Update: residential address (45 Beach Road, Camps Bay), banking details (Standard Bank Acc: 123456789), phone number. Update debit order mandate effective Dec 1st. Verify all changes with customer.",
        priority: "Medium",
        status: "Pending",
        createdAt: new Date("2025-10-18T14:00:00Z"),
        updatedAt: new Date("2025-10-18T14:00:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd799439017"),
        title: "Schedule home property inspection for insurance coverage increase",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        description: "Arrange professional property valuation for Mpho Chabalala's home following R450K renovation. Current coverage R1.8M, requested increase to R2.5M. Book certified property assessor, ensure all renovation receipts and certificates of compliance are obtained. Complete assessment by Nov 20th.",
        priority: "Medium",
        status: "In-Progress",
        createdAt: new Date("2025-12-03T11:00:00Z"),
        updatedAt: new Date("2025-12-04T09:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd799439018"),
        title: "Process hospital cash plan claim payout",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        description: "Review and approve Thulisile Dube's hospital cash plan claim for appendectomy (3-day hospitalization, Nov 5-8, 2024). Verify medical records from Netcare Milpark Hospital. Calculate benefit: R1,500/day x 3 days = R4,500. Process payment within 48 hours. Status: All documents verified.",
        priority: "High",
        status: "Completed",
        createdAt: new Date("2025-02-25T10:00:00Z"),
        updatedAt: new Date("2025-02-26T16:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd799439019"),
        title: "Conduct quarterly compliance audit for agent licensing",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439012"), // Sarah Williams - Manager
        description: "Review all agent licenses, continuing education credits, and regulatory compliance documentation for Q4 2024. Ensure all agents have valid FAIS licenses, completed CPD requirements, and current E&O insurance. Compile report for FSB submission. Deadline: Nov 30th.",
        priority: "Low",
        status: "Pending",
        createdAt: new Date("2025-04-16T08:00:00Z"),
        updatedAt: new Date("2025-04-16T08:00:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd79943901a"),
        title: "Investigate premium payment failure and policy lapse prevention",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        description: "Contact Lerato Mahlangu urgently regarding failed debit order (R1,250) due to insufficient funds. Grace period ends Nov 15th. Discuss payment arrangements, offer alternative payment methods, send payment link. Prevent policy lapse and maintain customer goodwill.",
        priority: "High",
        status: "Pending",
        createdAt: new Date("2025-06-17T07:30:00Z"),
        updatedAt: new Date("2025-06-17T07:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd79943901b"),
        title: "Prepare tax certificates for end-of-year submissions",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        description: "Generate IRP5/IT3C tax certificates for life insurance premium payments made during 2024 tax year. Priority customers: Johannes van Wyk (R18,750 paid), and 23 other qualifying policyholders. Email certificates by Nov 25th to meet SARS submission deadlines.",
        priority: "Medium",
        status: "Pending",
        createdAt: new Date("2025-07-30T09:00:00Z"),
        updatedAt: new Date("2025-07-30T09:00:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd79943901c"),
        title: "Update beneficiary information after marriage",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439014"), // Emma Davis - Agent
        description: "Process beneficiary changes for Nozipho Khoza's life insurance policy (R1.5M coverage). Add newborn child as beneficiary. New split: 60% spouse, 40% child. Obtain certified birth certificate, complete beneficiary nomination forms, update policy schedule. Send confirmation within 5 business days.",
        priority: "Medium",
        status: "Completed",
        createdAt: new Date("2025-09-10T10:30:00Z"),
        updatedAt: new Date("2025-09-15T15:45:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd79943901d"),
        title: "Arrange assessor visit for storm damage claim",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        description: "Coordinate urgent assessor visit for Sizwe Buthelezi's home storm damage claim (Nov 7th incident). Affected: roof, ceiling, water damage to furniture. Emergency repairs R12,500 already completed. Schedule loss adjuster for comprehensive assessment. Estimated total claim: R85,000.",
        priority: "High",
        status: "Completed",
        createdAt: new Date("2025-11-02T08:30:00Z"),
        updatedAt: new Date("2025-11-03T17:00:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd79943901e"),
        title: "Negotiate settlement for third-party liability claim",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        description: "Handle third-party liability claim for Kabelo Molefe (pedestrian incident). Third-party claiming R35,000 for medical expenses and loss of income. Review medical reports, verify loss of income documentation, consult legal department. Aim for fair settlement, avoid litigation.",
        priority: "High",
        status: "In-Progress",
        createdAt: new Date("2025-11-26T10:00:00Z"),
        updatedAt: new Date("2025-11-28T13:15:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd79943901f"),
        title: "Send welcome package to new policyholders",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        description: "Prepare and send welcome packages to 8 new policyholders who purchased coverage this week. Include: policy documents, payment schedules, claims procedures, 24/7 emergency contacts, mobile app download instructions. Personalize each package with policy-specific information.",
        priority: "Low",
        status: "Pending",
        createdAt: new Date("2025-12-01T09:00:00Z"),
        updatedAt: new Date("2025-12-01T09:00:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd799439020"),
        title: "Review and approve windscreen replacement claim",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439016"), // Olivia Brown - Agent
        description: "Fast-track windscreen damage claim for Precious Mokoena (2022 Toyota Hilux). Stone chip on highway causing visibility issues. Claim amount: R4,500. Verify approved glass service provider, confirm excess payment (R500), authorize replacement. Target: Same-day approval.",
        priority: "Low",
        status: "Completed",
        createdAt: new Date("2025-06-18T11:00:00Z"),
        updatedAt: new Date("2025-06-18T15:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd799439021"),
        title: "Conduct customer satisfaction survey follow-up",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439022"), // Amelia Gonzalez - Agent
        description: "Follow up with 30 customers who completed recent satisfaction surveys. Address negative feedback, thank customers for positive reviews, identify service improvement opportunities. Schedule callback appointments with 5 dissatisfied customers to resolve concerns.",
        priority: "Low",
        status: "In-Progress",
        createdAt: new Date("2025-08-28T14:00:00Z"),
        updatedAt: new Date("2025-08-30T10:30:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd799439022"),
        title: "Process policy cancellation and refund calculation",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        description: "Handle Thandeka Zulu's short-term insurance policy cancellation request (financial constraints). Policy start: June 1, 2024, 5 months paid (R6,250). Calculate pro-rata refund for unused period, verify no pending claims, issue cancellation letter and refund within 10 business days.",
        priority: "Medium",
        status: "Completed",
        createdAt: new Date("2025-10-14T09:00:00Z"),
        updatedAt: new Date("2025-10-19T16:20:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd799439023"),
        title: "Coordinate fleet insurance quote for logistics company",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd79943901f"), // Alexander Rodriguez - Agent
        description: "Prepare comprehensive motor insurance quote for Eastern Cape Logistics (Thabo Radebe). Fleet of 25 commercial vehicles, annual coverage R125,000. Obtain vehicle schedules, driver details, claims history. Research fleet discount rates. Present proposal including tracking device requirements. Deadline: Nov 18th.",
        priority: "High",
        status: "In-Progress",
        createdAt: new Date("2025-12-15T11:30:00Z"),
        updatedAt: new Date("2025-12-16T14:45:00Z"),
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("d07f1f77bcf86cd799439024"),
        title: "Troubleshoot mobile app access issue for customer",
        assigned_agent: new mongoose_1.default.Types.ObjectId("507f1f77bcf86cd799439019"), // Benjamin Thomas - Agent
        description: "Resolve login issues for Thembi Radebe who cannot access mobile app (3 days, 'Invalid credentials' error). Reset password, verify account email (thembi.radebe@email.com), check account status, test login. Customer needs urgent access to policy documents for medical aid claim. Priority resolution required.",
        priority: "Medium",
        status: "Cancelled",
        createdAt: new Date("2025-05-12T13:00:00Z"),
        updatedAt: new Date("2025-05-13T10:15:00Z"),
    },
];
//# sourceMappingURL=dumyData.js.map