"use server";
import { revalidateTag } from "next/cache";
import { authConfig } from "../shared/actionUtils";
import { z } from "zod";

const BASE_URL = process.env.API_BASE_URL + '/';

// Zod validation schema for lead
const leadSchema = z.object({
  company_name: z.string().min(2, "Company name must be at least 2 characters").optional(),
  person_name: z.string().min(2, "Person name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  mobile_number: z.string().min(10, "Mobile number must be at least 10 characters").optional(),
  lead_source: z.string().optional(),
  product: z.string().optional(),
  pipeline_stage: z.enum([
    "Qualification",
    "Proposal|Quotation",
    "Negotiation",
    "Pending Approval",
    "Closed-Won",
    "Closed-Lost",
  ]).optional(),
  deal_value: z.number().nonnegative("Deal value must be non-negative").optional(),
  expected_revenue: z.number().nonnegative("Expected revenue must be non-negative").optional(),
  follow_up_date: z.string().optional(),
  close_date: z.string().optional(),
  province: z.string().optional(),
  town: z.string().optional(),
  address: z.string().optional(),
});

export const leadCrUpAction = async (_: unknown, payload: FormData) => {
  const id = payload.get('_id') as string;
  payload.delete('_id');

  const rowData = {
    company_name: payload.get('company_name') as string || undefined,
    person_name: payload.get('person_name') as string || undefined,
    email: payload.get('email') as string || undefined,
    mobile_number: payload.get('mobile_number') as string || undefined,
    lead_source: payload.get('lead_source') as string || undefined,
    product: payload.get('product') as string || undefined,
    pipeline_stage: payload.get('pipeline_stage') as any || 'Qualification',
    deal_value: payload.get('deal_value') ? Number(payload.get('deal_value')) : 0,
    expected_revenue: payload.get('expected_revenue') ? Number(payload.get('expected_revenue')) : 0,
    follow_up_date: payload.get('follow_up_date') as string || undefined,
    close_date: payload.get('close_date') as string || undefined,
    province: payload.get('province') as string || undefined,
    town: payload.get('town') as string || undefined,
    address: payload.get('address') as string || undefined,
  };

  const result = leadSchema.safeParse(rowData);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, message: 'Fix the errors in the form', inputs: rowData, errors };
  }

  const url = !!id ? `${BASE_URL}leads/${id}/` : `${BASE_URL}leads/`;
  const method = !!id ? "PUT" : "POST";

  try {
    const headers = await authConfig();

    // Build request body
    const body = JSON.stringify({
      company_name: rowData.company_name,
      person_name: rowData.person_name,
      email: rowData.email,
      mobile_number: rowData.mobile_number,
      lead_source: rowData.lead_source,
      product: rowData.product || null,
      pipeline_stage: rowData.pipeline_stage,
      deal_value: rowData.deal_value,
      expected_revenue: rowData.expected_revenue,
      follow_up_date: rowData.follow_up_date || null,
      close_date: rowData.close_date || null,
      location: {
        province: rowData.province,
        town: rowData.town,
        address: rowData.address,
      },
    });

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong, Please try again!");
    }

    revalidateTag("leads");

    return {
      success: true,
      message: id ? "Lead updated successfully!" : "Lead created successfully!",
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to save lead. Please try again.",
      inputs: rowData,
    };
  }
};
