import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Track from './Track.jsx';

export default function Queue ( {songInfo} ) {
  const [songList, setSongList] = useState([{name: 'Celebrity', artist: 'IU', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734ed058b71650a6ca2c04adff', audioUrl: "https://open.spotify.com/track/5nCwjUUsmBuNZKn9Xu10Os" }]);

  songInfo = {
    name: 'Celebrity',
    artist: 'IU',
    imageUrl: "https://i.scdn.co/image/ab67616d0000b2734ed058b71650a6ca2c04adff",
    audioUrl: "https://open.spotify.com/track/5nCwjUUsmBuNZKn9Xu10Os"
  }

  useEffect (() => {
  setSongList([...songList, songInfo])
  }, [songInfo])

  return (
    <div>
      <div>
        {songList.map((item, index) => (
          <Track track={item} key={index} />
        ))}
      </div>

    </div>
  )
}