'use server';

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