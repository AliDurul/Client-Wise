'use server';

import { sendEmailSchema } from "@/lib/utility/zod";
import { authConfig } from "../shared/actionUtils";

const BASE_URL = process.env.API_BASE_URL + '/'

interface modifyEmailProps {
    read?: boolean
    starred?: boolean
    important?: boolean
    id: string
}

export const modifyEmail = async (url: string, { arg }: { arg: modifyEmailProps }) => {

    try {
        const headers = await authConfig();

        const response = await fetch(`${BASE_URL}${url}/${arg.id}`, {
            method: 'PUT',
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

export const sendEmail = async (_: unknown, payload: FormData) => {


    const rowData = { ...Object.fromEntries(payload) };

    const result = sendEmailSchema.safeParse(rowData);

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        return { success: false, message: 'Fix the error in the below fields', inputs: rowData, errors };
    }


    try {
        const headers = await authConfig();

        const response = await fetch(`${BASE_URL}emails`, {
            method: 'POST',
            headers,
            body: JSON.stringify(result.data),
        });

        const data = await response.json();

        if (!response.ok && !data.success) {
            throw new Error(data.message || "Something went wrong, Please try again!");
        }

        return {
            message: "Email sent successfully!",
            success: true
        };
    } catch (error: any) {
        return {
            message: error.message || "Something went wrong, Please try again!",
            success: false,
            inputs: result.data
        };
    }

}