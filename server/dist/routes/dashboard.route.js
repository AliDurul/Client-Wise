"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", dashboard_controller_1.getDashboardStats);
router.get("/overview", dashboard_controller_1.getDashboardStats);
exports.default = router;
//# sourceMappingURL=dashboard.route.js.map