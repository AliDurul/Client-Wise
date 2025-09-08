import mongoose from 'mongoose';

const userStateSchema = new mongoose.Schema({
    wpId: { type: String, required: true, unique: true },
    state: { type: String, default: '' }
}, { _id: false, collection:'wp-user-states' });

export default mongoose.model('WpUserState', userStateSchema);