import axios from 'axios';
import env from '../configs/env';

export const sendTemplateMessage = async (req, res) => {

    // Send the message to the WordPress API
    const response = await axios.post('https://graph.facebook.com/v22.0/706039062602459/messages',
        {
            messaging_product: "whatsapp",
            to: "260970732144",
            type: "template",
            template: {
                name: 'hello_world',
                language: {
                    code: 'en_US'
                }
            }
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.WP_ACCESS_TOKEN}`
            }
        }
    );


    res.status(200).send({
        error: false,
        result: response.data
    });

};

export const sendTextMessage = async (req, res) => {

    // Send the message to the WordPress API
    const response = await axios.post('https://graph.facebook.com/v22.0/706039062602459/messages',
        {
            messaging_product: "whatsapp",
            to: "260970732144",
            type: "text",
            text: {
                body: "Hello, this is a text message"
            }
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.WP_ACCESS_TOKEN}`
            }
        }
    );

    res.status(200).send({
        error: false,
        result: response.data
    });

};

export const sendImgMessage = async (req, res) => {

    // Send the message to the WordPress API
    const response = await axios.post('https://graph.facebook.com/v22.0/706039062602459/messages',
        {
            messaging_product: "whatsapp",
            to: "260970732144",
            type: "image",
            image: {
                link: "https://dummyimage.com/600x400/000/fff.png&text=lee",
                caption: "This is an image message"
            }
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.WP_ACCESS_TOKEN}`
            }
        }
    );
    console.log('sent');

    res.status(200).send({
        error: false,
        result: response.data
    });

};

