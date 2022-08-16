/* eslint-disable no-var */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable block-scoped-var */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const controller = require('../controllers');
const Track = require('../db/track.js');

//console.log(controller, 'controllers');
router.get('/auth/login', controller.authentication.get);
router.get('/auth/callback', controller.authenticationCallback.get);
router.get('/auth/token', controller.getToken.get);
router.post('/addToQueue', (req, res) => {
  console.log('req.body',req.body)
  Track.create(req.body)
    .then((response) => {
      console.log('req.body: ', req);
      res.status(200).send(response)
    })
    .catch((err) => {
      console.log('error creating track', err);
      res.status(400).send("error when create track")
    })
  // user: Strring,})
  // songName: String,
  // songImg: String,
  // artist: String,
  // uri: String,
  // likes: [user: String],
  // dislikes: [user: String]
} )

router.put("/action/:id", async (req, res) => {
  try {
    const findTrack = await Track.findById(req.params.id);
    console.log('request for put',req)
    if (findTrack.likes.includes(req.query.user)) {
      return res.status(400).send("Track has already been liked");
    }
    if (findTrack.dislikes.includes(req.query.user)) {
      return res.status(400).send("Track has already been disliked");
    }
    if (req.query.action === 'like') {
      findTrack.likes.push(req.query.user);
    } else {
      findTrack.dislikes.push(req.query.user);
    }
    await findTrack.save();
    return res.status(200).send("Likes/dislikes updated");

  } catch (err) {
    console.log("error liking track", err);
    res.status(500).send("Error");
  }
});



module.exports = router;
