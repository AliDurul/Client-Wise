"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const common_1 = require("../middlewares/common");
const express_rate_limit_1 = require("express-rate-limit");
const index_route_1 = __importDefault(require("../routes/index.route"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const common_2 = require("../utils/common");
//* Required packages  & configs & middewares
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.set('query parser', 'extended');
app.use(common_1.queryHandler);
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
// app.use(logger());
app.use(common_1.authenticate);
app.use('/api/v1', (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes in ms
    max: 100,
    message: 'Too many requests, please try again later.'
}));
app.use((0, compression_1.default)({
    threshold: 1024,
    level: 6,
    filter: common_2.shouldCompress,
}));
//* Routes
app.all('/', (req, res) => {
    res.send('Welcome to the API!');
});
// Static files:
app.use('/uploads', express_1.default.static('uploads'));
// API routes:
app.use("/api", index_route_1.default);
app.use(common_1.notFound).use(common_1.errorHandler); // Error handling & 404 middlewares
exports.default = app;
//# sourceMappingURL=express.js.map