const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const path = require('path')

const router = require('./routes');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.static(path.join(__dirname, 'build')));

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
     if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'bharath', text: `hey ${user.name},thanks for joining  ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'bharath', text: `${user.name} has joined the group!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('Message', (message, callback) => {
     const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
     if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left the room.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));