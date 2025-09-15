"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gmail_controller_1 = require("../controllers/gmail.controller");
const router = (0, express_1.Router)();
router.get('/messages', gmail_controller_1.getGmailMessages);
router.get('/labels', gmail_controller_1.getGmailLabels);
exports.default = router;
//# sourceMappingURL=gmail.route.js.map