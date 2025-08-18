
import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createApiThunk, createAsyncThunkConfig, sharedInitialState } from "../shared/sliceUtils";
import { Escalation, Pagination, Ticket, TicketComments } from "@/types";


export interface TicketSliceState {
    tickets: Pagination<Ticket>;
    ticket: Ticket | null
    status: "idle" | "loading" | "failed";
    error: string | null;
    ticketModal: boolean;
    isEscalation: boolean;
    ticketComments: TicketComments;
    escalation: null | Escalation
}


const initialState: TicketSliceState = {
    tickets: sharedInitialState,
    status: "idle",
    error: null,
    ticketModal: false,
    isEscalation: false,
    escalation: null,
    ticketComments: { _id: "", title: "", comments: [] },
    ticket: null,
};

export const ticketSlice = createAppSlice({
    name: 'ticket',
    initialState,
    reducers: (create) => ({
        // Collection management
        updateTickets: create.reducer((state, action: PayloadAction<Ticket[]>) => {
            state.status = 'idle';
            state.tickets.result = action.payload;
        }),

        // Entity management
        setTicket: create.reducer((state, action: PayloadAction<Ticket | null>) => {
            state.status = 'idle';
            state.ticket = action.payload;
        }),

        // Comments management
        updateTicketComments: create.reducer((state, action: PayloadAction<TicketComments>) => {
            state.status = 'idle';
            state.ticketComments = action.payload;
        }),

        // Modal management
        setTicketModal: create.reducer((state, action: PayloadAction<{open: boolean, record: Ticket | null}>) => {
            state.status = 'idle';
            state.ticketModal = action.payload.open;
            state.ticket = action.payload.record;
        }),
    }),
    selectors: {
        selectTickets: (ticket) => ticket.tickets,
        selectTicket: (ticket) => ticket.ticket,
        selectTicketState: (ticket) => ticket,
        selectTicketModal: (ticket) => ticket.ticketModal,
        selectIsEscalation: (ticket) => ticket.isEscalation,
        selectTicketComments: (ticket) => ticket.ticketComments,
        selectTicketStatus: (ticket) => ticket.status,
        selectTicketError: (ticket) => ticket.error,
    }
});

export const {
    updateTickets,
    setTicket,
    setTicketModal,
    updateTicketComments
} = ticketSlice.actions;

export const {
    selectTickets,
    selectTicket,
    selectTicketState,
    selectTicketModal,
    selectIsEscalation,
    selectTicketComments,
    selectTicketStatus,
    selectTicketError
} = ticketSlice.selectors;
