import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
`

export default function SearchBar() {
  const [searchEntry, setSearchEntry] = useState('');
  const [songs, setSongs] = useState([]);

  // useEffect(() => {
  //   API call goes here
  // }, [songs])

  const searchChange = (e) => {
    setSearchEntry(e.target.value);
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    // API call with searchEntry
  }

  return (
    <Container>
      <input type='text' value={searchEntry} onChange={searchChange} placeholder='Search for a song...' required/>
    </Container>
  );
}

