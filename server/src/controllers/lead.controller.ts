import { Request, Response, NextFunction } from 'express';
import Lead from '../models/lead.model';
import { CustomError } from '../utils/common';
import { buildDemoData } from '../utils/demoData';
import Product from '../models/product.model';




export const getLeads = async (req: Request, res: Response): Promise<void> => {

    const result = await res.getModelList(Lead);

    res.send({
        success: true,
        details: await res.getModelListDetails(Lead),
        result,
    });
};

export const createLead = async (req: Request, res: Response): Promise<void> => {

    req.body.assigned_agent = req.user.id;

    const result = await Lead.create(req.body);

    if (!result) throw new CustomError("Failed to create Lead", 500);

    res.send({
        success: true,
        result,
    });
};

export const getLeadById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await Lead.findById(id);

    if (!result) throw new CustomError("Lead not found", 404);

    res.status(200).send({
        success: true,
        result,
    });
};

export const updateLead = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const result = await Lead.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) throw new CustomError("Lead not found", 404);

    res.status(201).send({
        success: true,
        result
    });

};

export const deleteLead = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const data = await Lead.deleteOne({ _id: id })

    if (!data.deletedCount) throw new CustomError("Lead not found or already deleted.", 404, true);

    res.status(data.deletedCount ? 204 : 404).send({
        success: data.deletedCount,
        data
    })

};

export const multiDeleteLeads = async (req: Request, res: Response): Promise<void> => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        throw new CustomError("Invalid or empty 'ids' array", 400, true);
    }

    const leads = await Lead.find({ _id: { $in: ids } });

    if (leads.length === 0) {
        throw new CustomError("No leads found for the provided IDs", 404, true);
    }

    const result = await Lead.deleteMany({ _id: { $in: ids } });

    if (!result) throw new CustomError("Failed to delete leads", 500, true);

    if (result.deletedCount > 0) {
        res.sendStatus(204);
    } else {
        throw new CustomError("No leads were deleted", 404, true);
    }
};

export const createLeads = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const product = await Product.findOne().lean();

    const leadsToInsert = buildDemoData().leads.map(({ _id, ...lead }) => ({
        ...lead,
        assigned_agent: req.user.id,
        product: product ? product._id : null
    }));

    const result = await Lead.insertMany(leadsToInsert);

    res.status(201).send({
        success: true,
        insertedCount: result.length,
        result,
    });

};