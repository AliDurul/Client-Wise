"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lead_controller_1 = require("controllers/lead.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/').get(lead_controller_1.getLeads).post(lead_controller_1.createLead).delete(lead_controller_1.multiDeleteLeads);
router.route('/:id').get(lead_controller_1.getLeadById).put(lead_controller_1.updateLead).delete(lead_controller_1.deleteLead);
exports.default = router;
//# sourceMappingURL=lead.route.js.map