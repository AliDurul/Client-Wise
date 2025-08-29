import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ChatBodyHeader from './ChatBodyHeader';
import ChatBodyFooter from './ChatBodyFooter';
import { selectSelectedChat } from '@/lib/features/chat/chatSlice';
import useSWR, { mutate } from 'swr';
import { getAllData } from '@/lib/features/shared/actionUtils';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Message } from '@/types';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatDate } from '@/lib/utility/functions';
import socket from '@/lib/sockets';
import { ChatBoxSmileIcon } from '@/icons/chat';
import { isChat } from '@/hooks/useChatDisplayInfo';


export default function ChatBody() {

    // hooks
    const selectedChat = useAppSelector(selectSelectedChat);
    const { userInfo } = useCurrentUser();

    const [typingUsers, setTypingUsers] = useState<{ id: string, profile_pic?: string, name?: string }[]>([]);

    const isExistChat = isChat(selectedChat);

    // constants
    const chatKey = isExistChat ? `chats/${selectedChat?._id}` : null;


    // api
    const { data: messages, isLoading } = useSWR<{ result: Message[] }>(
        chatKey,
        chatKey
            ? () => getAllData({ url: `${chatKey}/messages`, customQuery: { limit: 100 } })
            : null
    );

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


    useEffect(() => {
        // join chat room
        if (isExistChat && selectedChat?._id) {
            socket.emit('joinRoom', selectedChat._id);


            return () => {
                if (selectedChat?._id) {
                    socket.emit('leaveRoom', selectedChat._id);
                }
            };
        }
    }, [selectedChat]);

    useEffect(() => {
        // recieve new message
        const handleNewMessage = (newMessage: Message) => {
            console.log('new message received client:', newMessage.content);

            mutate(
                chatKey,
                (currentData: { result: Message[] } | undefined) => {
                    if (!currentData) return { result: [newMessage] };
                    return { result: [...currentData.result, newMessage] };
                },
                false // no fetch
            );
        };

        socket.on('newMessage', handleNewMessage);

        const handleTyping = ({ user }: { user: any }) => {
            // console.log('user is typing:', user.id);

            setTypingUsers(prev => {
                if (prev.find(u => u.id === user.id)) return prev;
                return [...prev, user];
            });
        };

        const handleStopTyping = ({ user }: { user: any }) => {
            // console.log('user stopped typing:', user.id);
            setTypingUsers(prev => prev.filter(u => u.id !== user.id));
        };

        socket.on('typing', handleTyping);
        socket.on('stopTyping', handleStopTyping);

        return () => {
            socket.off('newMessage', handleNewMessage);
            socket.off('typing', handleTyping);
            socket.off('stopTyping', handleStopTyping);
        };
    }, [socket, chatKey]);


    useEffect(() => {
        scrollToBottom()
    }, [typingUsers])


    const isNewDay = (currentMessage: Message, previousMessage: Message | undefined) => {
        if (!previousMessage) return true;
        const currentDate = new Date(currentMessage.createdAt).toDateString();
        const previousDate = new Date(previousMessage.createdAt).toDateString();
        return currentDate !== previousDate;
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };


    return (
        <div className="relative h-full">

            <ChatBodyHeader />

            <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]" />

            <PerfectScrollbar options={{ suppressScrollX: true }} className="chat-conversation-box relative h-full sm:h-[calc(100vh_-_300px)]">
                <div className="min-h-[400px] p-4 pb-[68px] sm:min-h-[300px] sm:pb-0">
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

                                        const isShowDate = isNewDay(message, messages.result[i - 1]);

                                        const showAvatar =
                                            i === messages.result.length - 1 || // Always show for last message
                                            i === 0 || // Always show for first message
                                            messages.result[i + 1]?.sender._id !== message.sender._id; // Show if next message is from different user

                                        const isPrevSameUser = i > 0 && messages.result[i - 1]?.sender._id === message.sender._id;

                                        return (
                                            <div key={i} className={isPrevSameUser ? 'mt-1' : 'mt-6'}>
                                                {isShowDate && (
                                                    <div className="m-6 mt-0 block ">
                                                        <h4 className="relative border-b  border-[#f4f4f4] text-center text-xs dark:border-gray-800 ">
                                                            <span className="relative top-2 bg-white px-3 dark:bg-black">{formatDate(message.createdAt.toString())}</span>
                                                        </h4>
                                                    </div>
                                                )}
                                                <div className={`flex items-center gap-3 ${isCurrentUser ? 'justify-end' : ''}`}>
                                                    <div className={`flex-none ${isCurrentUser ? 'order-2' : ''}`}>
                                                        {showAvatar ? (
                                                            isCurrentUser ? (
                                                                <Image
                                                                    width={36}
                                                                    height={36}
                                                                    src={userInfo?.profile_pic || ''}
                                                                    className="h-8 w-8 rounded-full object-cover"
                                                                    alt={userInfo?.first_name || ''}
                                                                />
                                                            ) : (
                                                                <Image
                                                                    width={36}
                                                                    height={36}
                                                                    src={message.sender.profile_pic || ''}
                                                                    className="h-8 w-8 rounded-full object-cover"
                                                                    alt={message.sender.full_name || ''}
                                                                />
                                                            )
                                                        ) : (
                                                            <div className='h-8 w-8' />
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`relative gap-x-2 rounded-md text-base max-w bg-black/10 p-2 dark:bg-gray-800 max-w-[25vw] 
                                                        ${isCurrentUser
                                                                ? '!bg-primary text-white ltr:rounded-br-none rtl:rounded-bl-none'
                                                                : 'ltr:rounded-bl-none rtl:rounded-br-none'}`}
                                                        >
                                                            <p className={`break-all ${message.content.length > 50 ? '' : 'pr-10'}`}>{message.content}</p>
                                                            <div className={`absolute bottom-0 right-1  text-xs text-white-dark ${isCurrentUser ? 'ltr:text-right ltr:text-white-light rtl:text-left' : ''}`}>
                                                                {formatTime(message.createdAt.toString())}
                                                            </div>
                                                        </div>
                                                        <div className={`${isCurrentUser ? 'hidden' : ''}`}>
                                                            <ChatBoxSmileIcon />
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
                        )
                    }

                    {typingUsers.length > 0 && (
                        <div className=" animate-pulse text-xs mt-5">
                            {typingUsers.map(u => u.name || 'Someone').join(', ')}
                            {typingUsers.length === 1 ? ' is typing...' : ' are typing...'}
                        </div>
                    )}
                </div>
            </PerfectScrollbar>

            <ChatBodyFooter isExistChat={isExistChat} selectedChatId={selectedChat?._id || ''} scrollToBottom={scrollToBottom} />

        </div>
    )
}
