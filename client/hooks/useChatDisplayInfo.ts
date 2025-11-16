import { selectSelectedChat } from "@/lib/features/chat/chatSlice";
import { useAppSelector } from "@/lib/hooks";
import { Chat, PersonInfo } from "@/types";
import { useCurrentUser } from "./useCurrentUser";

export function isChat(obj: any): obj is Chat {
    return obj && typeof obj.is_group === 'boolean';
}


export function useChatDisplayInfo(chatProp?: Chat) {
    const { userInfo } = useCurrentUser();
    const selectedChat = useAppSelector(selectSelectedChat);
    const chat = chatProp || selectedChat;

    if (!isChat(chat)) {
        // Handle error or return defaults
        return {
            displayName: chat?.full_name || 'Unknown User',
            displayPic: chat?.profile_pic || '/assets/images/profile-pic.png',
            otherUser: undefined,
            otherUserId: '',
            isGroup: false
        };
    }

    const isSourceWp = chat.source === 'whatsapp';
    const isGroup = chat.is_group;
    const subTitle = isSourceWp ? (chat.customer?.full_name || 'unknown name') : ''
    let displayName = isSourceWp ? 'Whatssap Chat' : (chat?.chat_name || 'Group Chat');
    let displayPic = isSourceWp ? '/assets/images/wp-logo.png' : (chat?.chat_pic || '/assets/images/profile-pic.png');
    let otherUser: PersonInfo | undefined;
    let otherUserId: string = '';
    let chatId: string = '';
    let role: string = '';

    if (!chat?.is_group && chat?.users && userInfo?.id) {
        otherUser = chat.users.find((member: PersonInfo) => member._id !== userInfo.id);

        if (otherUser) {
            role = otherUser.role || '';
            displayName = otherUser.full_name;
            displayPic = (otherUser.profile_pic || '/assets/images/profile-pic.png');
            otherUserId = otherUser._id;
            chatId = chat?._id || '';
        }
    }

    return { displayName, displayPic, otherUser, otherUserId, isGroup, chatId, subTitle, role };
}