import { ModalCloseIcon } from '@/icons/modal';
import { Dialog, DialogPanel } from '@headlessui/react';
import Image from 'next/image';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import React, { startTransition, useActionState, useEffect, useState } from 'react'
import InputBox from '@/components/shared/InputBox';
import { getAllData } from '@/lib/features/shared/actionUtils';
import useSWR, { mutate } from 'swr';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { postGroup } from '@/lib/features/chat/chatActions';
import toast from 'react-hot-toast';

interface ChatGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChatGroupModal({ isOpen, onClose }: ChatGroupModalProps) {

    // api
    const { data, isLoading: usersLoading } = useSWR('users', () => getAllData({ url: 'users/', customQuery: { limit: 100, select: 'full_name profile_pic' } }));

    // hooks
    const { userInfo } = useCurrentUser()
    const [state, action, isLoading] = useActionState(postGroup, null);
    const [initialValues, setInitialValues] = useState({ _id: '', chat_name: '', users: [] as string[] });
    console.log(state);

    // constants
    const animatedComponents = makeAnimated();
    const userOp = data?.result
        ?.filter((user: any) => user._id !== userInfo?.id)
        ?.map((user: any) => ({
            label: user.full_name,
            value: user._id,
            picture: user?.profile_pic
        }));


    // functions
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            action(initialValues);
        });
    }

    useEffect(() => {
        if (!state) return

        if (state?.success) {
            mutate('chats');
            toast.success('Group created successfully');
            onClose();
            setInitialValues({ _id: '', chat_name: '', users: [] });
        } else {
            toast.error(state?.message || 'Something went wrong');
        }

    }, [state])



    return (
        <Dialog as="div" open={isOpen} onClose={() => onClose()}>

            <div id="slideIn_down_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                <div className="flex items-start justify-center min-h-screen px-4">
                    <DialogPanel className='panel border-0 p-0 rounded-lg  w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated'>
                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                            <h5 className="font-bold text-lg">Create New Group</h5>
                            <button onClick={() => onClose()} type="button" className="text-white-dark hover:text-dark">
                                <ModalCloseIcon />
                            </button>
                        </div>
                        <div className="p-5">
                            <form onSubmit={handleSubmit}>
                                {/* picture upload */}
                                {/* <div >
                                    <input
                                        id='chatPicture'
                                        type="file"
                                        className="custom-file-container__custom-file__custom-file-input h-0 w-full"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleUpload}
                                        style={{ display: 'none' }}
                                    />
                                    <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                    <div className="upload__image-wrapper">
                                        {!chatPicture && (
                                            <div className="custom-file-container__custom-file__custom-file-control cursor-pointer static mb-5 h-9" onClick={handleDivClick}>
                                                Choose Profile Pic...
                                            </div>
                                        )}
                                        {preview && (
                                            <div className="custom-file-container__image-preview relative mb-5 ">
                                                <div className='absolute left-0 text-2xl cursor-pointer' onClick={() => { setChatPicture(null); setPreview(null) }}>x</div>
                                                <Image
                                                    width={45}
                                                    height={45}
                                                    src={preview}
                                                    alt="img"
                                                    className="m-auto max-w-md h-24 w-24 rounded-full object-cover"
                                                />

                                            </div>
                                        )}
                                    </div>
                                </div> */}

                                <InputBox
                                    id='chat_name'
                                    name='chat_name'
                                    type='text'
                                    placeholder='Enter Group Name'
                                    label='Chat Name'
                                    className='flex-1 mb-5'
                                    value={initialValues.chat_name}
                                    onChange={(e) => setInitialValues({ ...initialValues, chat_name: e.target.value })}
                                />

                                <Select
                                    placeholder="Select Group Members"
                                    options={userOp}
                                    name='users'
                                    isMulti
                                    components={animatedComponents}
                                    formatOptionLabel={(user: any) => (
                                        <div className="flex items-center">
                                            <Image
                                                src={user.picture}
                                                alt={user.label}
                                                width={30}
                                                height={30}
                                                className="rounded-full mr-2"
                                            />
                                            <span>{user.label}</span>
                                        </div>
                                    )}
                                    onChange={(selectedOptions) => {
                                        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                        setInitialValues(() => ({ ...initialValues, users: selectedValues }))
                                        // setSelectedUsers(users.filter(user => selectedValues.includes(user.id)));
                                    }}
                                />

                                <div className="h-px border-b border-white-light dark:border-[#1b2e4b]" />

                                <div className="mt-8 flex items-center justify-end">
                                    <button type="button" className="btn btn-outline-danger" onClick={() => onClose()}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                        {initialValues?._id ? 'Update' : 'Add'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog >
    )
}
