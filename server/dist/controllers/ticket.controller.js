"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicCat = exports.updateTicCat = exports.getTicCatById = exports.createTicCat = exports.getTicCats = exports.getTicComs = exports.createTicCom = exports.getTicketStats = exports.deleteTicket = exports.updateTicket = exports.getTicketById = exports.createTicket = exports.getTickets = void 0;
const ticket_model_1 = __importStar(require("../models/ticket.model"));
const common_1 = require("../utils/common");
const getTickets = async (req, res) => {
    const result = await res.getModelList(ticket_model_1.default, {}, [
        { path: 'customer', select: 'full_name first_name last_name email phone_number profile_pic' },
        { path: 'assigned_agent', select: 'full_name first_name last_name email phone_number profile_pic' },
        { path: 'category', select: 'name' },
        { path: 'escalation.raised_by', select: 'full_name first_name last_name email phone_number profile_pic' }
    ], '-comments');
    // let result: ITicket[] = [];
    // if (req.query.select) {
    //     const selectFields = req.query.select ? String(req.query.select).split(',').join(' ') : '';
    //     result = await Ticket.find({})
    //         .select(selectFields)
    //         .limit(100)
    //         .lean();
    // } else {
    //     result = await res.getModelList(Ticket, {}, [
    //         { path: 'customer', select: 'full_name first_name last_name email phone_number profile_pic' },
    //         { path: 'assigned_agent', select: 'full_name first_name last_name email phone_number profile_pic' },
    //         { path: 'category', select: 'name' },
    //         { path: 'escalation.raised_by', select: 'full_name first_name last_name email phone_number profile_pic' }
    //     ], '-comments');
    // }
    await Promise.all(result.map(async (ticket) => {
        if (ticket.customer?.profile_pic) {
            ticket.customer.profile_pic = await (0, common_1.getImageUrl)(ticket.customer.profile_pic);
        }
    }));
    res.send({
        success: true,
        details: await res.getModelListDetails(ticket_model_1.default),
        result,
    });
};
exports.getTickets = getTickets;
const createTicket = async (req, res) => {
    const userId = req.user?.id;
    if (!req.body.assigned_agent) {
        req.body.assigned_agent = userId;
    }
    if (req.body.email_id) {
        const isExistEmail = await ticket_model_1.default.exists({ email_id: req.body.email_id });
        if (isExistEmail)
            throw new common_1.CustomError("A ticket with this email ID already exists.", 400, true);
    }
    const result = await ticket_model_1.default.create(req.body);
    if (!result)
        throw new common_1.CustomError("Failed to create ticket", 500, true);
    res.send({
        success: true,
        result,
    });
};
exports.createTicket = createTicket;
const getTicketById = async (req, res) => {
    const { id } = req.params;
    const result = await (await ticket_model_1.default.findById(id)).populate([
        { path: 'customer', select: 'full_name first_name last_name email phone_number profile_pic' },
        { path: 'assigned_agent', select: 'full_name first_name last_name email phone_number profile_pic' },
        { path: 'category', select: 'name' },
        { path: 'escalation.raised_by', select: 'full_name first_name last_name email phone_number profile_pic' },
        { path: 'comments.author', select: 'full_name first_name last_name email phone_number profile_pic' }
    ]);
    if (!result)
        throw new common_1.CustomError("Ticket not found", 404);
    if (result.comments && Array.isArray(result.comments)) {
        result.comments = await Promise.all(result.comments
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map(async (comment) => {
            if (comment.author?.profile_pic) {
                comment.author.profile_pic = await (0, common_1.getImageUrl)(comment.author.profile_pic);
            }
            return comment;
        }));
    }
    res.status(200).send({
        success: true,
        result,
    });
};
exports.getTicketById = getTicketById;
const updateTicket = async (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;
    if (reason) {
        req.body.escalation = {
            raised_by: req.user.id,
            reason
        };
        req.body.status = 'escalated';
    }
    const result = await ticket_model_1.default.findByIdAndUpdate(id, req.body, { new: true });
    if (!result)
        throw new common_1.CustomError("Ticket not found", 404);
    res.status(201).send({
        success: true,
        result
    });
};
exports.updateTicket = updateTicket;
const deleteTicket = async (req, res) => {
    const { id } = req.params;
    const data = await ticket_model_1.default.deleteOne({ _id: id });
    if (!data.deletedCount)
        throw new common_1.CustomError("Ticket not found or already deleted.", 404, true);
    res.status(data.deletedCount ? 204 : 404).send({
        success: data.deletedCount,
        data
    });
};
exports.deleteTicket = deleteTicket;
const getTicketStats = async (req, res) => {
    // Aggregate ticket stats
    const stats = await ticket_model_1.default.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);
    const status_counts = {
        Pending: 0,
        Active: 0,
        Resolved: 0,
        Cancelled: 0,
        Escalated: 0
    };
    let total_count = 0;
    stats.forEach(s => {
        switch (s._id) {
            case "pending":
                status_counts.Pending = s.count;
                break;
            case "active":
                status_counts.Active = s.count;
                break;
            case "resolved":
                status_counts.Resolved = s.count;
                break;
            case "cancelled":
                status_counts.Cancelled = s.count;
                break;
            case "escalated":
                status_counts.Escalated = s.count;
                break;
        }
        total_count += s.count;
    });
    res.send({
        success: true,
        result: {
            total_count,
            status_counts
        }
    });
};
exports.getTicketStats = getTicketStats;
// --------------- TICKET COMMENTS ---------------
const createTicCom = async (req, res) => {
    const author = req.user?.id;
    const { comment, ticketId } = req.body;
    const result = await ticket_model_1.default.findByIdAndUpdate(ticketId, { $push: { comments: { comment, author } } });
    if (!result)
        throw new common_1.CustomError("Failed to create comment", 500, true);
    res.send({
        success: true,
        result,
    });
};
exports.createTicCom = createTicCom;
const getTicComs = async (req, res) => {
    const result = await (await ticket_model_1.default.findById(req.params.ticketId).select('comments escalation')).populate([
        { path: 'comments.author', select: 'full_name first_name last_name email phone_number profile_pic' },
        { path: 'escalation.raised_by', select: 'full_name first_name last_name email phone_number profile_pic' }
    ]);
    if (result.escalation?.raised_by && result.escalation.raised_by.profile_pic) {
        result.escalation.raised_by.profile_pic = await (0, common_1.getImageUrl)(result.escalation.raised_by.profile_pic);
    }
    if (result.comments && Array.isArray(result.comments)) {
        result.comments = await Promise.all(result.comments
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map(async (comment) => {
            if (comment.author?.profile_pic) {
                comment.author.profile_pic = await (0, common_1.getImageUrl)(comment.author.profile_pic);
            }
            return comment;
        }));
    }
    res.send({
        success: true,
        result,
    });
};
exports.getTicComs = getTicComs;
// --------------- TICKET CATEGORIES ---------------
const getTicCats = async (req, res) => {
    const result = await res.getModelList(ticket_model_1.TicCat);
    res.send({
        success: true,
        details: await res.getModelListDetails(ticket_model_1.TicCat),
        result,
    });
};
exports.getTicCats = getTicCats;
const createTicCat = async (req, res) => {
    const userId = req.user?.id;
    req.body.assigned_agent = userId;
    const result = await ticket_model_1.TicCat.create(req.body);
    if (!result)
        throw new common_1.CustomError("Failed to create FAQ", 500);
    res.send({
        success: true,
        result,
    });
};
exports.createTicCat = createTicCat;
const getTicCatById = async (req, res) => {
    const { id } = req.params;
    const result = await ticket_model_1.TicCat.findById(id);
    if (!result)
        throw new common_1.CustomError("TicCat not found", 404);
    res.status(200).send({
        success: true,
        result,
    });
};
exports.getTicCatById = getTicCatById;
const updateTicCat = async (req, res) => {
    const { id } = req.params;
    const result = await ticket_model_1.TicCat.findByIdAndUpdate(id, req.body, { new: true });
    if (!result)
        throw new common_1.CustomError("TicCat not found", 404);
    res.status(201).send({
        success: true,
        result
    });
};
exports.updateTicCat = updateTicCat;
const deleteTicCat = async (req, res) => {
    const { id } = req.params;
    const data = await ticket_model_1.TicCat.deleteOne({ _id: id });
    if (!data.deletedCount)
        throw new common_1.CustomError("TicCat not found or already deleted.", 404, true);
    res.status(data.deletedCount ? 204 : 404).send({
        success: data.deletedCount,
        data
    });
};
exports.deleteTicCat = deleteTicCat;
//# sourceMappingURL=ticket.controller.js.map