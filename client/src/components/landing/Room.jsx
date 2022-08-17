import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Player from '../player.jsx';

export default function Room({ token, refreshToken, setUsername }) {
  const [queue, setQueue] = useState([]);

  return (
    <div>
      <SearchBar setQueue={setQueue} />
      <Player token={token} refreshToken={refreshToken} setUsername={setUsername} />
      {/* <Chat username={username} /> */}
    </div>
  );
}
