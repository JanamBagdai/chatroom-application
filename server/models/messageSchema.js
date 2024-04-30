const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: {type: String, required: true},
    timestamp: {type: Date, default: Date.now},
    sender_id: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    sender_name: {type: String, required: true},
    upvotes: {type: Number, default: 0},
    downvotes: {type: Number, default: 0},
});

const Message = mongoose.model('messages', messageSchema);

module.exports = {
    Message
};