import { Socket, Server } from "socket.io";
import { handleChatEvents } from "./chatEvents";
import { handleNotiEvents } from "./notiEvents";

const activeUsers = new Set<string>();

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

        socket.on('userConnected', (userId: string) => {
            activeUsers.add(userId);
            socket.data.userId = userId;
            // console.log("Active users:", activeUsers);
            io.emit('activeUsers', Array.from(activeUsers));
        });

        socket.on('userDisconnected', (userId: string) => {
            activeUsers.delete(userId);
            io.emit('activeUsers', Array.from(activeUsers));
        });


        handleChatEvents(socket, io);
        handleNotiEvents(socket, io);

        socket.on("disconnect", () => {
            const userId = socket.data.userId
            if (userId) {
                activeUsers.delete(userId);
                console.log("Active users:", activeUsers);
                io.emit('activeUsers', Array.from(activeUsers));
            }
            console.log("Client disconnected:", socket.id);
        });
    });

    return io;
}

export default initSocket;
