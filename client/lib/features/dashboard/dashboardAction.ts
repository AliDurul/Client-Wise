"use server"

import { authConfig } from "../shared/actionUtils";

const BASE_URL = process.env.API_BASE_URL + '/';

export const getDashboardStats = async () => {

   await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay


    try {
        const response = await fetch(BASE_URL + 'dashboard/', {
            next: { tags: ['dashboard-overview'] }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong, Please try again!");
        }

        return data;
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong, Please try again!" };
    }
};