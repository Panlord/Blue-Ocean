import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Song from './Song.jsx';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.div`
  max-width: 600px;
  height: 36px;
  display: flex;
  position: relative;
  flex-grow: 1;
  background-color: #D9D9D9;
  width: 100%;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 8px 0 8px 15px;
  color: #022B3A;
  background-color: #D9D9D9;
  font-size: 18px;
`;

const SearchIcon = styled.div`
  display: flex;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  border-radius: 5px;
  color: #022B3A;
  cursor: pointer;
`;

const SearchResult = styled.ul`
  position: absolute;
  top: 36px;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border-radius: 3px;
  background-color: #D9D9D9;
  border-top: 1px solid #FFF;
  ${'' /* opacity: 0; */}
`;

const List = styled.li`
  list-style: none;
  padding: 10px 0 10px 10px;;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: default;
  border-radius: 3px;
  ${'' /* display: none; */}
  &:hover {
    color: #FFF;
    background-color: #1F7A8C;
  }
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
      <SearchInput>
        <Input type="text" onChange={searchChange} placeholder="Choose a song..." />
        <SearchIcon>
          <i className="fa fa-search" />
        </SearchIcon>
        <SearchResult>
          {songs.map((song, key) => <List key={key}>{song.name}</List>)}
        </SearchResult>
      </SearchInput>
    </Container>
  );
}
