const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {
  generateMessage,
  generateLocationMessage
} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('새로운 유저가 입장했습니다.');

  socket.emit('newMessage', generateMessage('운영자', '안녕? 노답방 실시간 채팅방이야'));

  socket.broadcast.emit('newMessage', generateMessage('운영자', '새로운 노답유저 접속'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.');
  });
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude,coords.longitude))
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('newMessage', generateMessage('운영자', '노답유저 나감'));
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
