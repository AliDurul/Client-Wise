"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTicketService = void 0;
const ticket_model_1 = __importDefault(require("../models/ticket.model"));
const createTicketService = async (data) => {
    return await ticket_model_1.default.create(data);
};
exports.createTicketService = createTicketService;
//# sourceMappingURL=ticket.service.js.map