"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_controller_1 = require("../controllers/email.controller");
const router = (0, express_1.Router)();
// URL: /emails
router.route('/')
    .get(email_controller_1.getEmails)
    .post(email_controller_1.sendEmail);
router.get('/stats', email_controller_1.getEmailStats);
router.route('/:id')
    .put(email_controller_1.modifyEmail)
    .get(email_controller_1.getEmailById);
exports.default = router;
//# sourceMappingURL=email.route.js.map