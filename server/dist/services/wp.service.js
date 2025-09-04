"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTemplateMessage = sendTemplateMessage;
exports.sendTextMessage = sendTextMessage;
exports.sendListMessage = sendListMessage;
exports.sendIntroButtons = sendIntroButtons;
exports.sendReplyButton = sendReplyButton;
exports.sendReplyMessage = sendReplyMessage;
exports.sendImgMessage = sendImgMessage;
const axios_1 = __importDefault(require("axios"));
const env_1 = __importDefault(require("../configs/env"));
const BASE_URL = 'https://graph.facebook.com/v23.0/706039062602459/messages';
async function sendTemplateMessage(to, templateName, languageCode = 'en_US') {
    return axios_1.default.post(BASE_URL, {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
            name: templateName,
            language: { code: languageCode }
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env_1.default.WP_ACCESS_TOKEN}`
        }
    });
}
async function sendTextMessage(to, body) {
    return axios_1.default.post(BASE_URL, {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env_1.default.WP_ACCESS_TOKEN}`
        }
    });
}
async function sendListMessage(to) {
    return axios_1.default.post(BASE_URL, {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: {
            type: "list",
            header: {
                type: "text",
                text: "message Header"
            },
            footer: {
                text: " footer text"
            },
            body: {
                text: 'this is interective body text'
            },
            action: {
                button: "Tap for options", // less than 20 characters
                sections: [
                    {
                        title: "Section 1",
                        rows: [
                            { id: "item1", title: "Item 1", description: "Description 1" },
                            { id: "item2", title: "Item 2", description: "Description 2" },
                            { id: "item3", title: "Item 3", description: "Description 3" }
                        ]
                    },
                    {
                        title: "Section 2",
                        rows: [
                            { id: "item4", title: "Item 4", description: "Description 4" },
                            { id: "item5", title: "Item 5", description: "Description 5" }
                        ]
                    }
                ]
            }
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env_1.default.WP_ACCESS_TOKEN}`
        }
    });
}
async function sendIntroButtons(to) {
    return axios_1.default.post(BASE_URL, {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: {
            type: "button",
            header: {
                type: "text",
                text: "Welcome Client-Link"
            },
            body: {
                text: "Are you already our customer or want to find out about our products?"
            },
            action: {
                buttons: [
                    { type: "reply", reply: { id: "already_customer", title: "Already a Customer" } },
                    { type: "reply", reply: { id: "interested_products", title: "Interested in Products" } }
                ]
            }
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env_1.default.WP_ACCESS_TOKEN}`
        }
    });
}
async function sendReplyButton(to, buttons, text) {
    return axios_1.default.post(BASE_URL, {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: {
            type: "button",
            header: {
                type: "text",
                text: "Client-Link"
            },
            body: { text },
            action: { buttons }
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env_1.default.WP_ACCESS_TOKEN}`
        }
    });
}
async function sendReplyMessage(to, body, message_id) {
    return axios_1.default.post(BASE_URL, {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
        context: { message_id }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env_1.default.WP_ACCESS_TOKEN}`
        }
    });
}
async function sendImgMessage(to, imageUrl, caption) {
    return axios_1.default.post(BASE_URL, {
        messaging_product: "whatsapp",
        to,
        type: "image",
        image: {
            link: imageUrl,
            caption
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env_1.default.WP_ACCESS_TOKEN}`
        }
    });
}
//# sourceMappingURL=wp.service.js.map