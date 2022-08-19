/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Queue from '../Queue/Queue.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Player from '../player.jsx';
import Chat from '../Chat/Chat.jsx';
import axios from "axios";
import logo from "../../../dist/SONAR_logo.png";


export default function UserRoom({ token, refreshToken, username, setUsername, device_id, setDevice_id, roomID}) {

  const [currentUri, setCurrentUri] = useState('');
  const [queue, setQueue] = useState([]);

  useEffect(()=> {

    axios.get('http://localhost:3001/room', {params : { roomID : 0}})
    .then((res)=>{
      axios.post(`https://api.spotify.com/v1/me/player/queue?device_id=${deviceID.device_id}&uri=${res.data.currentSong.uri}`, null, { headers: { Authorization: `Bearer ${token}` } })
      .then(()=>{
        for (let i = 0; i < res.data.queueData.length; i++) {
        console.log(device_id, 'device id');
        axios.post(`https://api.spotify.com/v1/me/player/queue?device_id=${deviceID.device_id}&uri=${res.data.queueData[i].uri}`, null, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
        console.log('post to player response ', response)
        })
        .catch((err) => console.log(err))
        }
      })
      setQueue(res.data.queueData);
    })
    .catch((err)=>console.log(err))
    //{ queueData, currentSong, songPosition, paused}

  }, [])




  return (
    <RoomContainer className="roomContainer">
      <Queue queue={queue} token={token} currentUri={currentUri} setQueue={setQueue} username={username} />
      <div className="centerStuff">
        <SearchBar setQueue={setQueue} token={token} deviceID={device_id} />
        <Player token={token} refreshToken={refreshToken} setUsername={setUsername} setDevice_id={setDevice_id} currentUri={currentUri} setCurrentUri={setCurrentUri} />
      </div>
      <Chat username={username} />
    </RoomContainer>
  );
}

const RoomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
