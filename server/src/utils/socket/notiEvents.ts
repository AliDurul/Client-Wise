import { Socket, Server } from "socket.io";

export function handleNotiEvents(socket: Socket, io: Server) {
    socket.on('newNotification', (notification) => {
        // console.log('new notification received backend:', notification);
        io.emit('newNotification', notification);
    });
}