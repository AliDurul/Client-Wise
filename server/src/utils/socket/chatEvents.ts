import { Socket, Server } from "socket.io";
import { activeChatUsers, onlineUsers } from "./index";

export function handleChatEvents(socket: Socket, io: Server) {
    socket.on('joinRoom', (chatId: string) => {
        socket.join(chatId)
    });

    socket.on('leaveRoom', (chatId: string) => {
        socket.leave(chatId)
    });

    socket.on('newMessage', (message) => {
        const chatId = message.chat;
        const chatUsers: string[] = message.users.filter(u => u !== message.sender._id);
        const roomSockets = io.sockets.adapter.rooms.get(chatId) || new Set();

        chatUsers?.forEach(userId => {
            const isOnline = onlineUsers.has(userId);
            const isActive = activeChatUsers.has(userId);
            const isInRoom = Array.from(roomSockets).some(socketId => io.sockets.sockets.get(socketId)?.data.userId === userId);
            // console.log(`User ${userId} - Online: ${isOnline}, Active: ${isActive}, InRoom: ${isInRoom}`);
            // Only notify if user is online and (not active or not in room)
            if (isOnline && (!isActive || !isInRoom)) {
                for (const [socketId, sock] of io.sockets.sockets) {
                    if (sock.data.userId === userId) {
                        io.to(socketId).emit('newMsgNotification', message);
                    }
                }
            }
        });

        socket.to(chatId).emit('newMessage', message);
    });

    socket.on('typing', ({ chatId, user }) => {
        socket.to(chatId).emit('typing', { user });
    });

    socket.on('stopTyping', ({ chatId, user }) => {
        socket.to(chatId).emit('stopTyping', { user });
    });

}