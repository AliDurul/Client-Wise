import { Socket, Server } from "socket.io";

export function handleNotiEvents(socket: Socket, io: Server) {
    socket.on('newNotification', (notification) => {
        io.emit('newNotification', notification);
    });
}