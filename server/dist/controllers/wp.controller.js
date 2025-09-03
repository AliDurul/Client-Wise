"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendImgMessage = exports.sendTextMessage = exports.sendTemplateMessage = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = __importDefault(require("../configs/env"));
const sendTemplateMessage = async (req, res) => {
    // Send the message to the WordPress API
    const response = await axios_1.default.post('https://graph.facebook.com/v22.0/706039062602459/messages', {
        messaging_product: "whatsapp",
        to: "260970732144",
        type: "template",
        template: {
            name: 'hello_world',
            language: {
                code: 'en_US'
            }
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env_1.default.WP_ACCESS_TOKEN}`
        }
    });
    res.status(200).send({
        error: false,
        result: response.data
    });
};
exports.sendTemplateMessage = sendTemplateMessage;
const sendTextMessage = async (req, res) => {
    // Send the message to the WordPress API
    const response = await axios_1.default.post('https://graph.facebook.com/v22.0/706039062602459/messages', {
        messaging_product: "whatsapp",
        to: "260970732144",
        type: "text",
        text: {
            body: "Hello, this is a text message"
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env_1.default.WP_ACCESS_TOKEN}`
        }
    });
    res.status(200).send({
        error: false,
        result: response.data
    });
};
exports.sendTextMessage = sendTextMessage;
const sendImgMessage = async (req, res) => {
    // Send the message to the WordPress API
    const response = await axios_1.default.post('https://graph.facebook.com/v22.0/706039062602459/messages', {
        messaging_product: "whatsapp",
        to: "260970732144",
        type: "image",
        image: {
            link: "https://dummyimage.com/600x400/000/fff.png&text=lee",
            caption: "This is an image message"
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env_1.default.WP_ACCESS_TOKEN}`
        }
    });
    console.log('sent');
    res.status(200).send({
        error: false,
        result: response.data
    });
};
exports.sendImgMessage = sendImgMessage;
//# sourceMappingURL=wp.controller.js.map