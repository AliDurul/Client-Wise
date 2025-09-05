import mongoose from 'mongoose';

const userStateSchema = new mongoose.Schema({
    waId: { type: String, required: true, unique: true },
    state: { type: String, default: '' }
}, { _id: false });

export default mongoose.model('WpUserState', userStateSchema);