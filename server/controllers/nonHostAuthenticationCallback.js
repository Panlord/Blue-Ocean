var models = require ('./../models')

module.exports = {
  get : (req, res ) => {
    console.log(req.query.state, 'state item IN NONHOST AUTH'); // user has state
    models.authenticationCallback(req.query.roomID, req.query.state, (err, results) => {
      if (err) {
        console.log(err, 'auth error');
      } else {
        res.redirect(`/?roomID=0&authCode=${req.query.state}`);
      }
    });
  }
}