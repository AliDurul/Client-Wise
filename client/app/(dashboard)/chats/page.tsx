'use client';
import ChatBody from '@/components/dashboard/chats/ChatBody';
import ChatBodyPlaceHolder from '@/components/dashboard/chats/ChatBodyPlaceHolder';
import ChatSidebar from '@/components/dashboard/chats/ChatSidebar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { selectIsShowChatMenu, selectIsShowUserChat, setActiveChatUsers, setIsShowChatMenu } from '@/lib/features/chat/chatSlice';
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

    const handleActiveUsers = (activeUsers: string[]) => {
        dispatch(setActiveChatUsers(activeUsers));
        console.log('this worked');
    };

    useEffect(() => {
        if (!userInfo?.id || hasConnected.current) return;

        socket.emit('userChatActive', userInfo.id);
        hasConnected.current = true;

        socket.on('activeChatUsers', handleActiveUsers);

        return () => {
            socket.emit('userChatInactive', userInfo.id);
            setTimeout(() => {
                socket.off('activeChatUsers', handleActiveUsers);
            }, 300);
            hasConnected.current = false;
        };
    }, [userInfo?.id, dispatch, socket]);

    return (
        // ${isShowChatMenu ? 'min-h-[999px]' : ''}
        <div className={`relative flex gap-5 h-[calc(100vh_-_125px)] sm:min-h-0 `}>

            <ChatSidebar />

            <div className={`absolute z-[5] hidden h-[calc(100vh_-_125px)] w-full rounded-md bg-black/60 ${isShowChatMenu ? '!block xl:!hidden' : ''}`} onClick={() => dispatch(setIsShowChatMenu(false))} />

            <div className="panel flex-1 p-0 h-[calc(100vh_-_120px)]">

                {isShowUserChat ? <ChatBody /> : <ChatBodyPlaceHolder />}

            </div>

        </div>
    )
}
