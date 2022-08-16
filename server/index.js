const express = require('express');
const path = require('path');
const app = express();

// socket.io server stuff
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

const routes = require('./routes');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.use('/', routes);



app.listen(3001, () => {
  console.log('Server is running at port 3001');
});
