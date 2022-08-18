const Room = require('../db/room.js');
const Track = require('../db/track.js');

const put = (req, res) => {
  if (req.body.playingSong === undefined) {
    Room.findOneAndUpdate({ roomID: req.body.roomID }, { position: req.body.position })
      .then(() => res.status(200).send('successfully updated song position'))
      .catch((err) => console.log('error updating song position: ', err));
  } else {
    Room.findOneAndUpdate({ roomID: req.body.roomID }, { playingSong: req.body.playingSong })
    .then(() => res.status(200).send('successfully updated playing song'))
    .catch((err) => console.log('error updating playing song: ', err));
  };
};

const post = (req, res) => {
  Room.create(req.body)
    .then(() => res.status(201).send('successfully posted room'))
    .catch((err) => console.log('error posting room data: ', err));
};

const get = async(req, res) => {
  try {
    const queueQuery = await Track.find({ roomID: req.query.params.roomID });
    const currentSongQuery = await Room.find({ roomID: req.query.params.roomID }).select('playingSong');
    const positionQuery = await Room.find({ roomID: req.query.params.roomID }).select('position');
    const pausedQuery = await Room.find({ roomID: req.query.params.roomID }).select('paused');
    res.send({ queueData: queueQuery, currentSong: currentSongQuery, songPosition: positionQuery, paused: pausedQuery });
  } catch(err) {
    console.log('error getting queue and room data: ', err);
  };
};

module.exports.put = put;
module.exports.post = post;
module.exports.get = get;