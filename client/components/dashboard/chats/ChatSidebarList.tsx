import { useCurrentUser } from '@/hooks/useCurrentUser';
import { resetUnreadChat, selectActiveChatUsers, selectChat, selectGroupModal, selectSelectedChat, selectUnreadChats, setGroupCreate, setGroupModal, setIsShowChatMenu, setIsShowUserChat, setSelectedChat } from '@/lib/features/chat/chatSlice';
import { getAllData } from '@/lib/features/shared/actionUtils';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { formatDate, truncateText } from '@/lib/utility/functions';
import { Chat, PersonInfo } from '@/types';
import Image from 'next/image';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useSWR from 'swr';
import ChatGroupModal from './ChatGroupModal';
import { useEffect, useState } from 'react';
import socket from '@/lib/sockets';

interface ChatSidebarListProps {
    filteredItems: Chat[];
    showGroupBtn?: boolean;
}

export default function ChatSidebarList({ filteredItems, showGroupBtn }: ChatSidebarListProps) {

    // hooks 
    const dispatch = useAppDispatch();
    const activeChatUsers = useAppSelector(selectActiveChatUsers);
    const selectedChat = useAppSelector(selectSelectedChat);
    const groupModal = useAppSelector(selectGroupModal);
    const { userInfo } = useCurrentUser();
    const unreadChats = useAppSelector(selectUnreadChats);


    return (
        <div className="!mt-0 h-full">
            <PerfectScrollbar options={{ suppressScrollX: true }} className="chat-users relative -mr-3.5 h-full min-h-[100px] space-y-0.5 pr-3.5 sm:h-[calc(100vh_-_357px)]">
                {
                    filteredItems?.length === 0 ? (
                        <div className=" relative flex items-center justify-center h-full">
                            <p className="text-gray-400 dark:text-gray-500">No Chat found</p>
                        </div>
                    ) : (
                        filteredItems?.map((chat: Chat) => {

                            let isSourceWp = chat.source === 'whatsapp';
                            let displayName = isSourceWp ? chat.customer?.phone_number ?? 'Whatsapp Chat' : (chat?.chat_name || 'Group Chat');
                            let displayPic = isSourceWp ? '/assets/images/wp-logo.png' : (chat?.chat_pic || '/assets/images/profile-pic.png');
                            let otherUser: PersonInfo | undefined;
                            let otherUserId: string = '';

                            if (!chat?.is_group && chat?.users && userInfo?.id) {
                                otherUser = chat.users.find((member: PersonInfo) => member._id !== userInfo.id);
                                if (otherUser) {
                                    displayName = otherUser.full_name;
                                    displayPic = otherUser.profile_pic || '/assets/images/profile-pic.png';
                                    otherUserId = otherUser._id;
                                }
                            }

                            return (
                                <div className='p-0' key={chat._id}>
                                    <button
                                        type="button"
                                        className={`flex w-full items-center justify-between rounded-md p-2 hover:bg-gray-100 hover:text-primary dark:hover:bg-[#050b14] dark:hover:text-primary ${selectedChat && selectedChat._id === chat._id ? 'bg-gray-100 text-primary dark:bg-[#050b14] dark:text-primary' : ''}`}
                                        onClick={() => {
                                            dispatch(selectChat(chat));
                                            dispatch(resetUnreadChat(chat._id));
                                        }}
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <div className="relative flex-shrink-0">
                                                    <Image src={displayPic} width={48} height={48} className="h-12 w-12 rounded-full object-cover" alt={displayName} />
                                                    {
                                                        (!chat?.is_group && activeChatUsers.includes(otherUserId)) && (
                                                            <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                                                                <div className="size-3 rounded-full bg-success" />
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <div className="mx-3 ltr:text-left rtl:text-right">
                                                    <p className="mb-1 font-semibold">{truncateText(displayName, 17)}</p>
                                                    <p className="max-w-[185px] truncate text-xs text-white-dark">{chat.latest_message?.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="whitespace-nowrap text-xs font-semibold flex flex-col items-center gap-2">
                                            <p>{formatDate(chat.latest_message?.createdAt)}</p>
                                            {unreadChats[chat._id] > 0 && (
                                                <span className="badge bg-primary text-white text-xs  size-5 rounded-full">
                                                    {unreadChats[chat._id]}
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            );
                        })
                    )
                }
                {showGroupBtn && <button className='btn btn-primary btn-sm absolute bottom-0 right-5'
                    onClick={() => dispatch(setGroupCreate())}
                >+</button>}
                {
                    groupModal && <ChatGroupModal isOpen={groupModal} onClose={() => dispatch(setGroupModal(false))} />
                }
            </PerfectScrollbar>

        </div>
    )
}
