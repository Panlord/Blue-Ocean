var models = require ('./../models')

module.exports = {
  get : (req, res ) => {
    models.authenticationCallback(req.query.code, (err, results) => {
      if (err) {
        console.log(err, 'auth error');
      } else {
        res.redirect('/');
      }
    })
  }
}