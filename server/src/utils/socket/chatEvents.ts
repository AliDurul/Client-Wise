import { Socket, Server } from "socket.io";

export function handleChatEvents(socket: Socket, io: Server) {
    socket.on('joinRoom', (chatId: string) => {
        socket.join(chatId)
        // console.log(`Socket ${socket.id} joined room ${chatId}`);
    });

    socket.on('leaveRoom', (chatId: string) => {
        socket.leave(chatId)
        // console.log(`Socket ${socket.id} left room ${chatId}`);
    });

    socket.on('newMessage', (message) => {
        const chatId = message.chat;
        // console.log('new message received backend:', message.content);
        socket.to(chatId).emit('newMessage', message);
    });

    socket.on('typing', ({ chatId, user }) => {
        // console.log('User is typing: ', user.id, ' for chat:', chatId);
        socket.to(chatId).emit('typing', { user });
    });

    socket.on('stopTyping', ({ chatId, user }) => {
        // console.log('someone has stopped typing in chat', chatId);
        socket.to(chatId).emit('stopTyping', { user });
    });

}