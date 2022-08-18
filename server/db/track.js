const mongoose = require('mongoose');
// const db = require('./index.js');

const trackSchema = mongoose.Schema({
  user: String,
  songName: String,
  songImg: String,
  artist: String,
  uri: String,
  likes: [String],
  dislikes: [String],
  roomCode: String,
});



const Track = mongoose.model('Track', trackSchema);

module.exports = Track;