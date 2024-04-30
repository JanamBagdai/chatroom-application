//import modules
const { Message } = require('./models/messageSchema');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config();
//app

const app = express()

//db
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB Connected')).catch((err)=>console.log('db connection error',err))

app.use(morgan('dev'));
app.use(cors({origin:true, credentials:true }));
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//routes
const testRoutes = require('./routes/routes');
app.use("/", testRoutes);
//port
const port = process.env.PORT || 8080

let server2 = app.listen(4000);
const io = require('socket.io')(server2,{
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('get_previous_messages', async () => {
        try {
            const previousMessages = await Message.find().sort({ timestamp: 1 });
            const formattedMessages = previousMessages.map((message) => ({
                ulid: message._id,
                user: message.sender_name,
                message: message.content,
                upvote: message.upvotes,
                downvote: message.downvotes,
            }));
            io.emit('previous_messages', formattedMessages);
        } catch (error) {
            console.error('Error fetching previous messages:', error);
        }
    });

    socket.on('data', async (data) => {
        try {
            const { message, user } = data;
            console.log(user);
            if (!message || !user) {
                io.emit('data', { error: 'Invalid message or user!' });
                return;
            }
            const newMessage = new Message({ content: message, sender_name: user.name , sender_id: user.id});
            await newMessage.save();
            io.emit('data', {
                data,
                id: socket.id,
                ulid: newMessage._id,
                user: user.name,
                message,
                upvote: newMessage.upvotes,
                downvote: newMessage.downvotes,
            });
        } catch (error) {
            console.error('Error handling message:', error);
        }
    });

    socket.on('upvote', async (data) => {
        try {
            const { msgulid } = data;
            const message = await Message.findById(msgulid);
            if (message) {
                message.upvotes += 1;
                await message.save();
                io.emit('upvote', { upvote: message.upvotes, ulid: message._id });
            }
        } catch (error) {
            console.error('Error handling upvote:', error);
        }
    });

    socket.on('downvote', async (data) => {
        try {
            const { msgulid } = data;
            const message = await Message.findById(msgulid);
            if (message) {
                message.downvotes += 1;
                await message.save();
                io.emit('downvote', { downvote: message.downvotes, ulid: message._id });
            }
        } catch (error) {
            console.error('Error handling downvote:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

const server = app.listen(port, () => console.log('Server is running on port '+ port));