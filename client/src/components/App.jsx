import React, { useState } from 'react';
import SearchBar from './SearchBar/SearchBar.jsx';
import Landing from './landing/landing.jsx';

export default function App() {
  const [queue, setQueue] = useState([]);
  const [username, setUsername] = useState(null);
  const [device_id, setDevice_id] = useState(null);

  return (
    <div>
      <SearchBar setQueue={setQueue} />
      Hello Sonar!
      <Landing setUsername={setUsername} setDevice_id={setDevice_id}/>
    </div>
  );
}
