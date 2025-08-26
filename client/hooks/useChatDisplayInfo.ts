import { Chat, PersonInfo } from "@/types";

export function useChatDisplayInfo(chat: Chat | null, currentUserId?: string) {
    let displayName = chat?.chat_name || 'Group Chat';
    let displayPic = chat?.chat_pic || '/assets/images/profile-pic.png';
    let otherUser: PersonInfo | undefined;

    if (!chat?.is_group && chat?.users && currentUserId) {
        otherUser = chat.users.find((member: PersonInfo) => member._id !== currentUserId);
        if (otherUser) {
            displayName = otherUser.full_name;
            displayPic = otherUser.profile_pic || '/assets/images/profile-pic.png';
        }
    }

    return { displayName, displayPic, otherUser };
}