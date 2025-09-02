import socket from "@/lib/sockets";
import { useEffect, useRef } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { useAppDispatch } from "@/lib/hooks";
import { setOnlineUsers } from "@/lib/features/chat/chatSlice";

export const useSocket = () => {

    const dispatch = useAppDispatch();
    const { userInfo } = useCurrentUser();
    const hasConnected = useRef(false);

    const handleOnlineUsers = (onlineUsers: string[]) => {
        dispatch(setOnlineUsers(onlineUsers));
    };

    useEffect(() => {
        if (!hasConnected.current) {
            if (!socket.connected) {
                console.log('Socket not connected, connecting...');
                socket.connect();
            }
            hasConnected.current = true;
        }

        if (userInfo?.id) {
            socket.emit('userOnline', userInfo.id);
        }

        socket.on('onlineUsers', handleOnlineUsers);

        return () => {
            socket.off('onlineUsers', handleOnlineUsers);
            socket.disconnect();
            hasConnected.current = false;
        };
    }, [userInfo?.id]);

    return null;
};