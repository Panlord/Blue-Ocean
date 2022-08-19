/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { IoIosPause } from "react-icons/io";
import { BsPlayFill } from "react-icons/bs";

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
    const [user, setUser] = useState('');

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
                .then((res) => {console.log(res.data); props.setUsername(res.data.display_name); setUser(res.data.display_name)
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
            // Player connected and initialized; store room state in database using POST
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
      // PUT request to update the state of the room (send WebPlaybackState Object's paused, position, and current_track (the uri))
      .then(() => { // Get the current state of the player
        console.log('Toggle play');
        return player.getCurrentState();
      })
      .then((state) => {
        let roomData = {
          roomID: props.roomID,
          paused: state.paused,
          position: state.position,
          playingSong: state.track_window.current_track.uri
        };
        return roomData;
      })
      .then((roomData) => {
        return axios.put('/room', roomData);
      })
      .catch((error) => {
        console.log('Error occurred when attempting to PUT room data to server:', error);
      });
  }

  // Host presses NEXT (or >>) button to skip to next song on player
  const handleSkip = () => {
    // Skip to the next track on the player
    player.nextTrack()
      // PUT request to update the state of the room (send WebPlaybackState Object's paused, position, current_track (the uri) and the queue data)
      .then(() => {
        console.log('Skipped to next track');
        return player.getCurrentState();
      })
      .then((state) => {
        let roomData = {
          roomID: props.roomID,
          paused: state.paused,
          position: state.position,
          playingSong: state.track_window.current_track.uri
        };
        return roomData;
      })
      .then((roomData) => {
        return axios.put('/room', roomData);
      })
      .catch((error) => {
        console.log('Error occurred when attempting to PUT room data to server:', error);
      });
  }

  const saveTrack = (uri) => {
    let songId = uri.slice(14)
    console.log('--song ID--: ', songId)
    console.log('--TOKEN--: ', props.token)
    axios.put(`https://api.spotify.com/v1/me/tracks?ids=${songId}`, null, { headers: { Authorization: `Bearer ${props.token}` } })
      .then((response) => {
        console.log('track saved! ', response)
      })
      .catch((err) => console.log('error saving track', err))
  }

  return (
    <Container>
      <MainWrapper>
        <SongImg src={current_track.album.images[0].url} />
          <SongInfo>{current_track.artists[0].name} - {current_track.name}</SongInfo>
          <AddedBy>added by {user}</AddedBy>
          <ButtonsContainer>
          <Save onClick={() => {saveTrack(current_track.uri)}}>Save</Save>
          { is_paused ? <Play onClick={() => { handleTogglePlay(is_paused); }}/> : <Pause onClick={() => { handleTogglePlay(is_paused); }}/>}
          <Skip onClick={() => { handleSkip(); }}>Skip</Skip>
          </ButtonsContainer>
      </MainWrapper>
    </Container>
  );
}


const ButtonsContainer = styled.div`
display: flex;
align-items: center;
margin-top: 10px;
`

const Skip = styled.div`
color: white;
font-size: 25px;
cursor: pointer;
margin: 7px;

  &:hover {
    color: #0D1317;
  };
`
const Save = styled.div`
color: white;
font-size: 25px;
cursor: pointer;
margin: 7px;

&:hover {
  color: #0D1317;
};
`

const Pause = styled(IoIosPause)`
border: 1px solid black;
border-radius: 50%;
height: 50px;
width: 50px;
padding: 5px;
color: #0D1317;
background-color: #D9D9D9;
margin: 10px;
cursor: pointer;

&:hover {
  color: #D9D9D9;
  background-color: #0D1317;
};
`

const Play = styled(BsPlayFill)`
border: 1px solid black;
border-radius: 50%;
height: 50px;
width: 50px;
padding-left: 3px;
color: #0D1317;
background-color: #D9D9D9;
margin: 10px;
cursor: pointer;

&:hover {
  color: #D9D9D9;
  background-color: #0D1317;
};
`


const Container = styled.div`
align-items: center;
display: flex;
justify-content: center;
height: 100%;
`

const MainWrapper = styled.div`
align-items: center;
display: flex;
flex-direction: column;
height: 100%;
margin: 0 auto;
justify-content: center;
width: 80%;
`

const SongImg = styled.img`
border: 2px solid black;
border-radius: 10px;
width: 25vw;
`

const SongInfo = styled.div`
font-size: 30px;
margin: 20px;
text-align: center;
`

const AddedBy = styled.div`
font-size: 20px;
`

export default WebPlayback;
