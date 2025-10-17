'use client';
import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Select from 'react-select';
import InputBox from '@/components/shared/InputBox';
import { Lead } from '@/types';
import { FiDollarSign, FiUsers, FiMapPin, FiCalendar } from 'react-icons/fi';
import { leadCrUpAction } from '@/lib/features/leads/leadActions';

interface LeadFormProps {
    lead: Lead | null;
    isEdit: boolean;
    readOnly: boolean;
    error: string | null;
}

const pipelineStageOptions = [
    { value: 'Qualification', label: 'Qualification' },
    { value: 'Proposal|Quotation', label: 'Proposal/Quotation' },
    { value: 'Negotiation', label: 'Negotiation' },
    { value: 'Pending Approval', label: 'Pending Approval' },
    { value: 'Closed-Won', label: 'Closed-Won' },
    { value: 'Closed-Lost', label: 'Closed-Lost' },
];

const leadSourceOptions = [
    { value: 'Website', label: 'Website' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Cold Call', label: 'Cold Call' },
    { value: 'Social Media', label: 'Social Media' },
    { value: 'Email Campaign', label: 'Email Campaign' },
    { value: 'Event', label: 'Event' },
    { value: 'Partner', label: 'Partner' },
    { value: 'Other', label: 'Other' },
];

export default function LeadForm({ lead, isEdit, readOnly, error }: LeadFormProps) {
    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    const router = useRouter();

    // form action
    const [state, action, isPending] = useActionState(leadCrUpAction, null);

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: readOnly ? 'white' : provided.backgroundColor,
        }),
    };

    const [initialValues, setInitialValues] = useState<any>(() => {
        return lead
            ? {
                _id: lead._id || '',
                company_name: lead.company_name || '',
                person_name: lead.person_name || '',
                email: lead.email || '',
                mobile_number: lead.mobile_number || '',
                lead_source: lead.lead_source || '',
                product: lead.product || '',
                pipeline_stage: lead.pipeline_stage || 'Qualification',
                deal_value: lead.deal_value || 0,
                expected_revenue: lead.expected_revenue || 0,
                follow_up_date: lead.follow_up_date ? new Date(lead.follow_up_date).toISOString().split('T')[0] : '',
                close_date: lead.close_date ? new Date(lead.close_date).toISOString().split('T')[0] : '',
                location: {
                    province: lead.location?.province || '',
                    town: lead.location?.town || '',
                    address: lead.location?.address || '',
                },
                converted_to_invoice: lead.converted_to_invoice || false,
            }
            : {
                company_name: '',
                person_name: '',
                email: '',
                mobile_number: '',
                lead_source: '',
                product: '',
                pipeline_stage: 'Qualification',
                deal_value: 0,
                expected_revenue: 0,
                follow_up_date: '',
                close_date: '',
                location: {
                    province: '',
                    town: '',
                    address: '',
                },
                converted_to_invoice: false,
            };
    });

    useEffect(() => {
        if (!state?.message) return;

        setInitialValues((prev: any) => ({
            ...prev,
            ...(state?.inputs as Partial<Lead> ?? {}),
        }));

        toast[state.success ? 'success' : 'error'](state.message || 'Operation completed successfully');

        if (state.success) {
            const timer = setTimeout(() => router.replace('/leads'), 2000);
            return () => clearTimeout(timer);
        }
    }, [state, router]);

    return (
        <form action={action} className="my-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <input type="text" hidden name="_id" value={initialValues._id} readOnly />

            {/* Left Panel - Company & Contact Info */}
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="text-lg font-semibold dark:text-white-light flex items-center gap-2">
                        <FiUsers className="text-primary" />
                        Company & Contact
                    </h5>
                </div>

                <div className="space-y-4">
                    <div>
                        <InputBox
                            name="company_name"
                            id="company_name"
                            type="text"
                            placeholder="Enter Company Name"
                            disabled={readOnly}
                            label="Company Name"
                            value={initialValues.company_name}
                            errors={state?.errors?.company_name}
                        />
                    </div>

                    <div>
                        <InputBox
                            name="person_name"
                            id="person_name"
                            type="text"
                            placeholder="Enter Contact Person Name"
                            disabled={readOnly}
                            label="Contact Person"
                            value={initialValues.person_name}
                            errors={state?.errors?.person_name}
                        />
                    </div>

                    <div>
                        <InputBox
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Enter Email Address"
                            disabled={readOnly}
                            label="Email"
                            value={initialValues.email}
                            errors={state?.errors?.email}
                        />
                    </div>

                    <div>
                        <InputBox
                            name="mobile_number"
                            id="mobile_number"
                            type="text"
                            placeholder="Enter Mobile Number"
                            disabled={readOnly}
                            label="Mobile Number"
                            value={initialValues.mobile_number}
                            errors={state?.errors?.mobile_number}
                        />
                    </div>

                    <div>
                        <label htmlFor="lead_source" className="block text-sm font-medium mb-1">
                            Lead Source
                        </label>
                        <Select
                            placeholder="Select Lead Source"
                            options={leadSourceOptions}
                            id="lead_source"
                            name="lead_source"
                            value={leadSourceOptions.find((option) => option.value === initialValues.lead_source)}
                            onChange={(option) =>
                                setInitialValues((prev: any) => ({
                                    ...prev,
                                    lead_source: option?.value ? String(option.value) : '',
                                }))
                            }
                            isDisabled={readOnly}
                            styles={customStyles}
                            menuIsOpen={readOnly ? false : undefined}
                        />
                        {state?.errors?.lead_source && (
                            <p className="text-xs text-red-500 mt-1">{state.errors.lead_source}</p>
                        )}
                    </div>

                    <div>
                        <InputBox
                            name="product"
                            id="product"
                            type="text"
                            placeholder="Enter Product/Service"
                            disabled={readOnly}
                            label="Product/Service"
                            value={initialValues.product}
                            errors={state?.errors?.product}
                        />
                    </div>
                </div>
            </div>

            {/* Right Panel - Deal Details & Location */}
            <div className="panel lg:col-span-2">
                <div className="mb-5">
                    <h5 className="text-lg font-semibold dark:text-white-light">Deal & Pipeline Details</h5>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {/* Pipeline Stage */}
                    <div>
                        <label htmlFor="pipeline_stage" className="block text-sm font-medium mb-1">
                            Pipeline Stage
                        </label>
                        <Select
                            placeholder="Select Pipeline Stage"
                            options={pipelineStageOptions}
                            id="pipeline_stage"
                            name="pipeline_stage"
                            value={pipelineStageOptions.find((option) => option.value === initialValues.pipeline_stage)}
                            onChange={(option) =>
                                setInitialValues((prev: any) => ({
                                    ...prev,
                                    pipeline_stage: option?.value ? String(option.value) : 'Qualification',
                                }))
                            }
                            isDisabled={readOnly}
                            styles={customStyles}
                            menuIsOpen={readOnly ? false : undefined}
                        />
                        {state?.errors?.pipeline_stage && (
                            <p className="text-xs text-red-500 mt-1">{state.errors.pipeline_stage}</p>
                        )}
                    </div>

                    {/* Deal Value */}
                    <div>
                        <InputBox
                            name="deal_value"
                            id="deal_value"
                            type="number"
                            placeholder="Enter Deal Value"
                            disabled={readOnly}
                            label="Deal Value ($)"
                            value={initialValues.deal_value}
                            errors={state?.errors?.deal_value}
                        />
                    </div>

                    {/* Expected Revenue */}
                    <div>
                        <InputBox
                            name="expected_revenue"
                            id="expected_revenue"
                            type="number"
                            placeholder="Enter Expected Revenue"
                            disabled={readOnly}
                            label="Expected Revenue ($)"
                            value={initialValues.expected_revenue}
                            errors={state?.errors?.expected_revenue}
                        />
                    </div>

                    {/* Follow-up Date */}
                    <div>
                        <InputBox
                            name="follow_up_date"
                            id="follow_up_date"
                            type="date"
                            placeholder="Select Follow-up Date"
                            disabled={readOnly}
                            label="Follow-up Date"
                            value={initialValues.follow_up_date}
                            errors={state?.errors?.follow_up_date}
                        />
                    </div>

                    {/* Close Date */}
                    <div>
                        <InputBox
                            name="close_date"
                            id="close_date"
                            type="date"
                            placeholder="Select Expected Close Date"
                            disabled={readOnly}
                            label="Expected Close Date"
                            value={initialValues.close_date}
                            errors={state?.errors?.close_date}
                        />
                    </div>
                </div>

                {/* Location Section */}
                <div className="mt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FiMapPin className="text-primary" />
                        <h5 className="text-lg font-semibold dark:text-white-light">Location</h5>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        <div>
                            <InputBox
                                name="province"
                                id="province"
                                type="text"
                                placeholder="Enter Province/State"
                                disabled={readOnly}
                                label="Province/State"
                                value={initialValues.location?.province}
                                errors={state?.errors?.province}
                            />
                        </div>

                        <div>
                            <InputBox
                                name="town"
                                id="town"
                                type="text"
                                placeholder="Enter Town/City"
                                disabled={readOnly}
                                label="Town/City"
                                value={initialValues.location?.town}
                                errors={state?.errors?.town}
                            />
                        </div>

                        <div>
                            <InputBox
                                name="address"
                                id="address"
                                type="text"
                                placeholder="Enter Address"
                                disabled={readOnly}
                                label="Address"
                                value={initialValues.location?.address}
                                errors={state?.errors?.address}
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                {!readOnly && (
                    <div className="mt-8 flex items-center justify-end gap-4">
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <div className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                    <span>Saving...</span>
                                </div>
                            ) : isEdit ? (
                                'Update Lead'
                            ) : (
                                'Create Lead'
                            )}
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
}
