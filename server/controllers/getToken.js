var models = require('./../models')

module.exports = {
  get : (req, res) => {
    console.log(global.access_token, 'global')
      if (!global.access_token) {
        console.log("no token to give the user");
        res.sendStatus(400);
      } else {
        console.log(access_token, 'access')
        res.json(
          {
             access_token: global.access_token,
             refresh_token: global.refresh_token
          })
          global.access_token = '';
          global.refresh_token = '';
      }
  }
}