"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNotiEvents = handleNotiEvents;
function handleNotiEvents(socket, io) {
    socket.on('newNotification', (notification) => {
        // console.log('new notification received backend:', notification);
        io.emit('newNotification', notification);
    });
}
//# sourceMappingURL=notiEvents.js.map