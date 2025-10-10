'use server'

import { ticketCategorySchema, ticketCommentSchema, ticketEscalateSchema, ticketSchema } from "@/lib/utility/zod";
import { authConfig } from "../shared/actionUtils";
import { revalidateTag } from "next/cache";

const BASE_URL = process.env.API_BASE_URL + '/';

export const ticketCrUpAction = async (_: any, payload: FormData) => {

    if (_?.message?.includes('ID already exists.')) {
        return { success: false, message: 'A ticket with this email ID already exists.' };
    }

    const id = payload.get('_id') as string;
    payload.delete('_id');

    const rowData = { ...Object.fromEntries(payload) };

    // console.log('rowData', rowData);

    const result = ticketSchema.safeParse(rowData);


    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        return { success: false, message: 'Fix the error in the form', inputs: rowData, errors };
    }

    const url = !!id ? `${BASE_URL}tickets/${id}/` : `${BASE_URL}tickets/`;
    const method = !!id ? "PUT" : "POST";

    try {
        const headers = await authConfig();

        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(result.data),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong, Please try again!");
        }

        revalidateTag('tickets');
        return {
            message: !!id ? "Ticket updated successfully!" : "Ticket created successfully!",
            success: true
        };

    } catch (error: any) {
        return {
            message: error.message || "Something went wrong, Please try again!",
            success: false,
            inputs: result.data
        };
    }
};

export const ticketCommentCrUpAction = async (_: unknown, payload: FormData) => {

    const commentId = payload.get('commentId') as string;
    payload.delete('commentId');

    const rowData = { ...Object.fromEntries(payload) };

    const result = ticketCommentSchema.safeParse(rowData);


    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        return { success: false, message: 'Fix the error in the form', inputs: rowData, errors };
    }

    const url = !!commentId ? `${BASE_URL}tickets/comments/${commentId}/` : `${BASE_URL}tickets/comments`;
    const method = !!commentId ? "PUT" : "POST";

    try {
        const headers = await authConfig();

        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(result.data),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong, Please try again!");
        }

        const ticketId = payload.get('ticketId') as string;
        revalidateTag(`tickets/${ticketId}`);

        return {
            message: !!commentId ? "Comment updated successfully!" : "Comments created successfully!",
            success: true
        };

    } catch (error: any) {
        return {
            message: error.message || "Something went wrong, Please try again!",
            success: false,
            inputs: result.data
        };
    }
};


export const getTicketStatus = async () => {
    const headers = await authConfig();

    try {
        const response = await fetch(`${BASE_URL}ticket-status/`, {
            headers,
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error(data.detail || "Something went wrong, Please try again!");
        }

    } catch (error: any) {
        return { error: error.message };
    }
}

export const escalateTicket = async (_: unknown, payload: FormData) => {

    const id = payload.get('_id') as string;
    payload.delete('_id');

    const rowData = { ...Object.fromEntries(payload) };

    const result = ticketEscalateSchema.safeParse(rowData);

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        return { success: false, message: 'Fix the error in the form', inputs: rowData, errors };
    }


    try {
        const headers = await authConfig();
        const response = await fetch(`${BASE_URL}tickets/${id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(result.data),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong, Please try again!");
        }

        revalidateTag('tickets');
        return {
            message: "Ticket updated successfully!",
            success: true
        };
    } catch (error: any) {
        return {
            message: error.message,
            success: false,
            inputs: result.data
        };
    }
};

export const ticketCategoryCrUpAction = async (_: unknown, payload: FormData) => {

    const id = payload.get('_id') as string;
    payload.delete('_id');

    const rowData = { ...Object.fromEntries(payload) };

    const result = ticketCategorySchema.safeParse(rowData);


    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        return { success: false, message: 'Fix the error in the form', inputs: rowData, errors };
    }

    const url = !!id ? `${BASE_URL}tickets/categories/${id}/` : `${BASE_URL}tickets/categories`;
    const method = !!id ? "PUT" : "POST";

    try {
        const headers = await authConfig();

        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(result.data),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong, Please try again!");
        }

        revalidateTag('categories');
        return {
            message: !!id ? "Ticket category updated successfully!" : "Ticket category created successfully!",
            success: true
        };

    } catch (error: any) {
        return {
            message: error.message || "Something went wrong, Please try again!",
            success: false,
            inputs: result.data
        };
    }
};