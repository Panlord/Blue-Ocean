const mongoose = require('mongoose');
const Track = require('./track.js');

const roomSchema = mongoose.Schema({
  roomCode: { type: String, unique: true },
  playingSong: String, // current song that is playing
  position: Number, // The position_ms of the current track/song that is playing
  // queue: [Track], // songs in queue; no need for this because we can just query the track schema
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
