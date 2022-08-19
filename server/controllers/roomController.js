const Room = require('../db/room.js');
const Track = require('../db/track.js');

const put = (req, res) => {
  Room.findOneAndUpdate(
    { roomID: req.body.roomID }, { position: req.body.position, playingSong: req.body.playingSong, paused: req.body.paused }
  )
  .then(() => res.status(201).send('successfully bangbangbanged room'))
  .catch((error) => { console.log(error) });
  // if (req.body.playingSong === undefined) {
  //   Room.findOneAndUpdate({ roomID: req.body.roomID }, { position: req.body.position })
  //     .then(() => res.status(200).send('successfully updated song position'))
  //     .catch((err) => console.log('error updating song position: ', err));
  // } else {
  //   Room.findOneAndUpdate({ roomID: req.body.roomID }, { playingSong: req.body.playingSong })
  //   .then(() => res.status(200).send('successfully updated playing song'))
  //   .catch((err) => console.log('error updating playing song: ', err));
  // };
};

const post = (req, res) => {
  Room.create(req.body)
    .then(() => res.status(201).send('successfully posted room'))
    .catch((err) => console.log('error posting room data: ', err));
};

const get = async(req, res) => {
  try {
    const queueQuery = await Track.find({ roomID: req.query.roomID });
    const currentSongQuery = await Room.findOne({ roomID: req.query.roomID }, 'playingSong');
    const positionQuery = await Room.findOne({ roomID: req.query.roomID }, 'position');
    const pausedQuery = await Room.findOne({ roomID: req.query.roomID }, 'paused');
    res.send({ queueData: queueQuery, currentSong: currentSongQuery, songPosition: positionQuery, paused: pausedQuery });
  } catch(err) {
    console.log('error getting queue and room data: ', err);
  };
};

module.exports.put = put;
module.exports.post = post;
module.exports.get = get;