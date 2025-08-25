import { useCurrentUser } from '@/hooks/useCurrentUser';
import { selectSelectedChat } from '@/lib/features/chat/chatSlice';
import { getAllData } from '@/lib/features/shared/actionUtils';
import { useAppSelector } from '@/lib/hooks';
import { formatDate } from '@/lib/utility/functions';
import { Chat, PersonInfo } from '@/types';
import Image from 'next/image';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useSWR from 'swr';

interface ChatSidebarListProps {
    filteredItems: Chat[];
    selectUser: (chat: Chat) => void;
    showGroupBtn?: boolean;
}

export default function ChatSidebarList({ filteredItems, selectUser, showGroupBtn }: ChatSidebarListProps) {

    const { userInfo } = useCurrentUser();
    const selectedChat = useAppSelector(selectSelectedChat);

    return (
        <div className="!mt-0">
            <PerfectScrollbar options={{ suppressScrollX: true }} className="chat-users relative -mr-3.5 h-full min-h-[100px] space-y-0.5 pr-3.5 sm:h-[calc(100vh_-_357px)]">
                {
                    filteredItems?.length === 0 ? (
                        <div className=" relative flex items-center justify-center h-full">
                            <p className="text-gray-400 dark:text-gray-500">No Chat found</p>
                        </div>
                    ) : (
                        filteredItems.map((chat: Chat) => {

                            let displayName = chat.chat_name || 'Group Chat'
                            let displayPath = chat.chat_pic || '/assets/images/profile-pic.png';

                            if (!chat.is_group) {
                                const otherUser = chat.users.find((member: PersonInfo) => member._id.toString() !== userInfo?.id);
                                if (otherUser) {
                                    displayName = otherUser.full_name;
                                    displayPath = otherUser.profile_pic || '/assets/images/profile-pic.png';
                                }
                            }

                            return (
                                <div className='p-0' key={chat._id}>
                                    <button
                                        type="button"
                                        className={`flex w-full items-center justify-between rounded-md p-2 hover:bg-gray-100 hover:text-primary dark:hover:bg-[#050b14] dark:hover:text-primary ${selectedChat && selectedChat._id === chat._id ? 'bg-gray-100 text-primary dark:bg-[#050b14] dark:text-primary' : ''}`}
                                        onClick={() => selectUser(chat)}
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <div className="relative flex-shrink-0">
                                                    <Image src={displayPath} width={48} height={48} className="h-12 w-12 rounded-full object-cover" alt={displayName} />
                                                    {/* {chat.active && (
                                                    <div>
                                                        <div className="absolute bottom-0 ltr:right-0 rtl:left-0">
                                                            <div className="h-4 w-4 rounded-full bg-success"></div>
                                                        </div>
                                                    </div>
                                                )} */}
                                                </div>
                                                <div className="mx-3 ltr:text-left rtl:text-right">
                                                    <p className="mb-1 font-semibold">{displayName}</p>
                                                    <p className="max-w-[185px] truncate text-xs text-white-dark">{chat.latest_message?.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="whitespace-nowrap text-xs font-semibold">
                                            <p>{formatDate(chat.latest_message?.createdAt)}</p>
                                        </div>
                                    </button>
                                </div>
                            );
                        })
                    )
                }
                {showGroupBtn && <button className='btn btn-primary btn-md absolute bottom-10 right-5'
                // onClick={() => setGroupModal(!groupModal)}
                >+</button>}
                {/* <GroupModal isOpen={groupModal} onClose={() => setGroupModal(false)} /> */}
            </PerfectScrollbar>
        </div>
    )
}
