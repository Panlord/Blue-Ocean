import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SelectSearch from 'react-select-search';
import axios from 'axios';
import Song from './Song.jsx';

const Container = styled.div`
`;

export default function SearchBar({ addToQueue }) {
  const [searchEntry, setSearchEntry] = useState('');
  const [songs, setSongs] = useState([
    {
      value: 1,
      name: 'abc',
    },
    {
      value: 2,
      name: 'def',
    },
  ]);

  // useEffect(() => {
  //   API call goes here
  //   should setSongs with API response data
  // }, [searchEntry])

  const searchChange = (e) => {
    setSearchEntry(e.target.value);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.search.value);
    console.log(searchEntry);
    // API get request with searchEntry
  };

  return (
    <Container>
      <SelectSearch options={songs} search onChange={searchChange} placeholder="Choose a song..." />
      {/* <SelectSearch /> */}
      {/* <form onSubmit={searchSubmit}>
        <input type="text" value={searchEntry} onChange={searchChange} placeholder="Search for a song..." name="search" required />
        <button type="submit">Search</button>
        {songs.map((song) => <Song song={song} />)}
        {/* <Song song={song} key={key} handleClick={(addToQueue) => {onClick(addToQueue)}} />)} */}
        {/* {songs.map((song, key) => <Song song={song} handleClick={addToQueue} />)} */}
      {/* </form> */}
    </Container>
  );
}
