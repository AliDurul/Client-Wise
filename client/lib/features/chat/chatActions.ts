'use server';

import { revalidateTag } from "next/cache";
import { authConfig } from "../shared/actionUtils";


const BASE_URL = process.env.API_BASE_URL + '/'


interface postMessageProps {
    chatId: string | null;
    content: string;
    receiverId: string | null;
}

export const postMessage = async (url: string, { arg }: { arg: postMessageProps }) => {

    try {
        const headers = await authConfig();

        const response = await fetch(`${BASE_URL}${url}/messages`, {
            method: 'POST',
            headers,
            body: JSON.stringify(arg),
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

export const groupCrUpAction = async (_: unknown, payload: FormData) => {


    const id = payload.get("_id");
    if (id) payload.delete("_id");


    
    const url = !!id ? `${BASE_URL}chats/group/${id}/` : `${BASE_URL}chats/group`;
    const method = !!id ? "PUT" : "POST";

    try {
        const headers = await authConfig(true);

        const response = await fetch(url, {
            method,
            headers,
            body: payload,
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "Something went wrong, Please try again!");
        }

        return {
            message: !!id ? "Group updated successfully!" : "Group created successfully!",
            success: true
        };

    } catch (error: any) {
        return {
            message: error.message || "Something went wrong, Please try again!",
            success: false,
        };
    }

}

