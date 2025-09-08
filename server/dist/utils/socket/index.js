"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlineUsers = exports.activeChatUsers = void 0;
exports.getSocketInstance = getSocketInstance;
const socket_io_1 = require("socket.io");
const chatEvents_1 = require("./chatEvents");
const notiEvents_1 = require("./notiEvents");
const common_1 = require("../../utils/common");
exports.activeChatUsers = new Set();
exports.onlineUsers = new Set();
let ioInstance = null;
function initSocket(server) {
    const io = new socket_io_1.Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    ioInstance = io; // for socket instance
    io.on("connection", (socket) => {
        socket.on('userOnline', (userId) => {
            exports.onlineUsers.add(userId);
            socket.data.userId = userId;
            io.emit('onlineUsers', Array.from(exports.onlineUsers));
        });
        socket.on('userChatActive', (userId) => {
            exports.activeChatUsers.add(userId);
            io.emit('activeChatUsers', Array.from(exports.activeChatUsers));
        });
        socket.on('userChatInactive', (userId) => {
            exports.activeChatUsers.delete(userId);
            io.emit('activeChatUsers', Array.from(exports.activeChatUsers));
        });
        (0, chatEvents_1.handleChatEvents)(socket, io);
        (0, notiEvents_1.handleNotiEvents)(socket, io);
        socket.on("disconnect", () => {
            const userId = socket.data.userId;
            if (userId) {
                exports.onlineUsers.delete(userId);
                exports.activeChatUsers.delete(userId);
                io.emit('onlineUsers', Array.from(exports.onlineUsers));
                io.emit('activeChatUsers', Array.from(exports.activeChatUsers));
            }
        });
    });
    return io;
}
;
function getSocketInstance() {
    if (!ioInstance)
        throw new common_1.CustomError('Socket.IO not initialized', 500, true);
    return ioInstance;
}
;
exports.default = initSocket;
//# sourceMappingURL=index.js.map