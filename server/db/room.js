const mongoose = require('mongoose');
const Track = require('./track.js');

const roomSchema = mongoose.Schema({
  roomCode: { type: String, unique: true },
  playingSong: String, // current song that is playing
  timeStamp: Number, // ??? timestamp of current song that is playing (unsure if type is Number)
  queue: [Track], // songs in queue
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
