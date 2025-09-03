"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wp_controller_1 = require("../controllers/wp.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
// -> /api/v1/wp
router.all('/template', wp_controller_1.sendTemplateMessage);
router.all('/text', wp_controller_1.sendTextMessage);
router.all('/image', wp_controller_1.sendImgMessage);
exports.default = router;
//# sourceMappingURL=wp.route.js.map