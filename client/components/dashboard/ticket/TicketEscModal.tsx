'use client';
import InputBox from '@/components/shared/InputBox';
import { escalateTicket } from '@/lib/features/tickets/ticketActions';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import React, { useActionState, useEffect } from 'react'
import toast from 'react-hot-toast';
import MaskedInput from 'react-text-mask';

interface TicketEscModalProps {
    ticketId: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function TicketEscModal({ ticketId, isOpen, onClose }: TicketEscModalProps) {
    const dispatch = useAppDispatch();

    const [state, action, isLoading] = useActionState(escalateTicket, null);

    useEffect(() => {
        if (!state) return;

        if (state?.success) {
            toast.success(state?.message || 'Operation completed successfully');
            onClose();
        } else {
            toast.error(state?.message || 'Operation failed');
        }
    }, [state]);


    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/50" />
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center px-4 py-8">
                    <DialogPanel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-5 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600">
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
                        <DialogTitle as="h3" className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pr-5 rtl:pl-[50px] dark:bg-[#121c2c]">
                            Escalation Form
                        </DialogTitle>
                        <form action={action} className='space-y-6 p-5'>
                            <input type="text" hidden name="_id" defaultValue={ticketId} />
                            <div>
                                <InputBox
                                    name="reason"
                                    id="reason"
                                    label='What is the reason?'
                                    type="textarea"
                                    placeholder="Reason..."
                                    className="min-h-56"
                                    errors={state?.errors?.reason}
                                    value={state?.inputs?.reason}
                                />
                            </div>
                            <button type="submit" disabled={isLoading} className="btn btn-secondary ml-auto !mt-6">
                                {isLoading ? 'Loading...' : 'Escalate'}
                            </button>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
