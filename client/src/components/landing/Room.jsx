/* eslint-disable max-len */
import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Player from '../player.jsx';
import Chat from '../Chat/Chat.jsx';

export default function Room({ token, refreshToken, username, setUsername, setDevice_id }) {
  const [queue, setQueue] = useState([]);

  return (
    <div>
      <SearchBar setQueue={setQueue} />
      <Player token={token} refreshToken={refreshToken} setUsername={setUsername} setDevice_id={setDevice_id} />
      <Chat username={username} />
    </div>
  );
}
