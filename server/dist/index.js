"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const db_1 = require("./configs/db");
const env_1 = __importDefault(require("./configs/env"));
const express_1 = __importDefault(require("./utils/express"));
const socket_1 = __importDefault(require("./utils/socket"));
// server
const server = (0, http_1.createServer)(express_1.default);
const PORT = env_1.default.PORT || 8000;
// Initialize WebSocket
(0, socket_1.default)(server);
// Server and DB connection
async function startServer() {
    try {
        await (0, db_1.connectDB)();
        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
        process.on('SIGINT', async () => {
            await (0, db_1.disconnectDB)();
            process.exit(0);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
}
;
startServer();
//! seeding
// initializeData();
//# sourceMappingURL=index.js.map