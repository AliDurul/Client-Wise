const { Server } = require("socket.io");

function initSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });


    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        socket.on("chat message", (msg) => {
            console.log("message:", msg);
            io.emit("chat message", msg);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    return io;
}

export default initSocket;
