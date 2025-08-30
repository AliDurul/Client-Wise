"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const chatEvents_1 = require("./chatEvents");
const notiEvents_1 = require("./notiEvents");
const activeUsers = new Set();
function initSocket(server) {
    const io = new socket_io_1.Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    io.on("connection", (socket) => {
        // console.log("New user connected:", socket.id);
        socket.on('userConnected', (userId) => {
            activeUsers.add(userId);
            socket.data.userId = userId;
            // console.log("Active users:", activeUsers);
            io.emit('activeUsers', Array.from(activeUsers));
        });
        socket.on('userDisconnected', (userId) => {
            activeUsers.delete(userId);
            io.emit('activeUsers', Array.from(activeUsers));
        });
        (0, chatEvents_1.handleChatEvents)(socket, io);
        (0, notiEvents_1.handleNotiEvents)(socket, io);
        socket.on("disconnect", () => {
            const userId = socket.data.userId;
            if (userId) {
                activeUsers.delete(userId);
                // console.log("Active users:", activeUsers);
                io.emit('activeUsers', Array.from(activeUsers));
            }
            // console.log("Client disconnected:", socket.id);
        });
    });
    return io;
}
exports.default = initSocket;
//# sourceMappingURL=index.js.map