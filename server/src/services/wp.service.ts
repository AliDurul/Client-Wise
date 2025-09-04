import axios from 'axios';
import env from '../configs/env';

const BASE_URL = 'https://graph.facebook.com/v22.0/706039062602459/messages';

export async function sendTemplateMessage(to: string, templateName: string, languageCode: string = 'en_US') {
    return axios.post(BASE_URL, {
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
            'Authorization': `Bearer ${env.WP_ACCESS_TOKEN}`
        }
    });
}

export async function sendTextMessage(to: string, body: string) {
    return axios.post(BASE_URL, {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.WP_ACCESS_TOKEN}`
        }
    });
}

export async function sendListMessage(to: string) {
    return axios.post(BASE_URL, {
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
            'Authorization': `Bearer ${env.WP_ACCESS_TOKEN}`
        }
    });
}

export async function sendIntroButtons(to: string) {
    return axios.post(BASE_URL, {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: {
            type: "button",
            header: {
                type: "text",
                text: "Welcome to Client-Link!"
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
            'Authorization': `Bearer ${env.WP_ACCESS_TOKEN}`
        }
    });
}

export async function sendReplyButton(to: string, buttons: { id: string, title: string }[], text: string) {
    return axios.post(BASE_URL, {
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
            'Authorization': `Bearer ${env.WP_ACCESS_TOKEN}`
        }
    });
}

export async function sendReplyMessage(to: string, body: string, message_id: string) {
    return axios.post(BASE_URL, {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
        context: { message_id }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.WP_ACCESS_TOKEN}`
        }
    });
}

export async function sendImgMessage(to: string, imageUrl: string, caption: string) {
    return axios.post(BASE_URL, {
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
            'Authorization': `Bearer ${env.WP_ACCESS_TOKEN}`
        }
    });
}