import InputBox from '@/components/shared/InputBox';
import { TicketCategoryCrUpAction } from '@/lib/features/tickets/ticketActions';
import { Dialog, DialogPanel } from '@headlessui/react'
import React, { useActionState, useEffect } from 'react'
import toast from 'react-hot-toast';
import MaskedInput from 'react-text-mask';
import { mutate } from 'swr';


interface TicketcategoryModalProps {
    categoryModal: boolean;
    onClose: () => void;
}

export default function TicketCategoryModal({ categoryModal, onClose }: TicketcategoryModalProps) {

    const [state, action, isLoading] = useActionState(TicketCategoryCrUpAction, null);

    useEffect(() => {
        if (!state) return;

        if (state?.success) {
            mutate('categories');
            toast.success(state?.message || 'Operation completed successfully');
            onClose();
        } else {
            toast.error(state?.message || 'Operation failed');
        }

    }, [state])


    return (
        <Dialog open={categoryModal} onClose={onClose}>
            <div id="slidein_up_modal" className="fixed inset-0 bg-[black]/10 z-[999] overflow-y-auto">
                <div className="flex items-start justify-center min-h-screen px-4">
                    <DialogPanel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-32 text-black dark:text-white-dark animate__animated animate__slideInUp">
                        <div className=" bg-[#fbfbfb] dark:bg-[#121c2c]  px-5 py-3">
                            <h5 className="font-bold text-lg">Create New User</h5>
                        </div>
                        <form className="p-3" action={action}>
                            {/* <input type="text" name="ref" id="ref" hidden defaultValue={'ticket'} /> */}
                            <div className="flex gap-3">
                                <div className='flex-1'>
                                    <InputBox
                                        type='text'
                                        id='name'
                                        name='name'
                                        label='Name'
                                        placeholder='Enter Category Name'
                                        errors={state?.errors?.name}
                                        value={state?.inputs?.name}
                                    />
                                </div>
                                <div className='flex-1'>
                                    <InputBox
                                        type='text'
                                        id='description'
                                        name='description'
                                        label='Description'
                                        placeholder='Enter Description'
                                        errors={state?.errors?.description}
                                        value={state?.inputs?.description}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end items-center mt-8">
                                <button onClick={onClose} type="button" className="btn btn-outline-danger">
                                    Discard
                                </button>
                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                    Save
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
