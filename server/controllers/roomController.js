const Room = require('../db/room.js');
const Track = require('../db/track.js');

const put = (req, res) => {
  Room.findOneAndUpdate({ roomCode: req.body.roomCode }, { '$set': { position: req.body.position, playingSong: req.body.playingSong } })
    .then(() => res.status(200).send('successfully updated room'))
    .catch((err) => console.log('error updating room data: ', err));
};

const post = (req, res) => {
  Room.create(req.body)
    .then(() => res.status(201).send('successfully posted room'))
    .catch((err) => console.log('error posting room data: ', err));
};

const get = async(req, res) => {
  try {
    const trackQuery = await Track.find({ roomCode: req.query.params.roomCode });
    const positionQuery = await Room.find({ roomcode: req.query.params.roomCode }).select('position');
    const pausedQuery = await Room.find({ roomCode: req.query.params.roomCode }).select('paused');
    res.send({ queueData: trackQuery, songPosition: roomQuery, paused: pausedQuery });
  } catch(err) {
    console.log('error getting queue and room data: ', err);
  };
};

module.exports.put = put;
module.exports.post = post;
module.exports.get = get;