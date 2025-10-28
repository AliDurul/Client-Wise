"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const customer_model_1 = __importDefault(require("../models/customer.model"));
const lead_model_1 = __importDefault(require("../models/lead.model"));
const ticket_model_1 = __importDefault(require("../models/ticket.model"));
const invoice_model_1 = __importDefault(require("../models/invoice.model"));
class DashboardService {
    static async getAggregatedStats() {
        const [cardStats, monthlyStats, recentInvoices] = await Promise.all([
            this.getCardStats(),
            this.getMonthlyStats(),
            this.getRecentInvoices()
        ]);
        return {
            cardStats,
            monthlyStats,
            recentInvoices
        };
    }
    static async getCardStats() {
        const periodDays = 7;
        const now = new Date();
        const currentStart = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);
        const previousStart = new Date(currentStart.getTime() - periodDays * 24 * 60 * 60 * 1000);
        const invoiceMatch = { status: 'paid' };
        // Run aggregates in parallel
        const [customersRes, leadsRes, ticketsRes, invoicesRes] = await Promise.all([
            // Customers: total + byType
            customer_model_1.default.aggregate([
                {
                    $facet: {
                        total: [{ $count: 'value' }],
                        byType: [{ $group: { _id: '$customer_type', count: { $sum: 1 } } }],
                    },
                },
            ]),
            // Leads: total + by pipeline_stage
            lead_model_1.default.aggregate([
                {
                    $facet: {
                        total: [{ $count: 'value' }],
                        byStage: [{ $group: { _id: '$pipeline_stage', count: { $sum: 1 } } }],
                    },
                },
            ]),
            // Tickets: total + by status
            ticket_model_1.default.aggregate([
                {
                    $facet: {
                        total: [{ $count: 'value' }],
                        byStatus: [{ $group: { _id: '$status', count: { $sum: 1 } } }],
                    },
                },
            ]),
            // Invoices: sum invoice_items.total_price for total/thisPeriod/lastPeriod
            invoice_model_1.default.aggregate([
                {
                    $facet: {
                        total: [
                            { $match: invoiceMatch },
                            { $unwind: { path: '$invoice_items', preserveNullAndEmptyArrays: false } },
                            {
                                $group: {
                                    _id: null,
                                    total: { $sum: { $ifNull: ['$invoice_items.total_price', 0] } },
                                },
                            },
                        ],
                        thisPeriod: [
                            { $match: { ...invoiceMatch, createdAt: { $gte: currentStart } } },
                            { $unwind: { path: '$invoice_items', preserveNullAndEmptyArrays: false } },
                            {
                                $group: {
                                    _id: null,
                                    total: { $sum: { $ifNull: ['$invoice_items.total_price', 0] } },
                                },
                            },
                        ],
                        lastPeriod: [
                            { $match: { ...invoiceMatch, createdAt: { $gte: previousStart, $lt: currentStart } } },
                            { $unwind: { path: '$invoice_items', preserveNullAndEmptyArrays: false } },
                            {
                                $group: {
                                    _id: null,
                                    total: { $sum: { $ifNull: ['$invoice_items.total_price', 0] } },
                                },
                            },
                        ],
                    },
                },
            ]),
        ]);
        // Customers formatting
        const cFacet = customersRes[0] || {};
        const customerTotal = cFacet.total?.[0]?.value || 0;
        const customerByType = (cFacet.byType || []).reduce((acc, it) => {
            acc[it._id] = it.count;
            return acc;
        }, {});
        // Leads formatting
        const lFacet = leadsRes[0] || {};
        const leadTotal = lFacet.total?.[0]?.value || 0;
        const leadByStage = (lFacet.byStage || []).reduce((acc, it) => {
            acc[it._id] = it.count;
            return acc;
        }, {});
        const leadClosedWon = leadByStage['Closed-Won'] || 0;
        const leadNegotiation = leadByStage['Negotiation'] || 0;
        // Tickets formatting
        const tFacet = ticketsRes[0] || {};
        const ticketTotal = tFacet.total?.[0]?.value || 0;
        const ticketByStatus = (tFacet.byStatus || []).reduce((acc, it) => {
            acc[it._id] = it.count;
            return acc;
        }, {});
        const ticketActive = ticketByStatus['active'] || 0; // model enum is lowercase
        const ticketResolved = ticketByStatus['resolved'] || 0;
        // Invoices formatting
        const iFacet = invoicesRes[0] || {};
        const invTotal = iFacet.total?.[0]?.total || 0;
        const invThis = iFacet.thisPeriod?.[0]?.total || 0;
        const invLast = iFacet.lastPeriod?.[0]?.total || 0;
        const invGrowthPct = invLast === 0 ? (invThis > 0 ? 100 : 0) : Number((((invThis - invLast) / invLast) * 100).toFixed(2));
        return {
            customers: {
                total: customerTotal,
                byType: customerByType,
            },
            leads: {
                total: leadTotal,
                pipeline_stage: {
                    'Closed-Won': leadClosedWon,
                    'Negotiation': leadNegotiation,
                },
            },
            tickets: {
                total: ticketTotal,
                status: {
                    active: ticketActive,
                    resolved: ticketResolved,
                },
            },
            invoices: {
                totalProfit: invTotal,
                thisPeriodProfit: invThis,
                lastPeriodProfit: invLast,
                comparisonPct: invGrowthPct,
            },
            // meta: { period: periodParam, periodDays, now, currentStart, previousStart },
        };
    }
    static async getMonthlyStats() {
        // Compute date window: start = first day of month 11 months ago, end = first day of next month
        const now = new Date();
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
        const start = new Date(end.getFullYear(), end.getMonth() - 12, 1, 0, 0, 0, 0);
        // Tenant-aware filters
        const leadMatch = { createdAt: { $gte: start, $lt: end } };
        const invoiceMatch = { createdAt: { $gte: start, $lt: end } };
        // Aggregations in parallel
        const [incomeAgg, lostLeadsAgg, salesCountAgg, leadsCountAgg, ticketsCountAgg] = await Promise.all([
            // Income: sum invoice_items.total_price per month
            invoice_model_1.default.aggregate([
                { $match: invoiceMatch },
                { $unwind: { path: "$invoice_items", preserveNullAndEmptyArrays: false } },
                {
                    $group: {
                        _id: {
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" },
                        },
                        total: { $sum: { $ifNull: ["$invoice_items.total_price", 0] } },
                    },
                },
                { $project: { _id: 0, y: "$_id.year", m: "$_id.month", total: 1 } },
            ]),
            // Lead lost: count per month where pipeline_stage = 'Closed-Lost'
            lead_model_1.default.aggregate([
                { $match: { ...leadMatch, pipeline_stage: "Closed-Lost" } },
                {
                    $group: {
                        _id: {
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" },
                        },
                        count: { $sum: 1 },
                    },
                },
                { $project: { _id: 0, y: "$_id.year", m: "$_id.month", count: 1 } },
            ]),
            // Sales count: number of invoices per month
            invoice_model_1.default.aggregate([
                { $match: invoiceMatch },
                {
                    $group: {
                        _id: {
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" },
                        },
                        count: { $sum: 1 },
                    },
                },
                { $project: { _id: 0, y: "$_id.year", m: "$_id.month", count: 1 } },
            ]),
            // Leads count: number of leads created per month
            lead_model_1.default.aggregate([
                { $match: leadMatch },
                {
                    $group: {
                        _id: {
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" },
                        },
                        count: { $sum: 1 },
                    },
                },
                { $project: { _id: 0, y: "$_id.year", m: "$_id.month", count: 1 } },
            ]),
            // Tickets count: number of tickets created per month
            ticket_model_1.default.aggregate([
                { $match: { createdAt: { $gte: start, $lt: end } } },
                {
                    $group: {
                        _id: {
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" },
                        },
                        count: { $sum: 1 },
                    },
                },
                { $project: { _id: 0, y: "$_id.year", m: "$_id.month", count: 1 } },
            ]),
        ]);
        // Build month keys for last 12 months (chronological)
        const monthKeys = [];
        const months = [];
        for (let i = 11; i >= 0; i--) {
            const d = new Date(end.getFullYear(), end.getMonth() - i - 1, 1);
            const y = d.getFullYear();
            const m = d.getMonth() + 1; // 1-12
            months.push({ y, m });
            monthKeys.push(`${y}-${m.toString().padStart(2, '0')}`);
        }
        // Map aggregation results
        const incomeMap = new Map();
        for (const row of incomeAgg) {
            const key = `${row.y}-${String(row.m).padStart(2, '0')}`;
            incomeMap.set(key, row.total || 0);
        }
        const lostMap = new Map();
        for (const row of lostLeadsAgg) {
            const key = `${row.y}-${String(row.m).padStart(2, '0')}`;
            lostMap.set(key, row.count || 0);
        }
        const salesMap = new Map();
        for (const row of salesCountAgg) {
            const key = `${row.y}-${String(row.m).padStart(2, '0')}`;
            salesMap.set(key, row.count || 0);
        }
        const leadsMap = new Map();
        for (const row of leadsCountAgg) {
            const key = `${row.y}-${String(row.m).padStart(2, '0')}`;
            leadsMap.set(key, row.count || 0);
        }
        const ticketsMap = new Map();
        for (const row of ticketsCountAgg) {
            const key = `${row.y}-${String(row.m).padStart(2, '0')}`;
            ticketsMap.set(key, row.count || 0);
        }
        // Fill series arrays with zeros for missing months
        const incomeSeries = monthKeys.map((k) => incomeMap.get(k) ?? 0);
        const lostSeries = monthKeys.map((k) => lostMap.get(k) ?? 0);
        const salesSeries = monthKeys.map((k) => salesMap.get(k) ?? 0);
        const leadsSeries = monthKeys.map((k) => leadsMap.get(k) ?? 0);
        const ticketsSeries = monthKeys.map((k) => ticketsMap.get(k) ?? 0);
        const totalSales = salesSeries.reduce((sum, n) => sum + n, 0);
        const totalLeads = leadsSeries.reduce((sum, n) => sum + n, 0);
        const totalTickets = ticketsSeries.reduce((sum, n) => sum + n, 0);
        return {
            revenueSeries: [
                { name: 'Income', data: incomeSeries },
                { name: 'Lead lost', data: lostSeries },
            ],
            countSales: [{ name: 'Sales', data: salesSeries }],
            countLeads: [{ name: 'Leads', data: leadsSeries }],
            countTickets: [{ name: 'Tickets', data: ticketsSeries }],
            totalSales,
            totalLeads,
            totalTickets,
            // optional labels if needed by charting lib
            // labels: monthKeys,
        };
    }
    static parsePeriodDays(period) {
        if (!period)
            return 7;
        const lower = period.toLowerCase();
        // days explicit e.g. '7d', '30d'
        if (lower.endsWith('d')) {
            const n = Number(lower.slice(0, -1));
            return Number.isFinite(n) && n > 0 ? Math.floor(n) : 7;
        }
        // weeks e.g. '1w', '2w'
        if (lower.endsWith('w')) {
            const n = Number(lower.slice(0, -1));
            const days = (Number.isFinite(n) && n > 0 ? n : 1) * 7;
            return Math.floor(days);
        }
        // months e.g. '1m', '3m' -> approximate 30 days per month
        if (lower.endsWith('m')) {
            const n = Number(lower.slice(0, -1));
            const days = (Number.isFinite(n) && n > 0 ? n : 1) * 30;
            return Math.floor(days);
        }
        // plain number treated as days
        const n = Number(lower);
        return Number.isFinite(n) && n > 0 ? Math.floor(n) : 7;
    }
    static async getRecentInvoices() {
        const invoices = await invoice_model_1.default.find()
            .sort({ createdAt: -1 })
            .limit(15)
            .populate('customer', 'first_name last_name company_name email phone_number')
            .select('customer status total_amount createdAt')
            .lean();
        return invoices;
    }
}
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map