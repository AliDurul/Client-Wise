import { Router } from "express";
import { requireAuth } from "../middlewares/common";
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
import wpWebhookRoutes from './wp.webhook.route';
import emailRoutes from './email.route';
import dashboardRoutes from './dashboard.route';

const router = Router();

// URL: /api

// ---- Public routes (no token needed) ----

// authRoutes: login, register, refresh, password reset
router.use('/auth', authRoutes);

// Webhook: called by WhatsApp's servers, which cannot send our JWT
router.use("/webhook", wpWebhookRoutes);

// ---- Everything below requires a signed-in user ----
router.use(requireAuth);

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

// Email
router.use("/emails", emailRoutes);

// Dashboard
router.use("/dashboard", dashboardRoutes);

export default router;