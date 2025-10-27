import { Request, Response } from "express";
import Customer from "../models/customer.model";
import Lead from "../models/lead.model";
import Ticket from "../models/ticket.model";
import Invoice from "../models/invoice.model";
import mongoose from "mongoose";
import { DashboardService } from "../services/dashboard.service";

/**
 * Get comprehensive dashboard statistics
 * Aggregates data from multiple models for dashboard overview
 */
export const getDashboardStats = async (req: Request, res: Response) => {

    const stats = await DashboardService.getAggregatedStats();

    // console.log('hits');
    res.status(200).json({
        success: true,
        result: stats,
    })
};
