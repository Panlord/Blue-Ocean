import React, { useState } from 'react';
import SearchBar from './SearchBar/SearchBar.jsx';
import Landing from './landing/landing.jsx';

export default function App() {
  const [queue, setQueue] = useState([]);
  const [username, setUsername] = useState(null);

  return (
    <div>
      <SearchBar setQueue={setQueue} />
      Hello Sonar!
      <Landing setUsername={setUsername}/>
    </div>
  );
}
