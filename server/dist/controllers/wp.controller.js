"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imgMessage = exports.textMessage = exports.templateMessage = void 0;
const wp_service_1 = require("../services/wp.service");
const templateMessage = async (req, res) => {
    const response = await (0, wp_service_1.sendTemplateMessage)("260970732144", "hello_world", "en_US");
    res.status(200).send({
        error: false,
        result: response.data
    });
};
exports.templateMessage = templateMessage;
const textMessage = async (req, res) => {
    const { body } = req.body;
    const { to } = req.params;
    const response = await (0, wp_service_1.sendTextMessage)(to, body);
    res.status(200).send({
        error: false,
        result: response.data
    });
};
exports.textMessage = textMessage;
const imgMessage = async (req, res) => {
    const response = await (0, wp_service_1.sendImgMessage)("260970732144", "https://www.w3schools.com/w3css/img_lights.jpg", "Sample Image");
    res.status(200).send({
        error: false,
        result: response.data
    });
};
exports.imgMessage = imgMessage;
//# sourceMappingURL=wp.controller.js.map