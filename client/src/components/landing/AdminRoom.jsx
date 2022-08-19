/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Queue from '../Queue/Queue.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import AdminPlayer from '../AdminPlayer.jsx';
import Chat from '../Chat/Chat.jsx';

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export default function AdminRoom({ token, refreshToken, username, setUsername, device_id, setDevice_id, roomID, setRoomID }) {

  const [currentUri, setCurrentUri] = useState('');
  const [queue, setQueue] = useState([]);

  // On initial component mounting, generate a random room ID and set it
  useEffect(() => {
    setRoomID(generateRandomString(4));
  }, []);

  return (
    <RoomContainer className="roomContainer">
      <Queue queue={queue} token={token} currentUri={currentUri} setQueue={setQueue} username={username} />
      <div className="centerStuff">
        <SearchBar setQueue={setQueue} token={token} deviceID={device_id} roomID={roomID} username={username} />
        <AdminPlayer roomID={roomID} token={token} refreshToken={refreshToken} setUsername={setUsername} setDevice_id={setDevice_id} setCurrentUri={setCurrentUri} />
        <RoomCodeLink>{`http://localhost:3001/?roomID=${roomID}`}</RoomCodeLink>
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
const RoomCodeLink = styled.div`
  color: white;
`;
