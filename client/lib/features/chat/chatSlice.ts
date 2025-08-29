import { createAppSlice } from "@/lib/createAppSlice"
import { PayloadAction } from "@reduxjs/toolkit";
import { Chat, PersonInfo } from "@/types";

export interface ChatSliceState {
    chats: Chat[];
    status: "idle" | "loading" | "failed";
    error: string | null
    selectedChat: null | Chat | PersonInfo;
    isShowChatMenu: boolean;
    isShowUserChat: boolean;
    activeUsers: string[];
}

const initialState: ChatSliceState = {
    chats: [],
    status: "idle",
    error: null,
    selectedChat: null,
    isShowChatMenu: false,
    isShowUserChat: false,
    activeUsers: []
}


export const chatSlice = createAppSlice({
    name: 'chat',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({
        // Entity management
        setSelectedChat: reducer((state, action: PayloadAction<Chat | PersonInfo>) => {
            state.status = 'idle';
            state.selectedChat = action.payload;
        }),

        selectChat: reducer((state, action: PayloadAction<Chat | PersonInfo>) => {
            state.status = 'idle';
            state.selectedChat = action.payload;
            state.isShowUserChat = true;
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

    }),
    selectors: {
        selectChats: (chat) => chat.chats,
        selectSelectedChat: (chat) => chat.selectedChat,
        selectChatStatus: (chat) => chat.status,
        selectChatError: (chat) => chat.error,
        selectIsShowChatMenu: (chat) => chat.isShowChatMenu,
        selectIsShowUserChat: (chat) => chat.isShowUserChat,
        selectActiveUsers: (chat) => chat.activeUsers,
        selectChatStates: (chat) => chat
    }
})

export const {
    setSelectedChat,
    setIsShowChatMenu,
    toggleChatMenu,
    setIsShowUserChat,
    setActiveUsers,
    selectChat
} = chatSlice.actions;

export const {
    selectChats,
    selectSelectedChat,
    selectChatStatus,
    selectChatError,
    selectIsShowChatMenu,
    selectChatStates,
    selectIsShowUserChat,
    selectActiveUsers
} = chatSlice.selectors;