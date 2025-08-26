'use server';

import { revalidateTag } from "next/cache";
import { authConfig } from "../shared/actionUtils";


const BASE_URL = process.env.API_BASE_URL + '/'


export const postMessage = async (_: unknown, payload: FormData) => {

    const chatId = payload.get('chatId') || null;
    payload.delete('chatId');
    console.log('chatId:', chatId);
    const rowData = { ...Object.fromEntries(payload) };

    try {
        const headers = await authConfig();

        const response = await fetch(`${BASE_URL}chats/${chatId}/messages`, {
            method: 'POST',
            headers,
            body: JSON.stringify(rowData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong, Please try again!");
        }

        // revalidateTag('invoices');
        return {
            message: "Message sent successfully!",
            success: true
        };

    } catch (error: any) {
        return {
            message: error.message || "Something went wrong, Please try again!",
            success: false,
            // inputs: result.data
        };
    }

}

export const postGroup = async (_: unknown, payload: any) => {


    try {
        const headers = await authConfig();

        const response = await fetch(`${BASE_URL}chats/group`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong, Please try again!");
        }

        return {
            message: "Group created successfully!",
            success: true
        };

    } catch (error: any) {
        return {
            message: error.message || "Something went wrong, Please try again!",
            success: false,
        };
    }

}

