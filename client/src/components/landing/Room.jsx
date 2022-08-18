/* eslint-disable max-len */
import React, { useState } from 'react';
import styled from 'styled-components';
import Queue from '../Queue/Queue.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Player from '../player.jsx';
import Chat from '../Chat/Chat.jsx';

export default function Room({ token, refreshToken, username, setUsername, device_id, setDevice_id }) {
  const [currentUri, setCurrentUri] = useState('');
  const [queue, setQueue] = useState([
    // {
    //   songName: 'Celebrity',
    //   artist: 'IU',
    //   songImg:
    //     'https://i.scdn.co/image/ab67616d0000b2734ed058b71650a6ca2c04adff',
    //   uri: 'spotify:track:5nCwjUUsmBuNZKn9Xu10Os',
    //   user: 'Aaron',
    // },
    // {
    //   songName: 'Blue Monday',
    //   artist: 'Imagine Dragons',
    //   songImg:
    //     'https://i.scdn.co/image/ab67616d0000b273fc915b69600dce2991a61f13',
    //   uri: 'spotify:track:6hHc7Pks7wtBIW8Z6A0iFq',
    //   user: 'Harrison',

    // },
    // {
    //   songName: '還在流浪',
    //   artist: 'Jay Chou',
    //   songImg:
    //     'https://i.scdn.co/image/ab67616d0000b273d3480d741fad497e24f2fafe',
    //   uri: 'spotify:track:35xilew5nalcetOeytaDFj',
    //   user: 'Shanshan',
    // },
  ]);

  return (
    <RoomContainer className="roomContainer">
      <Queue queue={queue} token={token} currentUri={currentUri} setQueue={setQueue} />
      <div className="centerStuff">
        <SearchBar setQueue={setQueue} token={token} deviceID={device_id} />
        <Player token={token} refreshToken={refreshToken} setUsername={setUsername} setDevice_id={setDevice_id} currentUri={currentUri} setCurrentUri={setCurrentUri}/>
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
