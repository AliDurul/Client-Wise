"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiDeleteLeads = exports.deleteLead = exports.updateLead = exports.getLeadById = exports.createLead = exports.getLeads = void 0;
const lead_model_1 = __importDefault(require("../models/lead.model"));
const common_1 = require("../utils/common");
const getLeads = async (req, res) => {
    const result = await res.getModelList(lead_model_1.default);
    res.send({
        success: true,
        details: await res.getModelListDetails(lead_model_1.default),
        result,
    });
};
exports.getLeads = getLeads;
const createLead = async (req, res) => {
    req.body.assigned_agent = req.user.id;
    const result = await lead_model_1.default.create(req.body);
    if (!result)
        throw new common_1.CustomError("Failed to create Lead", 500);
    res.send({
        success: true,
        result,
    });
};
exports.createLead = createLead;
const getLeadById = async (req, res) => {
    const { id } = req.params;
    const result = await lead_model_1.default.findById(id);
    if (!result)
        throw new common_1.CustomError("Lead not found", 404);
    res.status(200).send({
        success: true,
        result,
    });
};
exports.getLeadById = getLeadById;
const updateLead = async (req, res) => {
    const { id } = req.params;
    const result = await lead_model_1.default.findByIdAndUpdate(id, req.body, { new: true });
    if (!result)
        throw new common_1.CustomError("Lead not found", 404);
    res.status(201).send({
        success: true,
        result
    });
};
exports.updateLead = updateLead;
const deleteLead = async (req, res) => {
    const { id } = req.params;
    const data = await lead_model_1.default.deleteOne({ _id: id });
    if (!data.deletedCount)
        throw new common_1.CustomError("Lead not found or already deleted.", 404, true);
    res.status(data.deletedCount ? 204 : 404).send({
        success: data.deletedCount,
        data
    });
};
exports.deleteLead = deleteLead;
const multiDeleteLeads = async (req, res) => {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
        throw new common_1.CustomError("Invalid or empty 'ids' array", 400, true);
    }
    const leads = await lead_model_1.default.find({ _id: { $in: ids } });
    if (leads.length === 0) {
        throw new common_1.CustomError("No leads found for the provided IDs", 404, true);
    }
    const result = await lead_model_1.default.deleteMany({ _id: { $in: ids } });
    if (!result)
        throw new common_1.CustomError("Failed to delete leads", 500, true);
    if (result.deletedCount > 0) {
        res.sendStatus(204);
    }
    else {
        throw new common_1.CustomError("No leads were deleted", 404, true);
    }
};
exports.multiDeleteLeads = multiDeleteLeads;
//# sourceMappingURL=lead.controller.js.map