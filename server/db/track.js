const mongoose = require("mongoose");
// const db = require('./index.js');

const trackSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  songName: String,
  songImg: String,
  artist: String,
  uri: String,
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  dislikes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ]
});

const Track = mongoose.model('Track', trackSchema);
