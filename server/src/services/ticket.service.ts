import Ticket, { ITicket } from "../models/ticket.model";

export const createTicketService = async (data: Partial<ITicket>): Promise<ITicket> => {
    return await Ticket.create(data);

}