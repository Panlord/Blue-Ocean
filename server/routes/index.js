const express = require("express");
const router = express.Router();
const controller = require('../controllers');

//console.log(controller, 'controllers');
router.get('/auth/login', controller.authentication.get);
router.get('/auth/callback', controller.authenticationCallback.get);
router.get('/auth/token', controller.getToken.get);

router.put("/like/:id", async (req, res) => {
  try {
    const findTrack = await Track.findById(req.params.id);
    for (var i = 0; i < findTrack.likes.length; i++) {
      if (findTrack.like[i].user === req.user.id) {
        return res.status(400).send("Track has already been liked");
      }
    }
    post
  } catch (err) {
    console.log("error liking track", err);
    res.status(500).send("Error");
  }
});

router.put('/dislike/:id', async (req, res) => {
  try {
    const findTrack = await Track.findById(req.params.id);
    for (var i = 0; i < findTrack.dislikes.length; i++) {
      if (findTrack.dislike[i].user === req.user.id) {
        return res.status(400).send("Track has already been liked");
      }
    }
  } catch (err) {
    console.log("error disliking track", err);
    res.status(500).send("Error");
  }
})

module.exports = router;

