import socket from "@/lib/sockets";
import { useEffect } from "react";

export const useSocket = () => {

    useEffect(() => {
        if (!socket.connected) {
            console.log('Socket not connected, connecting...');
            socket.connect();
        }

        // registerSocketEvents(store);

        return () => {
            socket.disconnect();
        };
    }, []);

    return null;
};