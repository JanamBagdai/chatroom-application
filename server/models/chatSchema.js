const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true // Makes this field mandatory
    }
}, { timestamps: true });


const Chat = mongoose.model('chats', chatSchema);

module.exports = {
    Chat
};