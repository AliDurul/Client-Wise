"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userStateSchema = new mongoose_1.default.Schema({
    waId: { type: String, required: true, unique: true },
    state: { type: String, default: '' }
}, { _id: false });
exports.default = mongoose_1.default.model('WpUserState', userStateSchema);
//# sourceMappingURL=wpUserState.model.js.map