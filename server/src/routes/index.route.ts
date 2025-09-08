import { Router } from "express";
import userRoutes from "./user.route";
import authRoutes from "./auth.route";
import faqRoutes from "./faq.route";
import taskRoutes from "./task.route";
import customerRoutes from "./customer.route";
import invoiceRoutes from "./invoice.route";
import productRoutes from "./product.route";
import ticketRoutes from "./ticket.route";
import leadRoutes from "./lead.route";
import chatRoutes from './chatMessage.route';
import wpRoutes from './wp.route';
import webhookRoutes from './webhook.route';

const router = Router();

// authRoutes
router.use('/auth', authRoutes);

// userRoutes
router.use("/users", userRoutes);

// customerRoutes
router.use("/customers", customerRoutes);

// faqRoutes
router.use("/faqs", faqRoutes);

// taskRoutes
router.use("/tasks", taskRoutes);

// invoiceRoutes
router.use("/invoices", invoiceRoutes);

// productRoutes
router.use("/products", productRoutes);

// ticketRoutes
router.use("/tickets", ticketRoutes);

// leadRoutes
router.use("/leads", leadRoutes);

// Chats&Messages
router.use("/chats", chatRoutes);

// WhatsApp
router.use("/wp", wpRoutes);

// Webhook
router.use("/webhook", webhookRoutes)

export default router;