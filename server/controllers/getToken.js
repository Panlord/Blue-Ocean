var models = require('./../models')

module.exports = {
  get : (req, res) => {
    console.log(req.query.authCode, 'this is the auth code')
    //console.log('lit',req, 'getToken callback request');
    console.log(global[req.query.authCode], 'global')
      if (!global[req.query.authCode]) {
        console.log("no token to give the user");
        res.sendStatus(400);
      } else {
        // console.log(access_token, 'access')
        res.json(global[req.query.authCode])
        delete global[req.query.authCode];
      }
  }
}