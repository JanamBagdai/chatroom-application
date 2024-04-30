const express = require('express');
const router = express.Router();
const Chat = require('../models/chatSchema');
const Message = require('../models/chatSchema');


router.post('/start_chat', async function(req, res, next) {
    const {user} = req.body;
    const chat = new Chat({user});
    await chat.save();
    res.send({"_id": chat.id})
});

router.get('/chats/:user', async function(req, res, next) {
    const {user} = req.params;
    const chats = await Chat.find({user});
    res.send(chats)
});

router.get('/messages/:chat_id', async function(req, res, next) {
    const {chat_id} = req.params;
    const messages = await Message.find({chat_id});
    const chat = await Chat.findById(chat_id);
    res.send({messages : messages})
});

module.exports = router;
