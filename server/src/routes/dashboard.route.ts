import { getDashboardStats } from "../controllers/dashboard.controller";
import { Router } from "express";

const router = Router();

router.get("/", getDashboardStats);
router.get("/overview", getDashboardStats);

export default router;