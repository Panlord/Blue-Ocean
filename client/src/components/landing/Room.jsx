/* eslint-disable max-len */
import React, { useState } from 'react';
import styled from 'styled-components';
import Queue from '../Queue/Queue.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Player from '../player.jsx';
import Chat from '../Chat/Chat.jsx';

export default function Room({ token, refreshToken, username, setUsername, setDevice_id, songList }) {
  const [queue, setQueue] = useState([]);

  return (
    <RoomContainer className="roomContainer">
      <Queue songList={songList} />
      <div className="centerStuff">
        <SearchBar setQueue={setQueue} token={token} />
        <Player token={token} refreshToken={refreshToken} setUsername={setUsername} setDevice_id={setDevice_id} />
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
