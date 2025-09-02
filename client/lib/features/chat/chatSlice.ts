import { createAppSlice } from "@/lib/createAppSlice"
import { PayloadAction } from "@reduxjs/toolkit";
import { Chat, PersonInfo } from "@/types";
import { set } from "zod";
import { act } from "react";

export interface ChatSliceState {
    chats: Chat[];
    status: "idle" | "loading" | "failed";
    error: string | null
    selectedChat: null | Chat | PersonInfo;
    isShowChatMenu: boolean;
    isShowUserChat: boolean;
    groupModal: boolean;
    activeChatUsers: string[];
    onlineUsers: string[];
    unreadChats: { [chatId: string]: number };
}

const initialState: ChatSliceState = {
    chats: [],
    status: "idle",
    error: null,
    selectedChat: null,
    isShowChatMenu: false,
    isShowUserChat: false,
    groupModal: false,
    activeChatUsers: [],
    onlineUsers: [],
    unreadChats: {}
}


export const chatSlice = createAppSlice({
    name: 'chat',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({
        // Entity management
        setSelectedChat: reducer((state, action: PayloadAction<Chat | PersonInfo | null>) => {
            state.status = 'idle';
            state.selectedChat = action.payload;
        }),
        selectChat: reducer((state, action: PayloadAction<Chat | PersonInfo>) => {
            state.status = 'idle';
            state.selectedChat = action.payload;
            state.isShowUserChat = true;
            state.isShowChatMenu = false;
        }),
        setGroupCreate: reducer((state) => {
            state.groupModal = true;
            state.selectedChat = null;
            state.isShowUserChat = false;
            state.isShowChatMenu = false;
        }),
        setActiveChatUsers: reducer((state, action: PayloadAction<string[]>) => {
            state.activeChatUsers = action.payload;
        }),

        setOnlineUsers: reducer((state, action: PayloadAction<string[]>) => {
            state.onlineUsers = action.payload;
        }),
        setUnreadChats: reducer((state, action: PayloadAction<string>) => {
            const chatId = action.payload;
            state.unreadChats[chatId] = (state.unreadChats[chatId] || 0) + 1;
        }),
        resetUnreadChat: reducer((state, action: PayloadAction<string>) => {
            const chatId = action.payload;
            state.unreadChats[chatId] = 0;
        }),
        // UI state management
        setIsShowChatMenu: reducer((state, action: PayloadAction<boolean>) => {
            state.isShowChatMenu = action.payload;
        }),
        toggleChatMenu: reducer((state) => {
            state.isShowChatMenu = !state.isShowChatMenu;
        }),
        setIsShowUserChat: reducer((state, action: PayloadAction<boolean>) => {
            state.isShowUserChat = action.payload;
        }),
        setGroupModal: reducer((state, action: PayloadAction<boolean>) => {
            state.groupModal = action.payload;
        })

    }),
    selectors: {
        selectChats: (chat) => chat.chats,
        selectSelectedChat: (chat) => chat.selectedChat,
        selectChatStatus: (chat) => chat.status,
        selectChatError: (chat) => chat.error,
        selectIsShowChatMenu: (chat) => chat.isShowChatMenu,
        selectIsShowUserChat: (chat) => chat.isShowUserChat,
        selectActiveChatUsers: (chat) => chat.activeChatUsers,
        selectChatStates: (chat) => chat,
        selectGroupModal: (chat) => chat.groupModal,
        selectOnlineUsers: (chat) => chat.onlineUsers,
        selectUnreadChats: (chat) => chat.unreadChats
    }
})

export const {
    setSelectedChat,
    setIsShowChatMenu,
    toggleChatMenu,
    setIsShowUserChat,
    setActiveChatUsers,
    selectChat,
    setGroupModal,
    setGroupCreate,
    setOnlineUsers,
    setUnreadChats,
    resetUnreadChat,
} = chatSlice.actions;

export const {
    selectChats,
    selectSelectedChat,
    selectChatStatus,
    selectChatError,
    selectIsShowChatMenu,
    selectChatStates,
    selectIsShowUserChat,
    selectActiveChatUsers,
    selectGroupModal,
    selectOnlineUsers,
    selectUnreadChats
} = chatSlice.selectors;