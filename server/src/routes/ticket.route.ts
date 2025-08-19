import { Router } from "express";
import { createTicCat, createTicCom, createTicket, deleteTicCat, deleteTicket, getTicCatById, getTicCats, getTicComs, getTicketById, getTickets, updateTicCat, updateTicket } from "../controllers/ticket.controller";

const router = Router();

// Ticket Categories
router.route('/categories').get(getTicCats).post(createTicCat);
router.route('/categories/:id').get(getTicCatById).put(updateTicCat).delete(deleteTicCat);

// Ticket Comment
router.route('/comments').post(createTicCom);
router.route('/comments/:ticketId').get(getTicComs);
    
// Ticket
router.route('/').get(getTickets).post(createTicket)
router.route('/:id').get(getTicketById).put(updateTicket).delete(deleteTicket);



export default router;