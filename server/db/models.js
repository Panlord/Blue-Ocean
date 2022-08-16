const mongoose = require("mongoose");
const db = require('./index.js');

const trackSchema = mongoose.Schema({
  username: String,
  songName: String,
  songImg: String,
  artist: String,
  uri: String,
  like: Number,
  dislike: Number
});

const Track = mongoose.model('Track', trackSchema);

exports.save = (track) => {
  return Track.create(track);
}