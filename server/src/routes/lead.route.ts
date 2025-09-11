import { Router } from "express";
import { createLead, deleteLead, getLeadById, getLeads, multiDeleteLeads, updateLead, createLeads } from "../controllers/lead.controller";

const router = Router();

router.route('/').get(getLeads).post(createLead).delete(multiDeleteLeads);
router.post('/multi', createLeads);

router.route('/:id').get(getLeadById).put(updateLead).delete(deleteLead);

export default router;