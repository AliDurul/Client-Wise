import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { sharedInitialState } from "../shared/sliceUtils";
import { Email, Pagination } from "@/types";


export interface EmailSliceState {
    filteredEmails: Pagination<Email>;
    email: Email | null;
    isShowMailMenu: boolean;
    isEdit: boolean;
    emailsIds: string[];
    assignModal: boolean;
}

const initialState: EmailSliceState = {
    filteredEmails: {
        success: false,
        details: { limit: 20, page: 1, totalRecords: 0, pages: null },
        result: []
    },
    email: null,
    isShowMailMenu: false,
    isEdit: false,
    emailsIds: [],
    assignModal: false,
};

export const emailSlice = createAppSlice({
    name: 'email',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({
        // Entity management
        setEmail: reducer((state, action: PayloadAction<Email | null>) => {
            state.email = action.payload;
        }),

        setFilteredEmails: reducer((state, action: PayloadAction<Pagination<Email>>) => {
            state.filteredEmails = action.payload;
        }),

        setEmailIds: reducer((state, action: PayloadAction<string[]>) => {
            state.emailsIds = action.payload;
        }),

        // UI state management

        setAssignModal: reducer((state, action: PayloadAction<{ open: boolean, email: Email | null }>) => {
            state.assignModal = action.payload.open;
            state.email = action.payload.email;
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
        selectAssignModal: (email) => email.assignModal,
    }
});

export const {
    setEmail,
    setShowMailMenu,
    setEdit,
    setFilteredEmails,
    setEmailIds,
    setAssignModal,
} = emailSlice.actions;

export const {
    selectFilteredEmails,
    selectEmail,
    selectIsShowMailMenu,
    selectIsEdit,
    selectEmailIds,
    selectAssignModal,
} = emailSlice.selectors;