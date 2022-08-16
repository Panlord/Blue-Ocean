var models = require ('./../models')

module.exports = {
  get : (req, res ) => {
    console.log(req.query.state, 'state item');
    models.authenticationCallback(req.query.code, (err, results) => {
      if (err) {
        console.log(err, 'auth error');
      } else {
        res.redirect('/');
      }
    })
  }
}