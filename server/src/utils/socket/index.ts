import { Socket, Server } from "socket.io";
import { handleChatEvents } from "./chatEvents";
import { handleNotiEvents } from "./notiEvents";

export const activeChatUsers = new Set<string>();
export const onlineUsers = new Set<string>();

function initSocket(server: any) {
    const io = new Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket: Socket) => {
        // console.log("New user connected:", socket.id);

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
            // console.log("Client disconnected:", socket.id);
        });
    });

    return io;
}

export default initSocket;
