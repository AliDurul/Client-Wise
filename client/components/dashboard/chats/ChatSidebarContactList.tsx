import { useCurrentUser } from '@/hooks/useCurrentUser';
import { getAllData } from '@/lib/features/shared/actionUtils';
import { Chat, PersonInfo } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useSWR from 'swr';
import ChatSidebarListSkeleton from './ChatSidebarListSkeleton';
import ChatGroupModal from './ChatGroupModal';
import { selectChat } from '@/lib/features/chat/chatSlice';
import { useAppDispatch } from '@/lib/hooks';


export default function ChatSidebarContactList({ chats, setTabAll }: { chats: Chat[]; setTabAll: () => void }) {

    // hooks
    const dispatch = useAppDispatch();
    const { userInfo } = useCurrentUser()
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredUsers, setFilteredUsers] = useState<any[]>([])

    // api
    const { data: users, isLoading } = useSWR('users', () => getAllData({ url: 'users/', customQuery: { limit: 100, select: 'full_name profile_pic email phone_number' } }), {
        onSuccess: (data) => {
            setFilteredUsers(data.result);
        }
    });


    useEffect(() => {
        const filtered = users?.result?.filter((user: PersonInfo) => user.full_name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredUsers(filtered || []);
    }, [searchQuery, users]);



    const handleClick = (user: PersonInfo) => {

        const existingChat = chats.find(
            chat =>
                !chat.is_group &&
                chat.users.some(u => u._id === userInfo?.id) &&
                chat.users.some(u => u._id === user._id)
        );

        if (existingChat) {
            dispatch(selectChat(existingChat));
        } else {
            dispatch(selectChat(user));
        }
        setTabAll();
    };

    return (
        <div className='relative'>

            <div className="relative mb-3">
                <input type="text" className="peer form-input ltr:pr-9 rtl:pl-9" placeholder="Searching..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-2 rtl:left-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                        <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                    </svg>
                </div>
            </div>

            {
                isLoading
                    ? <ChatSidebarListSkeleton />
                    : (
                        <PerfectScrollbar options={{ suppressScrollX: true }} className="user-users relative -mr-3.5 h-full min-h-[100px] space-y-0.5 pb-5 pr-3.5 sm:h-[calc(100vh_-_357px)]">

                            {
                                filteredUsers.length > 0 ? (
                                    filteredUsers.map((user: PersonInfo, i: number) => {
                                        if (user._id === userInfo?.id) return null

                                        return (
                                            <button
                                                key={user._id}
                                                className="flex w-full items-center justify-between rounded-md p-2 hover:bg-gray-100 hover:text-primary dark:hover:bg-[#050b14] dark:hover:text-primary "
                                                type="button"
                                                onClick={() => handleClick(user)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="relative flex-shrink-0">
                                                        <Image
                                                            alt='userProfile'
                                                            width={48} height={48}
                                                            className="rounded-full object-cover"
                                                            src={user?.profile_pic || '/assets/images/profile-pic.png'} />
                                                    </div>
                                                    <div className="mx-3 ltr:text-left rtl:text-right">
                                                        <p className="mb-1 font-semibold">{user?.full_name} </p>

                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })
                                ) : (
                                    <p className="absolute top-1/2 left-24 text-gray-400 dark:text-gray-500">No user found</p>
                                )
                            }
                        </PerfectScrollbar >
                    )
            }

        </div>
    )
}
