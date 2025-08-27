const { Server } = require("socket.io");

function initSocket(server: any) {

    const io = new Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);
        // console.log("Active users:", io.engine.clientsCount);


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


        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    return io;
}

export default initSocket;
