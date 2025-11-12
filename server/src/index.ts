import { createServer } from "http";
import { connectDB, disconnectDB } from "./configs/db";
import env from "./configs/env";
import app from './utils/express';
import initSocket from './utils/socket';
import { initializeData } from "./utils/seeds";
import { initializeData2 } from "./utils/seed2";

// server
const server = createServer(app);
const PORT = env.PORT || 8000;

// Initialize WebSocket
initSocket(server);

// Server and DB connection
async function startServer() {
  try {
    await connectDB();

    server.listen(PORT, () => {
      // initializeData2();
      console.log(`Server running on http://localhost:${PORT}`);
    });

    process.on('SIGINT', async () => {
      await disconnectDB();
      process.exit(0);
    });

  } catch (error: any) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};
startServer();


//! seeding
// initializeData();
