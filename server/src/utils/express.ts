import express from "express";
import { authenticate, errorHandler, logger, notFound, queryHandler } from "../middlewares/common";
import { rateLimit } from 'express-rate-limit'
import api from '../routes/index.route'
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { shouldCompress } from "../utils/common";
import mongoose from "mongoose";
import { connectDB } from "../configs/db";

//* Required packages  & configs & middewares
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.set('query parser', 'extended');
app.use(queryHandler);
app.use(helmet());
app.use(cors());
// app.use(logger());
app.use(authenticate);
app.use('/api/v1', rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes in ms
    max: 100,
    message: 'Too many requests, please try again later.'
}));
app.use(compression({
    threshold: 1024,
    level: 6,
    filter: shouldCompress,
}
));


//* Routes

app.all('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Warm-up / health check: wakes the server and pings MongoDB (used by the login page).
app.get('/api/health', async (_req, res) => {
    const startedAt = Date.now();
    try {
        await connectDB();
        await mongoose.connection.db?.admin().ping();
        res.json({ success: true, db: 'up', ms: Date.now() - startedAt });
    } catch {
        res.status(503).json({ success: false, db: 'down', ms: Date.now() - startedAt });
    }
});

// Static files:
app.use('/uploads', express.static('uploads'));

// API routes:
app.use("/api", api);


app.use(notFound).use(errorHandler); // Error handling & 404 middlewares

export default app;
