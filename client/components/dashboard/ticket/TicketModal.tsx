'use client';
import InputBox from '@/components/shared/InputBox';
import { getAllData } from '@/lib/features/shared/actionUtils';
import { ticketCrUpAction } from '@/lib/features/tickets/ticketActions';
import { selectTicket, selectTicketModal, setTicketModal } from '@/lib/features/tickets/ticketSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { Customer, TicketCategory } from '@/types';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import React, { useActionState, useEffect, useRef, useState } from 'react'
import MaskedInput from 'react-text-mask';
import useSWR from 'swr';
import Select from 'react-select';
import toast from 'react-hot-toast';
import FormErrMsg from '@/components/shared/FormErrMsg';
import TicketUserModal from './TicketUserModal';
import { PlusIcon } from '@/icons';
import TicketCategoryModal from './TicketCategoryModal';



const AnimateSpin = () => (
    <div className="flex items-center justify-center h-10">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500" />
    </div>
);

type TicketFormValues = {
    _id: string;
    title: string;
    description: string;
    customer: string;
    caller_phone: string;
    flag: "important" | "moderate" | "least important" | "prank";
    category: string | number;
    priority: "high" | "medium" | "low" | "critical";
    status: "pending" | "active" | "resolved" | "cancelled" | "escalated";
};


const defaultValues: TicketFormValues = {
    _id: '',
    title: '',
    description: '',
    customer: '',
    caller_phone: '',
    flag: 'moderate',
    category: '',
    priority: 'medium',
    status: 'active',
};

export default function TicketModal() {

    // data fetching
    const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useSWR('categories', () => getAllData({ url: 'tickets/categories/' }));
    const { data: customers, error: customersError, isLoading: customersLoading } = useSWR('customers', () => getAllData({ url: 'customers/' }));

    // hooks
    const [state, action, isLoading] = useActionState(ticketCrUpAction, null);
    const dispatch = useAppDispatch();
    const ticketModal = useAppSelector(selectTicketModal);
    const ticket = useAppSelector(selectTicket);

    // states
    const [categoryModal, setCategoryModal] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const phoneOp = customers?.result?.map((customer: Customer) => ({ label: customer.phone_number, value: customer._id }));
    const categoryOp = categories?.result?.map((category: TicketCategory) => ({ label: category.name, value: category._id }));

    const [initialValues, setInitialValues] = useState<TicketFormValues>(() => {
        return ticket ? {
            _id: ticket?._id || '',
            title: ticket?.title || "",
            description: ticket?.description || "",
            customer: ticket?.customer?._id || '',
            caller_phone: ticket?.caller_phone || "",
            flag: ticket?.flag || "important",
            category: ticket?.category._id || '',
            priority: ticket?.priority || "medium",
            status: ticket?.status || "active",
        } : {
            ...defaultValues,
            ...(state?.inputs as Partial<TicketFormValues> ?? {})
        };
    });

    const [isOwn, setIsOwn] = useState<boolean>(!!initialValues.caller_phone);

    // Actions
    useEffect(() => {
        if (!state) return;

        setInitialValues(prev => ({
            ...prev,
            ...(state?.inputs as Partial<TicketFormValues> ?? {})
        }));

        if (state?.success) {
            toast.success(state?.message || 'Operation completed successfully');
            dispatch(setTicketModal({ open: false, record: null }));
        } else {
            toast.error(state?.message || 'Operation failed');
        }
    }, [state]);


    return (
        <Dialog open={ticketModal} onClose={() => dispatch(setTicketModal({ open: false, record: null }))} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/50" />
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center px-4 py-8">
                    <DialogPanel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                        <button
                            type="button"
                            onClick={() => { dispatch(setTicketModal({ open: false, record: null })) }}
                            className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pr-5 rtl:pl-[50px] dark:bg-[#121c2c]">
                            {ticket ? 'Edit Ticket' : 'Create Ticket'}
                        </div>
                        <form className='p-5' action={action} >
                            <input type="text" name="_id" defaultValue={ticket?._id} hidden />
                            <div className=" flex mb-1">
                                <div className='w-24 '>
                                    <label htmlFor="" className='text-zinc-600 text-sm '>Add Caller</label>
                                    <div className="">
                                        <label className="w-12 h-5 relative">
                                            <input
                                                type="checkbox"
                                                checked={isOwn === true}
                                                onChange={() => setIsOwn(!isOwn)}
                                                className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />

                                            <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-3 before:h-3 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300" />
                                        </label>
                                    </div>
                                </div>

                                {
                                    isOwn && (
                                        <div className="ml-auto">
                                            <label htmlFor="phoneNo" className='text-sm'>
                                                Caller Phone Number
                                            </label>
                                            <MaskedInput
                                                id="phoneNo"
                                                name='caller_phone'
                                                type="text"
                                                placeholder="+___-___-___-___"
                                                className={`form-input `}
                                                defaultValue={ticket?.caller_phone}
                                                required
                                                mask={[
                                                    '+',
                                                    /\d/, /\d/, /\d/, // Allow up to three digits for the country code
                                                    '-',
                                                    /\d/, /\d/, /\d/, // First group of three digits
                                                    '-',
                                                    /\d/, /\d/, /\d/, // Second group of three digits
                                                    '-',
                                                    /\d/, /\d/, /\d/  // Third group of three digits
                                                ]}
                                            />
                                        </div>
                                    )
                                }

                            </div>
                            <div className={`mb-5`}>
                                <label htmlFor="phoneNo">Client Phone Number </label>
                                {
                                    customersLoading
                                        ? (<AnimateSpin />)
                                        : (<div className="flex justify-center items-center gap-2">
                                            <Select
                                                placeholder="Select The Number"
                                                name='customer'
                                                className='flex-1'
                                                options={phoneOp}
                                                value={phoneOp?.find((option: any) => option.value === initialValues.customer)}
                                                onChange={option => setInitialValues(prev => ({ ...prev, customer: option?.value ? String(option.value) : '' }))}
                                            />

                                            <button onClick={() => setUserModal(true)} type="button" className="btn btn-outline-primary btn-sm">
                                                <PlusIcon />
                                            </button>

                                            {userModal && <TicketUserModal userModal={userModal} onClose={() => setUserModal(false)} />}
                                        </div>)
                                }
                                {state?.errors?.customer && <FormErrMsg error={state.errors.customer} />}

                            </div>

                            <div className="mb-5">
                                <InputBox
                                    id="title"
                                    name='title'
                                    type="text"
                                    label='Title'
                                    placeholder="Enter Title"
                                    errors={state?.errors?.title}
                                    value={initialValues?.title}
                                />
                            </div>
                            <div className={`mt-5 `}>
                                <label htmlFor="cat">Category</label>
                                {
                                    categoriesLoading
                                        ? (<AnimateSpin />)
                                        : (<div className="flex justify-center items-center gap-2">
                                            <Select
                                                placeholder="Select The Category"
                                                name='category'
                                                className='flex-1'
                                                options={categoryOp}
                                                value={categoryOp?.find((option: any) => option.value === initialValues.category)}
                                                onChange={option => setInitialValues(prev => ({ ...prev, category: option?.value ? String(option.value) : '' }))}
                                            />

                                            <button onClick={() => setCategoryModal(true)} type="button" className="btn btn-outline-secondary btn-sm">
                                                <PlusIcon />
                                            </button>

                                            {categoryModal && <TicketCategoryModal categoryModal={categoryModal} onClose={() => setCategoryModal(false)} />}

                                        </div>)
                                }
                                {state?.errors?.category && <FormErrMsg error={state.errors.category} />}
                            </div>
                            <div className={`mt-5 `}>
                                <label htmlFor="flag">Flag</label>
                                <select id="flag" defaultValue={initialValues.flag} name="flag" className={`form-select ${state?.errors?.flag && 'border-red-500'}`} required>
                                    <option value="">Select Flag...</option>
                                    <option value="important">Important</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="least important">Least Important</option>
                                    <option value="prank">Prank</option>
                                </select>
                                {state?.errors?.flag && <FormErrMsg error={state.errors.flag} />}
                            </div>
                            <div className="flex mt-5 gap-3 w-full">
                                <div className={`flex-1 `}>
                                    <label htmlFor="status">Status</label>
                                    <select id='status' name='status' defaultValue={initialValues.status} className="form-select" required >
                                        <option value="">Select Status...</option>
                                        <option value="pending">Pending</option>
                                        <option value="active">Active</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                    {state?.errors?.status && <FormErrMsg error={state.errors.status} />}
                                </div>
                                <div className={`flex-1 `}>
                                    <label htmlFor="priority">Priority</label>
                                    <select id="priority" name='priority' defaultValue={initialValues.priority} className="form-select" required >
                                        <option value="">Select Priority...</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                        <option value="critical">Critical</option>
                                    </select>
                                    {state?.errors?.priority && <FormErrMsg error={state.errors.priority} />}
                                </div>
                            </div>
                            <div className='flex mt-5'>
                                <div className='bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] whitespace-nowrap '>
                                    Description
                                </div>
                                <InputBox
                                    id='description'
                                    name='description'
                                    type='textarea'
                                    placeholder='Enter description'
                                    className={`ltr:rounded-l-none rtl:rounded-r-none`}
                                    errors={state?.errors?.description}
                                    value={initialValues?.description}
                                />
                            </div>

                            <div className="mt-8 flex items-center justify-end">
                                <button type="button" className="btn btn-outline-danger gap-2" onClick={() => dispatch(setTicketModal({ open: false, record: null }))}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                    {isLoading ? 'Loading...' : ticket ? 'Update Ticket' : 'Create Ticket'}
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
