import { Router } from "express";
import { createLead, deleteLead, getLeadById, getLeads, multiDeleteLeads, updateLead } from "../controllers/lead.controller";

const router = Router();

router.route('/').get(getLeads).post(createLead).delete(multiDeleteLeads);

router.route('/:id').get(getLeadById).put(updateLead).delete(deleteLead);

export default router;