'use server';

import { revalidateTag } from "next/cache";
import { authConfig } from "../shared/actionUtils";


const BASE_URL = process.env.API_BASE_URL + '/'


export const postMessage = async (url: string, { arg }: { arg: { chatId: string | undefined, content: string } }) => {

    // const chatId = arg.chatId || null;
    const content = arg.content || null;

    try {
        const headers = await authConfig();

        const response = await fetch(`${BASE_URL}${url}/messages`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ content }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong, Please try again!");
        }

        return data

    } catch (error: any) {
        throw error
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

