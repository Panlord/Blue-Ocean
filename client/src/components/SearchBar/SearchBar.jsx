import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiPlusCircle } from 'react-icons/fi';
import axios from 'axios';

export default function SearchBar({ setQueue, username, token, deviceID }) {
  const [searchEntry, setSearchEntry] = useState('');
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const options = {
      url: 'https://api.spotify.com/v1/search',
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: searchEntry,
        type: 'track',
        market: 'US',
        limit: 5,
      },
    };
    axios(options)
      .then((response) => {
        if (searchEntry.length > 1) setSongs(response.data.tracks.items);
        else setSongs([]);
      })
      .catch((err) => console.log(err));
  }, [searchEntry]);

  const searchChange = (e) => {
    setSearchEntry(e.target.value);
  };

  const addToQueue = (e, song) => {
    e.preventDefault();
    setQueue((prev) => [...prev, {
      name: song.name,
      artist: song.album.artists[0].name,
      imageURL: song.album.images[0].url,
      uri: song.uri,
      username,
    }]);
    axios.post(`https://api.spotify.com/v1/me/player/queue?device_id=${deviceID}&uri=${song.uri}`, null, { headers: { Authorization: `Bearer ${token}` } })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <SearchForm>
        <Input type="text" name="search" placeholder="Choose a song..." value={searchEntry} onChange={searchChange} />
        <SearchIcon>
          <i className="fa fa-search" />
        </SearchIcon>
        <SearchResult>
          {songs.map((song) => (
            <SongContainer>
              <img alt="" src={song.album.images[0].url} width="50" />
              <List
                type="button"
                onClick={(e) => { addToQueue(e, song); }}
                key={song.id}>
                {`${song.name} - ${song.artists[0].name}`}
              </List>
              <AddButton />
            </SongContainer>
          ))}
        </SearchResult>
      </SearchForm>
    </Container>
  );
}

const SongContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-bottom: 1px;
  padding-left: 3px;
  padding-top: 3px;
  &:hover {
    color: #FFF;
    background-color: #1F7A8C;
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchForm = styled.form`
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
  background-color: #5e5d5b;
`;

const List = styled.li`
  list-style: none;
  padding: 10px 0 10px 10px;;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: default;
  border-radius: 3px;
  font-size: 17px;
`;

const AddButton = styled(FiPlusCircle)`
  fontSize: 30px;
  display: flex;
  font-size: 25px;
  margin-right: 10px;
  opacity: 0;
  ${SongContainer}:hover & {
    opacity: 1;
  }
`;
