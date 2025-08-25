'use client';
import ChatBody from '@/components/dashboard/chats/ChatBody';
import ChatBodyPlaceHolder from '@/components/dashboard/chats/ChatBodyPlaceHolder';
import ChatSidebar from '@/components/dashboard/chats/ChatSidebar';
import Dropdown from '@/components/layout/Dropdown';
import { selectIsShowChatMenu, selectIsShowUserChat, setIsShowChatMenu, setIsShowUserChat, setSelectedChat } from '@/lib/features/chat/chatSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Chat } from '@/types';
import React, { useEffect, useState } from 'react'




export default function page() {


    const isShowChatMenu = useAppSelector(selectIsShowChatMenu);
    const isShowUserChat = useAppSelector(selectIsShowUserChat);


    return (
        <div className={`relative flex h-full gap-5 sm:h-[calc(100vh_-_150px)] sm:min-h-0 ${isShowChatMenu ? 'min-h-[999px]' : ''}`}>

            <ChatSidebar />

            <div className={`absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${isShowChatMenu ? '!block xl:!hidden' : ''}`} onClick={() => setIsShowChatMenu(!isShowChatMenu)} />


            <div className="panel flex-1 p-0">

                {isShowUserChat ? <ChatBody /> : <ChatBodyPlaceHolder />}

            </div>

        </div>
    )
}
