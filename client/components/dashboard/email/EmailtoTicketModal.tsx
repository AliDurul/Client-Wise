import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Select from 'react-select';

import React, { useActionState, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectAssignModal, selectEmail, setAssignModal } from '@/lib/features/email/emailSlice';
import InputBox from '@/components/shared/InputBox';
import useSWR from 'swr';
import { getAllData } from '@/lib/features/shared/actionUtils';
import { TicketCategory, User } from '@/types';
import { ticketCrUpAction } from '@/lib/features/tickets/ticketActions';
import FormErrMsg from '@/components/shared/FormErrMsg';
import { PlusIcon } from '@/icons';
import TicketCategoryModal from '../ticket/TicketCategoryModal';
import toast from 'react-hot-toast';
import { getMessageBody } from '@/lib/utility/functions';


const AnimateSpin = () => (
    <div className="flex items-center justify-center h-10">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500" />
    </div>
);

export default function EmailtoTicketModal() {

    // hooks
    const dispatch = useAppDispatch();

    // state - variables
    const assignModal = useAppSelector(selectAssignModal);
    const email = useAppSelector(selectEmail);
    // console.log(email);

    const [categoryModal, setCategoryModal] = useState(false);

    // actions
    const [state, action, isLoading] = useActionState(ticketCrUpAction, null);
    const { data: categories, isLoading: categoriesLoading } = useSWR<{ success: true, result: TicketCategory[] }>('categories', () => getAllData({ url: 'tickets/categories/' }));
    const { data: agents, isLoading: agentsLoading } = useSWR<{ success: true, result: User[] }>('agents', () => getAllData({ url: 'users/', filterQueries: { role: 'agent' } }));

    // options
    const agentOp = agents?.result.map(agent => ({ value: agent._id, label: agent.full_name || agent.email }));
    const categoryOp = categories?.result?.map((category) => ({ label: category.name, value: category._id }));

    // action result
    useEffect(() => {
        if (!state) return;
        console.log(state);

        if (state?.success) {
            toast.success(state?.message || 'Operation completed successfully');
            dispatch(setAssignModal({ open: false, email: null }));
            // dispatch(setTicketModal({ open: false, record: null }));
        } else {
            toast.error(state?.message || 'Operation failed');
        }
    }, [state]);

    return (
        <Dialog open={assignModal} onClose={() => dispatch(setAssignModal({ open: false, email: null }))} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/50" />
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center px-4 py-8">
                    <DialogPanel className="panel w-full max-w-lg  rounded-lg border-0 p-5 text-black dark:text-white-dark">
                        <button
                            type="button"
                            onClick={() => { dispatch(setAssignModal({ open: false, email: null })) }}
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
                            Create Ticket From Email
                        </div>
                        <form className='p-5' action={action} >
                            {/* <input type="text" name="customer" defaultValue='asdfasdf' hidden /> */}
                            <input type="text" name="email_id" defaultValue={email?.id} hidden />

                            <input type="text" name="source" defaultValue='email' hidden />
                            {/* <input type="text" name="caller_phone" defaultValue='' hidden /> */}


                            <div className={`mb-5`}>
                                <label htmlFor="assigned_agent">Agents </label>
                                {
                                    agentsLoading
                                        ? (<AnimateSpin />)
                                        : (<Select
                                            placeholder="Select The Agent"
                                            name='assigned_agent'
                                            className='flex-1'
                                            options={agentOp}
                                            value={agentOp?.find((option: any) => option.value === state?.inputs?.assigned_agent)}
                                            required
                                        // onChange={option => setInitialValues(prev => ({ ...prev, customer: option?.value ? String(option.value) : '' }))}
                                        />)
                                }
                                {state?.errors?.assigned_agent && <FormErrMsg error={state.errors.assigned_agent} />}
                            </div>

                            <div className="mb-5">
                                <InputBox
                                    id="title"
                                    name='title'
                                    type="text"
                                    label='Title'
                                    placeholder="Enter Title"
                                    errors={state?.errors?.title}
                                    value={state?.inputs?.title || email?.title || ''}
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
                                                value={categoryOp?.find((option: any) => option.value === state?.inputs?.category)}
                                            // onChange={option => setInitialValues(prev => ({ ...prev, category: option?.value ? String(option.value) : '' }))}
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
                                <select
                                    key={`flag-${state?.inputs?.flag ?? 'init'}`}
                                    id="flag"
                                    name="flag"
                                    defaultValue={state?.inputs?.flag as string || 'moderate'}
                                    className={`form-select ${state?.errors?.flag && 'border-red-500'}`}
                                    required
                                >
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
                                    <select
                                        id='status'
                                        name='status'
                                        defaultValue={state?.inputs?.status as string || 'pending'}
                                        className="form-select"
                                        required
                                        key={`status-${state?.inputs?.status ?? 'init'}`}
                                    >
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
                                    <select
                                        id="priority"
                                        name='priority'
                                        defaultValue={state?.inputs?.priority as string || 'medium'}
                                        className="form-select"
                                        required
                                        key={`priority-${state?.inputs?.priority ?? 'init'}`}
                                    >
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
                                    value={state?.inputs?.description || getMessageBody(email?.payload, false) || ''}
                                    readOnly={true}
                                />
                            </div>

                            <div className="mt-8 flex items-center justify-end">
                                <button type="button" disabled={isLoading} className="btn btn-outline-danger gap-2" onClick={() => dispatch(setAssignModal({ open: false, email: null }))}>
                                    Cancel
                                </button>
                                <button type="submit" disabled={isLoading} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                    {isLoading ? 'Loading...' : 'Create Ticket'}
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
