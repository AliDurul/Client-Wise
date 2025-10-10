import { Request, Response, NextFunction } from 'express';
import Ticket, { ITicket, TicCat } from "../models/ticket.model";

import { CustomError, getImageUrl } from "../utils/common";


export const getTickets = async (req: Request, res: Response): Promise<void> => {


    const result = await res.getModelList(Ticket, {}, [
        { path: 'customer', select: 'full_name first_name last_name email phone_number profile_pic' },
        { path: 'assigned_agent', select: 'full_name first_name last_name email phone_number profile_pic' },
        { path: 'category', select: 'name' },
        { path: 'escalation.raised_by', select: 'full_name first_name last_name email phone_number profile_pic' }
    ], '-comments');

    // let result: ITicket[] = [];

    // if (req.query.select) {
    //     const selectFields = req.query.select ? String(req.query.select).split(',').join(' ') : '';
    //     result = await Ticket.find({})
    //         .select(selectFields)
    //         .limit(100)
    //         .lean();
    // } else {
    //     result = await res.getModelList(Ticket, {}, [
    //         { path: 'customer', select: 'full_name first_name last_name email phone_number profile_pic' },
    //         { path: 'assigned_agent', select: 'full_name first_name last_name email phone_number profile_pic' },
    //         { path: 'category', select: 'name' },
    //         { path: 'escalation.raised_by', select: 'full_name first_name last_name email phone_number profile_pic' }
    //     ], '-comments');
    // }

    await Promise.all(result.map(async (ticket: ITicket) => {
        if (ticket.customer?.profile_pic) {
            ticket.customer.profile_pic = await getImageUrl(ticket.customer.profile_pic);
        }
    }));

    res.send({
        success: true,
        details: await res.getModelListDetails(Ticket),
        result,
    });
};

export const createTicket = async (req: Request, res: Response): Promise<void> => {

    const userId = req.user?.id;

    if (!req.body.assigned_agent) {
        req.body.assigned_agent = userId;
    }

    if (req.body.email_id) {
        const isExistEmail = await Ticket.exists({ email_id: req.body.email_id });
        if (isExistEmail) throw new CustomError("A ticket with this email ID already exists.", 400, true);
    }

    const result = await Ticket.create(req.body);

    if (!result) throw new CustomError("Failed to create ticket", 500, true);

    res.send({
        success: true,
        result,
    });
};

export const getTicketById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await (await Ticket.findById(id)).populate([
        { path: 'customer', select: 'full_name first_name last_name email phone_number profile_pic' },
        { path: 'assigned_agent', select: 'full_name first_name last_name email phone_number profile_pic' },
        { path: 'category', select: 'name' },
        { path: 'escalation.raised_by', select: 'full_name first_name last_name email phone_number profile_pic' },
        { path: 'comments.author', select: 'full_name first_name last_name email phone_number profile_pic' }
    ])

    if (!result) throw new CustomError("Ticket not found", 404);

    if (result.comments && Array.isArray(result.comments)) {
        result.comments = await Promise.all(
            result.comments
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map(async (comment) => {
                    if (comment.author?.profile_pic) {
                        comment.author.profile_pic = await getImageUrl(comment.author.profile_pic);
                    }
                    return comment;
                })
        );
    }

    res.status(200).send({
        success: true,
        result,
    });
};

export const updateTicket = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const { reason } = req.body

    if (reason) {
        req.body.escalation = {
            raised_by: req.user.id,
            reason
        };

        req.body.status = 'escalated';
    }

    const result = await Ticket.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) throw new CustomError("Ticket not found", 404);

    res.status(201).send({
        success: true,
        result
    });

};

export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const data = await Ticket.deleteOne({ _id: id })

    if (!data.deletedCount) throw new CustomError("Ticket not found or already deleted.", 404, true);

    res.status(data.deletedCount ? 204 : 404).send({
        success: data.deletedCount,
        data
    })

};


export const getTicketStats = async (req: Request, res: Response): Promise<void> => {

    // Aggregate ticket stats
    const stats = await Ticket.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);

    const status_counts = {
        Pending: 0,
        Active: 0,
        Resolved: 0,
        Cancelled: 0,
        Escalated: 0
    };

    let total_count = 0;
    stats.forEach(s => {
        switch (s._id) {
            case "pending":
                status_counts.Pending = s.count;
                break;
            case "active":
                status_counts.Active = s.count;
                break;
            case "resolved":
                status_counts.Resolved = s.count;
                break;
            case "cancelled":
                status_counts.Cancelled = s.count;
                break;
            case "escalated":
                status_counts.Escalated = s.count;
                break;
        }
        total_count += s.count;
    });

    res.send({
        success: true,
        result: {
            total_count,
            status_counts
        }
    });
};

// --------------- TICKET COMMENTS ---------------

export const createTicCom = async (req: Request, res: Response): Promise<void> => {

    const author = req.user?.id;
    const { comment, ticketId } = req.body


    const result = await Ticket.findByIdAndUpdate(
        ticketId,
        { $push: { comments: { comment, author } } },
        // { new: true }
    );

    if (!result) throw new CustomError("Failed to create comment", 500, true);

    res.send({
        success: true,
        result,
    });
};

export const getTicComs = async (req: Request, res: Response): Promise<void> => {

    const result = await (await Ticket.findById(req.params.ticketId).select('comments escalation')).populate([
        { path: 'comments.author', select: 'full_name first_name last_name email phone_number profile_pic' },
        { path: 'escalation.raised_by', select: 'full_name first_name last_name email phone_number profile_pic' }
    ])

    if (result.escalation?.raised_by && result.escalation.raised_by.profile_pic) {
        result.escalation.raised_by.profile_pic = await getImageUrl(result.escalation.raised_by.profile_pic);
    }

    if (result.comments && Array.isArray(result.comments)) {
        result.comments = await Promise.all(
            result.comments
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map(async (comment) => {
                    if (comment.author?.profile_pic) {
                        comment.author.profile_pic = await getImageUrl(comment.author.profile_pic);
                    }
                    return comment;
                })
        );
    }

    res.send({
        success: true,
        result,
    });
};



// --------------- TICKET CATEGORIES ---------------
export const getTicCats = async (req: Request, res: Response): Promise<void> => {

    const result = await res.getModelList(TicCat)

    res.send({
        success: true,
        details: await res.getModelListDetails(TicCat),
        result,
    });
};

export const createTicCat = async (req: Request, res: Response): Promise<void> => {


    const userId = req.user?.id;

    req.body.assigned_agent = userId;

    const result = await TicCat.create(req.body);

    if (!result) throw new CustomError("Failed to create FAQ", 500);

    res.send({
        success: true,
        result,
    });
};

export const getTicCatById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await TicCat.findById(id);

    if (!result) throw new CustomError("TicCat not found", 404);

    res.status(200).send({
        success: true,
        result,
    });
};

export const updateTicCat = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await TicCat.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) throw new CustomError("TicCat not found", 404);

    res.status(201).send({
        success: true,
        result
    });

};

export const deleteTicCat = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const data = await TicCat.deleteOne({ _id: id })

    if (!data.deletedCount) throw new CustomError("TicCat not found or already deleted.", 404, true);

    res.status(data.deletedCount ? 204 : 404).send({
        success: data.deletedCount,
        data
    })

};