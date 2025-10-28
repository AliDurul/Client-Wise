"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webhook_controller_1 = require("../controllers/webhook.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
//-> /api/webhook
router.get('/', webhook_controller_1.handleGetRequest);
router.post('/', webhook_controller_1.handlePostRequest);
exports.default = router;
//# sourceMappingURL=wp.webhook.route.js.map