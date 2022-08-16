import React, { useState, useMemo } from 'react';
import Landing from './landing/landing.jsx'
import SearchBar from './SearchBar/SearchBar.jsx';
import SongContext from '../context/SongContext.js';

export default function App() {

  const [songs, setSongs] = useState([]);

  const providerSongValue = useMemo(() => ({ songs, setSongs }), [songs, setSongs]);

  return (
    <div>
      Hello Sonar!
      <Landing/>
    </div>
  );
}