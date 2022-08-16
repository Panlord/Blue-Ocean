var models = require('./../models')

module.exports = {
  get : (req, res) => {
    console.log(global.access_token, 'global')
      if (!global.access_token) {
        console.log("no token to give the user");
      } else {
        console.log(access_token, 'access')
        res.json(
          {
             access_token: global.access_token
          })
          global.access_token = '';
      }
  }
}