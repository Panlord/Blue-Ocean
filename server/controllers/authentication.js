const dotenv = require('dotenv').config();

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

//console.log( process.env.SPOTIFY_CLIENT_ID,process.env.SPOTIFY_CLIENT_SECRET, 'secrets')

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


module.exports = {
  get : (req, res) => {
    var scope = "streaming \
    user-read-email \
    user-read-private \
    playlist-modify-private \
    playlist-modify-public"

    var state = generateRandomString(16);

    let redirectURI = 'http://localhost:3001/auth/callback';
    if (req.query.roomID) {
      redirectURI = `http://localhost:3001/auth/join/callback`;
    }

    var auth_query_parameters = new URLSearchParams({
      response_type: "code",
      client_id: spotify_client_id,
      scope: scope,
      redirect_uri: redirectURI,
      state: state,
      roomID: req.query.roomID,
    });
    console.log('AUTH SHET', auth_query_parameters);
    if (req.query.roomID) {
      console.log('GOT IN HERE');
      console.log(auth_query_parameters);
      res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
    } else {
      console.log('GOT IN THERE');
      res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
    }
  },



}