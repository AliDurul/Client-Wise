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
    activeUsers: any[];
}

const initialState: CustomerSliceState = {
    customers: sharedInitialState,
    status: "idle",
    error: null,
    customer: null,
    type: 'list',
    activeUsers: []
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
        setActiveUsers: reducer((state, action: PayloadAction<any[]>) => {
            state.activeUsers = action.payload;
        }),

        // // Async actions
        // fetchAllCustomerAsync: asyncThunk(
        //     async (params: { type?: string, page?: string, pageSize?: string, search?: string }) => {
        //         return createApiThunk(
        //             () => getAllCustomers(params.type, params.page, params.pageSize, params.search),
        //             "Failed to fetch KYC data"
        //         );
        //     },
        //     createAsyncThunkConfig('customers')

        // ),
    }),
    selectors: {
        selectCustomers: (customer) => customer.customers,
        selectCustomer: (customer) => customer.customer,
        selectType: (customer) => customer.type,
        selectCustomerState: (customer) => customer,
        selectCustomerStatus: (customer) => customer.status,
        selectCustomerError: (customer) => customer.error,
        selectActiveUsers: (customer) => customer.activeUsers
    }
});

export const {
    // fetchAllCustomerAsync,
    updateCustomers,
    setCustomer,
    clearCustomer,
    setType,
    setActiveUsers
} = customerSlice.actions;

export const {
    selectType,
    selectCustomers,
    selectCustomerState,
    selectCustomer,
    selectCustomerStatus,
    selectCustomerError,
    selectActiveUsers
} = customerSlice.selectors;