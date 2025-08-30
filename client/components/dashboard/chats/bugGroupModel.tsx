import { ModalCloseIcon } from '@/icons/modal';
import { Dialog, DialogPanel } from '@headlessui/react';
import Image from 'next/image';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import React, { startTransition, useActionState, useEffect, useRef, useState } from 'react'
import InputBox from '@/components/shared/InputBox';
import { getAllData, getData } from '@/lib/features/shared/actionUtils';
import useSWR, { mutate } from 'swr';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { groupCrUpAction } from '@/lib/features/chat/chatActions';
import toast from 'react-hot-toast';
import CustomerImageUpload from '../customer/CustomerImageUpload';
import { file } from 'zod';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { selectSelectedChat } from '@/lib/features/chat/chatSlice';
import { useAppSelector } from '@/lib/hooks';
import { Chat } from '@/types';

interface ChatGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IinitialValues {
    _id: string;
    chat_name: string;
    users: any[];
    chat_pic: File | null | string;
}

export default function ChatGroupModal({ isOpen, onClose }: ChatGroupModalProps) {

    // hooks
    const { userInfo } = useCurrentUser()
    const selectedChat = useAppSelector(selectSelectedChat);

    const [images, setImages] = useState<any>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // api
    const { data, isLoading: usersLoading } = useSWR('users', () => getAllData({ url: 'users/', customQuery: { limit: 100, select: 'full_name profile_pic' } }));
    const { data: groupInfo, isLoading: groupLoading } = useSWR<{ result: Chat }>(selectedChat ? `chats/group/${selectedChat._id}` : null, () => getData(`chats/group/${selectedChat?._id}`));
    const [state, action, isLoading] = useActionState(groupCrUpAction, null);

    // initial values
    const [initialValues, setInitialValues] = useState<IinitialValues>(() => {
        return groupInfo?.result && 'is_group' in groupInfo?.result && groupInfo?.result.is_group ? {
            _id: groupInfo?.result._id,
            chat_name: groupInfo?.result.chat_name ?? '',
            users: groupInfo?.result.users.map((user: any) => ({
                label: user.full_name,
                value: user._id,
                picture: user?.profile_pic
            })),
            chat_pic: groupInfo?.result.chat_pic
        } : {
            _id: '',
            chat_name: '',
            users: [],
            chat_pic: null
        }
    });

    // @ts-expect-error
    const isDisabled = !!selectedChat && groupInfo?.result.group_admin?._id !== userInfo?.id;


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

    function toFormData(initialValues: IinitialValues): FormData {
        const formData = new FormData();
        formData.append('_id', initialValues._id || '');
        formData.append('chat_name', initialValues.chat_name || '');
        console.log(initialValues.users);

        initialValues.users.forEach((userId) => {
            formData.append('users[]', userId);
        });
        if (initialValues.chat_pic) {
            formData.append('chat_pic', initialValues.chat_pic);
        }
        return formData;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            action(toFormData(initialValues));
        });
    }

    useEffect(() => {
        if (!state) return

        if (state?.success) {
            mutate('chats');
            toast.success('Group created successfully');
            onClose();
            setInitialValues({ _id: '', chat_name: '', users: [], chat_pic: null });
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

                                {
                                    typeof initialValues.chat_pic === 'string' ? (
                                        <Image
                                            src={initialValues?.chat_pic ? initialValues.chat_pic : '/assets/images/profile-pic.png'}
                                            alt="profile"
                                            width={120}
                                            height={120}
                                            className="rounded-full my-5 mx-auto" />
                                    ) : (
                                        <div className="w-full" data-upload-id="profile_pic">
                                            <input
                                                type="file"
                                                name="profile_pic"
                                                ref={fileInputRef}
                                                onChange={() => {
                                                    const file = fileInputRef.current?.files?.[0] ?? null;
                                                    setInitialValues((prev) => ({ ...prev, chat_pic: file }));
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setImages([{ dataURL: reader.result, file }]);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className='hidden'
                                                aria-hidden="true"
                                            />
                                            {
                                                images.length === 0 && <div className='flex gap-3 justify-center items-center'>
                                                    <div className="flex-1 inset-0 z-5 h-10 overflow-hidden rounded border border-[#f1f2f3] bg-[#f1f2f3] dark:border-[#17263c] dark:bg-[#121e32] dark:text-white-dark dark:focus:border-primary  px-3 py-2 text-sm leading-6 text-[#333] select-none cursor-pointer"
                                                        onClick={() => fileInputRef.current?.click()} >
                                                        Choose Pic...
                                                    </div>
                                                    <div className="text-[#333] text-[26px]  cursor-pointer" title="Clear Image" onClick={() => { setImages([]); }}>×</div>
                                                </div>
                                            }

                                            {images.map((image: any, index: number) => (
                                                <div key={index} className=" relative mt-3">
                                                    <Image width={100} height={100} src={image.dataURL || ''} alt="user profile" className="m-auto max-w-md  rounded-full  object-cover" />
                                                    <span className="absolute top-0 right-0 cursor-pointer text-gray-500 text-lg" onClick={() => setImages([])}>×</span>
                                                </div>
                                            ))}
                                            {images.length === 0
                                                ? <Image width={100} height={100} src="/assets/images/file-preview.svg" className="m-auto  max-w-md  rounded-full object-cover mt-3" alt="user profile" />
                                                : ''
                                            }
                                        </div>
                                    )
                                }
                                <div className="mt-3" />

                                <div className='flex gap-5'>

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
                                    {
                                        selectedChat && (
                                            <InputBox
                                                id='group_admin'
                                                name='group_admin'
                                                type='text'
                                                placeholder='Enter Group Admin'
                                                label='Group Admin'
                                                className='flex-1 mb-5'
                                                readOnly={true}
                                                disabled={true}
                                                // @ts-expect-error
                                                value={groupInfo?.result.group_admin?.full_name}
                                            />
                                        )
                                    }

                                </div>
                                {
                                    usersLoading && groupLoading
                                        ? <LoadingSpinner />
                                        : (<Select
                                            placeholder="Select Group Members"
                                            options={userOp}
                                            value={initialValues.users}
                                            name='users'
                                            isDisabled={isDisabled}
                                            isMulti
                                            required
                                            components={animatedComponents}
                                            formatOptionLabel={(user: any) => {
                                                console.log(user);
                                                return <div className="flex items-center">
                                                    <img
                                                        src={user.picture}
                                                        alt={user.label}
                                                        width={30}
                                                        height={30}
                                                        className="rounded-full mr-2"
                                                    />
                                                    <span>{user.label}</span>
                                                </div>
                                            }}
                                            onChange={(selectedOptions) => {
                                                const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                                console.log(selectedValues);
                                                setInitialValues(() => ({ ...initialValues, users: selectedValues }))
                                            }}
                                        />)
                                }

                                <div className="h-px border-b border-white-light dark:border-[#1b2e4b]" />

                                <div className="mt-8 flex items-center justify-end">
                                    <button type="button" className="btn btn-outline-danger" onClick={() => onClose()}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4" disabled={isLoading}>
                                        {
                                            isLoading ? 'Loading...' : initialValues?._id ? 'Update' : 'Add'
                                        }
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
