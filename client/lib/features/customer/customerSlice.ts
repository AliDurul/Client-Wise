import { createAppSlice } from "@/lib/createAppSlice";
import { ApiResponse, Customer, Pagination } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createApiThunk, createAsyncThunkConfig, sharedInitialState } from "../shared/sliceUtils";


export interface CustomerSliceState {
    customers: Pagination<Customer>;
    customer: Customer | null;
    status: "idle" | "loading" | "failed";
    error: string | null;
    type: 'list' | 'grid';
}

const initialState: CustomerSliceState = {
    customers: sharedInitialState,
    status: "idle",
    error: null,
    customer: null,
    type: 'list',
};

export const customerSlice = createAppSlice({
    name: 'customer',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({
        // Entity management
        setCustomer: reducer((state, action: PayloadAction<Customer | null>) => {
            state.status = 'idle';
            state.customer = action.payload;
        }),
        clearCustomer: reducer((state) => {
            state.customer = null;
        }),

        // Collection management
        updateCustomers: reducer((state, action: PayloadAction<Customer[]>) => {
            state.status = 'idle';
            state.customers.result = action.payload;
        }),

        // UI state management
        setType: reducer((state, action: PayloadAction<'list' | 'grid'>) => {
            state.status = 'idle';
            state.type = action.payload;
        }),

    }),
    selectors: {
        selectCustomers: (customer) => customer.customers,
        selectCustomer: (customer) => customer.customer,
        selectType: (customer) => customer.type,
        selectCustomerState: (customer) => customer,
        selectCustomerStatus: (customer) => customer.status,
        selectCustomerError: (customer) => customer.error,
    }
});

export const {
    // fetchAllCustomerAsync,
    updateCustomers,
    setCustomer,
    clearCustomer,
    setType,
} = customerSlice.actions;

export const {
    selectType,
    selectCustomers,
    selectCustomerState,
    selectCustomer,
    selectCustomerStatus,
    selectCustomerError,
} = customerSlice.selectors;