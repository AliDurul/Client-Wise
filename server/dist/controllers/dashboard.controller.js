"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
/**
 * Get comprehensive dashboard statistics
 * Aggregates data from multiple models for dashboard overview
 */
const getDashboardStats = async (req, res) => {
    const stats = await dashboard_service_1.DashboardService.getAggregatedStats();
    // console.log('hits');
    res.status(200).json({
        success: true,
        result: stats,
    });
};
exports.getDashboardStats = getDashboardStats;
//# sourceMappingURL=dashboard.controller.js.map