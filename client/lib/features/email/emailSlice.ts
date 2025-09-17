import { createAppSlice } from "@/lib/createAppSlice";
import { ApiResponse, Email, Pagination } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import {  sharedInitialState } from "../shared/sliceUtils";


export interface EmailSliceState {
    emails: Pagination<Email>;
    email: Email | null;
    status: "idle" | "loading" | "failed";
    error: string | null;
    selectedEmailTab: string;
}

const initialState: EmailSliceState = {
    emails: sharedInitialState,
    status: "idle",
    error: null,
    email: null,
    selectedEmailTab: 'inbox',
};

export const emailSlice = createAppSlice({
    name: 'email',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({
        // Entity management
        setEmail: reducer((state, action: PayloadAction<Email | null>) => {
            state.status = 'idle';
            state.email = action.payload;
        }),

        // UI state management
        setSelectedTab: reducer((state, action: PayloadAction<string>) => {
            state.selectedEmailTab = action.payload;
        }),

    }),
    selectors: {
        selectEmails: (email) => email.emails,
        selectEmail: (email) => email.email,
        selectedEmailTab: (email) => email.selectedEmailTab,
    }
});

export const {
    setEmail,
    setSelectedTab,
} = emailSlice.actions;

export const {
    selectEmails,
    selectEmail,
    selectedEmailTab,
} = emailSlice.selectors;