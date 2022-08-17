/* eslint-disable quotes */
import React, { useState } from 'react';
import SearchBar from './SearchBar/SearchBar.jsx';
import Landing from './landing/landing.jsx';
import Queue from './Queue/Queue.jsx';

export default function App() {
  const [username, setUsername] = useState(null);
  const [device_id, setDevice_id] = useState(null);
  const [skip, setSkip] = useState(false);

  const handleSkip = () => {
    setSkip(!skip)
  }

  return (

    <div className="AppDiv">
      <Landing username={username} setUsername={setUsername} setDevice_id={setDevice_id} />
      {/* <div className="QueueDiv">
        <Queue songList={songList} username={username} />
      </div> */}
    </div>

  )
}

