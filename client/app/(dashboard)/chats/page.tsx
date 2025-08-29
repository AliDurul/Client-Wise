'use client';
import ChatBody from '@/components/dashboard/chats/ChatBody';
import ChatBodyPlaceHolder from '@/components/dashboard/chats/ChatBodyPlaceHolder';
import ChatSidebar from '@/components/dashboard/chats/ChatSidebar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { selectIsShowChatMenu, selectIsShowUserChat, setActiveUsers, setIsShowChatMenu } from '@/lib/features/chat/chatSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import socket from '@/lib/sockets';
import { PersonInfo } from '@/types';
import { useEffect, useRef } from 'react';


export default function page() {

    // hooks
    const hasConnected = useRef(false);
    const { userInfo } = useCurrentUser()
    const dispatch = useAppDispatch();
    const isShowChatMenu = useAppSelector(selectIsShowChatMenu);
    const isShowUserChat = useAppSelector(selectIsShowUserChat);

    useEffect(() => {
        if (!userInfo?.id || hasConnected.current) return;

        socket.emit('userConnected', userInfo.id);
        hasConnected.current = true;

        const handleActiveUsers = (activeUsers: string[]) => {
            dispatch(setActiveUsers(activeUsers));
        };

        socket.on('activeUsers', handleActiveUsers);

        return () => {
            socket.off('activeUsers', handleActiveUsers);
            socket.emit('userDisconnected', userInfo.id);
            hasConnected.current = false;
        };
    }, [userInfo?.id, dispatch]);

    return (
        <div className={`relative flex h-full gap-5 sm:h-[calc(100vh_-_120px)] sm:min-h-0 ${isShowChatMenu ? 'min-h-[999px]' : ''}`}>

            <ChatSidebar />

            <div className={`absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${isShowChatMenu ? '!block xl:!hidden' : ''}`} onClick={() => setIsShowChatMenu(!isShowChatMenu)} />

            <div className="panel flex-1 p-0">

                {isShowUserChat ? <ChatBody /> : <ChatBodyPlaceHolder />}

            </div>

        </div>
    )
}
