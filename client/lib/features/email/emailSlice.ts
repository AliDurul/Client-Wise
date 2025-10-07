import { createAppSlice } from "@/lib/createAppSlice";
import { ApiResponse, Email, Pagination } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { sharedInitialState } from "../shared/sliceUtils";


export interface EmailSliceState {
    filteredEmails: Email[];
    email: Email | null;
    isShowMailMenu: boolean;
    isEdit: boolean;
    emailsIds: string[];
}

const initialState: EmailSliceState = {
    filteredEmails: [],
    email: null,
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

        setFilteredEmails: reducer((state, action: PayloadAction<Email[]>) => {
            state.filteredEmails = action.payload;
        }),

        setEmailIds: reducer((state, action: PayloadAction<string[]>) => {
            state.emailsIds = action.payload;
        }),



        setEdit: reducer((state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        }),

        setShowMailMenu: reducer((state, action: PayloadAction<boolean>) => {
            state.isShowMailMenu = action.payload;
        }),

    }),
    selectors: {
        selectFilteredEmails: (email) => email.filteredEmails,
        selectEmail: (email) => email.email,
        selectIsShowMailMenu: (email) => email.isShowMailMenu,
        selectIsEdit: (email) => email.isEdit,
        selectEmailIds: (email) => email.emailsIds,
    }
});

export const {
    setEmail,
    setShowMailMenu,
    setEdit,
    setFilteredEmails,
    setEmailIds,
} = emailSlice.actions;

export const {
    selectFilteredEmails,
    selectEmail,
    selectIsShowMailMenu,
    selectIsEdit,
    selectEmailIds,
} = emailSlice.selectors;