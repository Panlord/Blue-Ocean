import React, { useState } from 'react';
import SearchBar from './SearchBar/SearchBar.jsx';
import Landing from './landing/landing.jsx';
import Queue from './Queue/Queue.jsx';

export default function App() {
  const [queue, setQueue] = useState([]);
  const [username, setUsername] = useState(null);
  const [device_id, setDevice_id] = useState(null);
  const [songList, setSongList] = useState([
    {
      name: "Celebrity",
      artist: "IU",
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b2734ed058b71650a6ca2c04adff",
      // audioUrl: "https://open.spotify.com/track/5nCwjUUsmBuNZKn9Xu10Os",
      uri: "spotify:track:5nCwjUUsmBuNZKn9Xu10Os"
    },
    {
      name: "Blue Monday",
      artist: "Imagine Dragons",
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273fc915b69600dce2991a61f13",
      uri: "spotify:track:6hHc7Pks7wtBIW8Z6A0iFq",

    },
    {
      name: "還在流浪",
      artist: "Jay Chou",
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273d3480d741fad497e24f2fafe",
      uri: "spotify:track:35xilew5nalcetOeytaDFj"
    },
  ]);

  return (
    <div>
      < SearchBar setQueue={setQueue} />

      <Landing setUsername={setUsername} setDevice_id={setDevice_id}/>
      <div >
        <Queue songList={songList} />
      </div>
    </div>
  );
}
