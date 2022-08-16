const express = require('express');
const path = require('path');
const routes = require('./routes');
const {save} = require('./db/models.js')

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.use('/', routes);

app.listen(3001, () => {
  console.log('Server is running at port 3001');
});
