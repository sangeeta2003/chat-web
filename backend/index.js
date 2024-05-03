const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors  = require('cors')   
const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
    cors:{
        origin:"*"
    }
});
app.use(cors())
const users = {};

io.on('connection', (socket) => {
  
  socket.on('new-user-joined', (name) => {
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  
  socket.on('send', (message) => {
    io.emit('receive', { message: message, name: users[socket.id] });
  });

  
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-left', users[socket.id]);
    delete users[socket.id];
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
