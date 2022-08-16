/* eslint-disable no-console */
/* eslint-disable import/order */
const express = require('express');
const path = require('path');

const app = express();

const routes = require('./routes');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.use('/', routes);

const server = app.listen(3001, () => {
  console.log('Server is running at port 3001');
});
const io = require('socket.io')(server);

app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('chat message', (msg) => {
    console.log(`${msg} from ${socket.id}`);
    //io.emit('chat message', {name:user[socket.id], msg:msg});
    io.emit('chat message', msg);
  });

  // socket.on('new-user', name => {
  //   user[socket.id] = name
  //   console.log('this is the name', name)
  //   io.emit('user-connected', name)
  // })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
