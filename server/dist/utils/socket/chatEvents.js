"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChatEvents = handleChatEvents;
const index_1 = require("./index");
function handleChatEvents(socket, io) {
    socket.on('joinRoom', (chatId) => {
        socket.join(chatId);
    });
    socket.on('leaveRoom', (chatId) => {
        socket.leave(chatId);
    });
    socket.on('newMessage', (message) => {
        const chatId = message.chat;
        const chatUsers = message.users.filter(u => u !== message.sender._id);
        const roomSockets = io.sockets.adapter.rooms.get(chatId) || new Set();
        chatUsers?.forEach(userId => {
            const isOnline = index_1.onlineUsers.has(userId);
            const isActive = index_1.activeChatUsers.has(userId);
            const isInRoom = Array.from(roomSockets).some(socketId => io.sockets.sockets.get(socketId)?.data.userId === userId);
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
//# sourceMappingURL=chatEvents.js.map