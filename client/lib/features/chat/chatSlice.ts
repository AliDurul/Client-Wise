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
    activeUsers: string[];
}

const initialState: ChatSliceState = {
    chats: [],
    status: "idle",
    error: null,
    selectedChat: null,
    isShowChatMenu: false,
    isShowUserChat: false,
    groupModal: false,
    activeUsers: []
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
        setActiveUsers: reducer((state, action: PayloadAction<string[]>) => {
            state.activeUsers = action.payload;
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
        selectActiveUsers: (chat) => chat.activeUsers,
        selectChatStates: (chat) => chat,
        selectGroupModal: (chat) => chat.groupModal
    }
})

export const {
    setSelectedChat,
    setIsShowChatMenu,
    toggleChatMenu,
    setIsShowUserChat,
    setActiveUsers,
    selectChat,
    setGroupModal,
    setGroupCreate
} = chatSlice.actions;

export const {
    selectChats,
    selectSelectedChat,
    selectChatStatus,
    selectChatError,
    selectIsShowChatMenu,
    selectChatStates,
    selectIsShowUserChat,
    selectActiveUsers,
    selectGroupModal
} = chatSlice.selectors;