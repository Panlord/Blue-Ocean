var models = require ('./../models')

module.exports = {
  get : (req, res ) => {
    console.log(req.query.state, 'state item'); // user has state
    models.authenticationCallback(req.query.code, req.query.state, (err, results) => {
      if (err) {
        console.log(err, 'auth error');
      } else {
        res.redirect(`/?roomID=${req.query.roomID}&authCode=${req.query.state}`);
      }
    })
  }
}