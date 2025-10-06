import { createAppSlice } from "@/lib/createAppSlice";
import { ApiResponse, Email, Pagination } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { sharedInitialState } from "../shared/sliceUtils";


export interface EmailSliceState {
    emails: Email[];
    email: Email | null;
    selectedEmailTab: string;
    isShowMailMenu: boolean;
    isEdit: boolean;
    emailsIds: string[];
}

const initialState: EmailSliceState = {
    emails: [],
    email: null,
    selectedEmailTab: 'inbox',
    isShowMailMenu: false,
    isEdit: false,
    emailsIds: [],
};

export const emailSlice = createAppSlice({
    name: 'email',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({
        // Entity management
        setEmail: reducer((state, action: PayloadAction<Email | null>) => {
            state.email = action.payload;
        }),

        setEmails: reducer((state, action: PayloadAction<Email[]>) => {
            state.emails = action.payload;
        }),

        setEmailIds: reducer((state, action: PayloadAction<string[]>) => {
            state.emailsIds = action.payload;
        }),

        // UI state management
        setSelectedTab: reducer((state, action: PayloadAction<string>) => {
            state.selectedEmailTab = action.payload;
        }),

        setEdit: reducer((state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        }),

        setShowMailMenu: reducer((state, action: PayloadAction<boolean>) => {
            state.isShowMailMenu = action.payload;
        }),

    }),
    selectors: {
        selectEmails: (email) => email.emails,
        selectEmail: (email) => email.email,
        selectedEmailTab: (email) => email.selectedEmailTab,
        selectIsShowMailMenu: (email) => email.isShowMailMenu,
        selectIsEdit: (email) => email.isEdit,
        selectEmailIds: (email) => email.emailsIds,
    }
});

export const {
    setEmail,
    setSelectedTab,
    setShowMailMenu,
    setEdit,
    setEmails,
    setEmailIds,
} = emailSlice.actions;

export const {
    selectEmails,
    selectEmail,
    selectedEmailTab,
    selectIsShowMailMenu,
    selectIsEdit,
    selectEmailIds,
} = emailSlice.selectors;