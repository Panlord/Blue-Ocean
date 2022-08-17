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
  console.log('req.body',req.body);
  Track.create(req.body)
    .then((response) => {
      // console.log('req.body: ', req);
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log('error creating track', err);
      res.status(400).send("error when create track");
    });
});

router.put('/action/:uri', async (req, res) => {
  try {
    const findTrack = await Track.find({uri: req.body.uri});
    // console.log('type for likes', Array.isArray(findTrack[0].likes))
    console.log('findTrack: ', findTrack);
    if (findTrack[0].likes.includes(req.body.user)) {
      return res.status(400).send("Track has already been liked");
    }
    if (findTrack[0].dislikes.includes(req.body.user)) {
      return res.status(400).send("Track has already been disliked");
    }
    if (req.body.action === 'like') {
      findTrack[0].likes.push(req.body.user);
    } else {
      findTrack[0].dislikes.push(req.body.user);
    }
    await Track.findOneAndUpdate({uri: req.body.uri}, findTrack[0]);
    return res.status(200).send("Likes/dislikes updated");

  } catch (err) {
    console.log("error liking track", err);
    res.status(500).send("Error");
  }
});

router.get('/findLikes', async (req, res) => {
  try {
    console.log('req.query for get request: ', req.query)
    const findTrack = await Track.find({uri: req.query.uri});
    console.log('findTrack: ', findTrack);
    return res.status(200).send({
      likes: findTrack[0].likes.length,
      dislikes: findTrack[0].dislikes.length
    });
  } catch (err) {
    console.log("error getting like count", err);
    res.status(500).send(err);
  }
});

module.exports = router;
