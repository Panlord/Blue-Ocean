var models = require ('./../models')

module.exports = {
  get : (req, res ) => {
    console.log(req.query.state, 'state item IN REG AUTH'); // user has state
    console.log(req.query);
    models.authenticationCallback(req.query.code, req.query.state, (err, results) => {
      if (err) {
        console.log(err, 'auth error');
      } else {
        res.redirect(`/?authCode=${req.query.state}`);
      }
    })
  }
}