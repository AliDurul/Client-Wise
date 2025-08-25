import { createAppSlice } from "@/lib/createAppSlice"
import { PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "@/types";

export interface ChatSliceState {
    chats: Chat[];
    status: "idle" | "loading" | "failed";
    error: string | null
    selectedChat: null | Chat;
    isShowChatMenu: boolean;
    isShowUserChat: boolean;
}

const initialState: ChatSliceState = {
    chats: [],
    status: "idle",
    error: null,
    selectedChat: null,
    isShowChatMenu: false,
    isShowUserChat: false
}


export const chatSlice = createAppSlice({
    name: 'chat',
    initialState,
    reducers: ({ reducer, asyncThunk }) => ({
        // Entity management
        setSelectedChat: reducer((state, action: PayloadAction<Chat>) => {
            state.status = 'idle';
            state.selectedChat = action.payload;
        }),
        clearSelectedChat: reducer((state) => {
            state.selectedChat = null;
        }),

        // Collection management
        setChats: reducer((state, action: PayloadAction<Chat[]>) => {
            state.status = 'idle';
            state.chats = action.payload;
        }),
        updateChats: reducer((state, action: PayloadAction<Chat>) => {
            state.status = 'idle';
            if (!state.chats.some(chat => chat._id === action.payload._id)) {
                state.chats.push(action.payload)
            }
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
        selectChatStates: (chat) => chat
    }
})

export const {
    setSelectedChat,
    clearSelectedChat,
    setChats,
    setIsShowChatMenu,
    toggleChatMenu,
    updateChats,
    setIsShowUserChat
} = chatSlice.actions;

export const {
    selectChats,
    selectSelectedChat,
    selectChatStatus,
    selectChatError,
    selectIsShowChatMenu,
    selectChatStates,
    selectIsShowUserChat
} = chatSlice.selectors;