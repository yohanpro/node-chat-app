const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New users joined'));
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage',generateMessage(message.from,message.text))

        // socket.broadcast.emit('createMessage', {
        //     from: message.from,
        //     text:message.text,
        //     createAt: new Date().getTime()
        // })
    });
    socket.on('disconnect', () => {
        console.log('Client Disconnected');
    })
})
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
