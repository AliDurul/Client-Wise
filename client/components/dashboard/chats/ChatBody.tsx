import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ChatBodyHeader from './ChatBodyHeader';
import ChatBodyFooter from './ChatBodyFooter';
import { selectSelectedChat } from '@/lib/features/chat/chatSlice';
import useSWR from 'swr';
import { getAllData } from '@/lib/features/shared/actionUtils';
import { useChatDisplayInfo } from '@/hooks/useChatDisplayInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Message } from '@/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatDate } from '@/lib/utility/functions';


export default function ChatBody() {

    // hooks
    const selectedChat = useAppSelector(selectSelectedChat);
    const { userInfo } = useCurrentUser();
    const { displayName, displayPic } = useChatDisplayInfo(selectedChat, userInfo?.id);

    // states
    // const [messages, setMessages] = useState<Message[]>([]);
console.log('body', `chats/${selectedChat?._id}`);
    // api
    const { data:messages, isLoading } = useSWR<{ result: Message[] }>(`chats/${selectedChat?._id}`, () => getAllData({ url: `chats/${selectedChat?._id}/messages`, customQuery: { limit: 100 } }), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        // onSuccess: (data) => {
        //     setMessages(data?.result);
        // }
    });

    // functions

    const scrollToBottom = () => {
        setTimeout(() => {
            const element: any = document.querySelector('.chat-conversation-box');
            element.behavior = 'smooth';
            element.scrollTop = element.scrollHeight;
        });
    };


    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const isNewDay = (currentMessage: Message, previousMessage: Message | undefined) => {
        if (!previousMessage) return true;
        const currentDate = new Date(currentMessage.createdAt).toDateString();
        const previousDate = new Date(previousMessage.createdAt).toDateString();
        return currentDate !== previousDate;
    };


    return (
        <div className="relative h-full">

            <ChatBodyHeader displayName={displayName} displayPic={displayPic} />

            <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]" />

            <PerfectScrollbar options={{ suppressScrollX: true }} className="chat-conversation-box relative h-full sm:h-[calc(100vh_-_300px)]">
                <div className="min-h-[400px] space-y-5 p-4 pb-[68px] sm:min-h-[300px] sm:pb-0">
                    <div className="m-6 mt-0 block">
                        <h4 className="relative border-b border-[#f4f4f4] text-center text-xs dark:border-gray-800">
                            <span className="relative top-2 bg-white px-3 dark:bg-black">{'Today, ' + selectedChat?.updatedAt}</span>
                        </h4>
                    </div>
                    {
                        isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <p>Loading messages...</p>
                            </div>
                        ) : messages?.result && messages?.result ? (
                            <>
                                {
                                    messages?.result?.map((message: Message, i: number) => {

                                        let isCurrentUser = userInfo?.id === message.sender._id;

                                        return (
                                            <div key={i}>
                                                <div className={`flex items-start gap-3 ${isCurrentUser ? 'justify-end' : ''}`}>
                                                    <div className={`flex-none ${isCurrentUser ? 'order-2' : ''}`}>

                                                        {isCurrentUser ? (
                                                            <Image width={40} height={40} src={userInfo?.profile_pic || ''} className="h-10 w-10 rounded-full object-cover" alt={userInfo?.first_name || ''} />
                                                        ) : (
                                                            <Image width={40} height={40} src={message.sender.profile_pic || ''} className="h-10 w-10 rounded-full object-cover" alt={message.sender.full_name} />
                                                        )}

                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`rounded-md bg-black/10 p-4 py-2 dark:bg-gray-800 ${isCurrentUser
                                                                    ? '!bg-primary text-white ltr:rounded-br-none rtl:rounded-bl-none'
                                                                    : 'ltr:rounded-bl-none rtl:rounded-br-none'
                                                                    }`}
                                                            >
                                                                {message.content}
                                                            </div>
                                                            <div className={`${isCurrentUser ? 'hidden' : ''}`}>
                                                                <svg
                                                                    className="h-5 w-5 text-black/70 hover:!text-primary dark:text-white/70"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                                                    <path
                                                                        d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
                                                                        stroke="currentColor"
                                                                        strokeWidth="1.5"
                                                                        strokeLinecap="round"
                                                                    />
                                                                    <path
                                                                        d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"
                                                                        fill="currentColor"
                                                                    />
                                                                    <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="currentColor" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className={`text-xs text-white-dark ${isCurrentUser ? 'ltr:text-right rtl:text-left' : ''}`}>
                                                            {message.createdAt ? formatDate(message.createdAt) : '5h ago'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p>No messages found.</p>
                            </div>
                        )}
                </div>
            </PerfectScrollbar>

            <ChatBodyFooter selectedChatId={selectedChat?._id} scrollToBottom={scrollToBottom} />

        </div>
    )
}
