import React, { useState, useMemo } from 'react';
import SearchBar from './SearchBar/SearchBar.jsx';
import SongContext from '../context/SongContext.js';

export default function App() {

  const [songs, setSongs] = useState([]);

  const providerSongValue = useMemo(() => ({ songs, setSongs }), [songs, setSongs]);

  return (
    <SongContext.Provider value={providerSongValue}>
      <SearchBar />
    </SongContext.Provider>
  );
}