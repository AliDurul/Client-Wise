import axios from 'axios';
import env from '../configs/env';
import { Request, Response } from 'express';
import { sendImgMessage, sendTemplateMessage, sendTextMessage } from '../services/wp.service';

export const templateMessage = async (req: Request, res: Response) => {

    const response = await sendTemplateMessage("260970732144", "hello_world", "en_US");

    res.status(200).send({
        error: false,
        result: response.data
    });

};

export const textMessage = async (req: Request, res: Response) => {

    const { body } = req.body;
    const { to } = req.params;

    const response = await sendTextMessage(to, body);

    res.status(200).send({
        error: false,
        result: response.data
    });

};

export const imgMessage = async (req: Request, res: Response) => {

    const response = await sendImgMessage("260970732144", "https://www.w3schools.com/w3css/img_lights.jpg", "Sample Image");

    res.status(200).send({
        error: false,
        result: response.data
    });

};

