/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const track = {
  name: '',
  album: {
    images: [
      { url: '' },
    ],
  },
  artists: [
    { name: '' },
  ],
};

function WebPlayback(props) {

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);
    const [device_id, setDevice_id] = useState('');
    const [playlist_uri, setPlaylist_uri] = useState('');

    const setUri = (uri) => {
      props.setCurrentUri(uri);
    }

    useEffect(() => {
      setUri(current_track.uri);
      console.log('---track---', current_track)
    }, [current_track])


    useEffect(() => {
        var dev_id;

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                props.setDevice_id({ device_id })
                setDevice_id({ device_id })
                let wrapperFunction = () => {
                   axios.put('https://api.spotify.com/v1/me/player', {'device_ids': [`${device_id}`], play: true},
                {headers: {Authorization: `Bearer ${props.token}`}})
                // .then(()=>{
                //     axios.post(`https://api.spotify.com/v1/me/player/queue?device_id=${device_id}&uri=spotify:track:4cOdK2wGLETKBW3PvgPWqT`, null,
                //     {headers: {Authorization: `Bearer ${props.token}`} })
                //     .then((res) => {
                //         console.log('inside queue')
                //         axios.post(`https://api.spotify.com/v1/me/player/next?device_id=${device_id}`, null,
                //     {headers: {Authorization: `Bearer ${props.token}`} })
                //         })
                //     .catch((err) => console.log(err))
                // })
                .catch((err) => {console.log(err)
                wrapperFunction()})
                }
                wrapperFunction();

                axios.get('https://api.spotify.com/v1/me',  {headers: {Authorization: `Bearer ${props.token}`}})
                .then((res) => {props.setUsername(res.data.id);
            })
                .catch((err) => console.log(err))
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ( state => {
                if (!state) {
                    return;
                }
                console.log(state.track_window, 'track window');
                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then( state => {
                    (!state)? setActive(false) : setActive(true)
                });
            }));

            player.connect();

    };
  }, []);

  if (!is_active) {
    return (
      <div className="container">
        <div className="main-wrapper">
          <b> Loading.... </b>
        </div>
      </div>
    );
  }

  // Handler functions to handle what happens when someone (preferably the host) interacts with the player
  // Host presses PLAY/PAUSE button on player
  const handleTogglePlay = (isPaused) => {
    player.togglePlay()
      .then(() => {console.log('Toggle play');})
      // PUT request to update the state of the room (send WebPlaybackState Object's paused, position, and current_track (the uri))
      .then(() => { // Get the current state of the player
        return player.getCurrentState();
      })
      .then((state) => {
        let roomData = {
          roomCode: props.roomCode,
          paused: state.paused,
          position: state.position,
          currentSong: state.track_window.current_track.uri // <--------- These might need renaming
        };
        return roomData;
      })
      // TODO
      .then((roomData) => {
        return axios.put(); //TODO <---------------------
      })
      .catch((error) => {
        console.log('Error occurred when attempting to PUT room data to server:', error);
      });
  }

  // Host presses NEXT (or >>) button to skip to next song on player
  const handleSkip = () => {
    // Skip to the next track on the player
    player.nextTrack().then(() => {console.log('Skipped to next track');});
    // PUT request to update the state of the room (send WebPlaybackState Object's paused, position, current_track (the uri) and the queue data)
    // TODO
  }

  return (
    <div className="container">
      <div className="main-wrapper">
        <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />
        <div className="now-playing__side">
          <div className="now-playing__name">{current_track.name}</div>
          <div className="now-playing__artist">{current_track.artists[0].name}</div>
          {/* <button className="btn-spotify" type="button" onClick={() => { player.previousTrack(); }}>
            &lt;&lt;
          </button> */}
          <button className="btn-spotify" type="button" onClick={() => { handleTogglePlay(is_paused); }}> {/* this used to be player.togglePlay(); */}
            { is_paused ? 'PLAY' : 'PAUSE' }
          </button>
          <button className="btn-spotify" type="button" onClick={() => { handleSkip(); }}> {/* this used to be player.nextTrack() */}
            &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default WebPlayback;
