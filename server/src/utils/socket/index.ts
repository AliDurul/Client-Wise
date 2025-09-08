import { Socket, Server } from "socket.io";
import { handleChatEvents } from "./chatEvents";
import { handleNotiEvents } from "./notiEvents";
import { CustomError } from "../../utils/common";

export const activeChatUsers = new Set<string>();
export const onlineUsers = new Set<string>();
let ioInstance: Server | null = null;

function initSocket(server: any) {
    const io = new Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    ioInstance = io; // for socket instance

    io.on("connection", (socket: Socket) => {

        socket.on('userOnline', (userId: string) => {
            onlineUsers.add(userId);
            socket.data.userId = userId;
            io.emit('onlineUsers', Array.from(onlineUsers));
        });

        socket.on('userChatActive', (userId: string) => {
            activeChatUsers.add(userId);
            io.emit('activeChatUsers', Array.from(activeChatUsers));
        });

        socket.on('userChatInactive', (userId: string) => {
            activeChatUsers.delete(userId);
            io.emit('activeChatUsers', Array.from(activeChatUsers));
        });


        handleChatEvents(socket, io);
        handleNotiEvents(socket, io);

        socket.on("disconnect", () => {
            const userId = socket.data.userId
            if (userId) {
                onlineUsers.delete(userId);
                activeChatUsers.delete(userId);
                io.emit('onlineUsers', Array.from(onlineUsers));
                io.emit('activeChatUsers', Array.from(activeChatUsers));
            }
        });
    });

    return io;
};

export function getSocketInstance() {
    if (!ioInstance) throw new CustomError('Socket.IO not initialized', 500, true);
    return ioInstance;
};

export default initSocket;
