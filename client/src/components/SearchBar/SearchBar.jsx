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
    const queueData = {
      user: username,
      songName: song.name,
      songImg: song.album.images[0].url,
      artist: song.album.artists[0].name,
      uri: song.uri,
    };
    setQueue((prev) => [...prev, queueData]);
    console.log('---deviceID---', deviceID.device_id)
    axios.post(`https://api.spotify.com/v1/me/player/queue?device_id=${deviceID.device_id}&uri=${song.uri}`, null, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log('post to player response ', response)
      })
      .catch((err) => console.log(err)),
    axios.post('/addToQueue', queueData)
      .then((response) => {
        console.log('song added to db: ', response)
      })
      .catch((err) => console.log(err))
  };

  return (
    <Container>
      <SearchForm>
        <Input type="text" name="search" placeholder="Songs, artists..." value={searchEntry} onChange={searchChange} />
        <SearchIcon>
          <i className="fa fa-search" />
        </SearchIcon>
        {searchEntry.length ?
        <SearchResult>
          {songs.map((song) => (
            <SongContainer onClick={(e) => {
              setSearchEntry('');
              addToQueue(e, song);
            }}>
              <img alt="" src={song.album.images[0].url} width="50" style={{borderRadius: "4px"}}/>
              <List key={song.id}>
                <div style={{display:"flex", flexDirection:"column", alignItems: "stretch"}}>
                  <div style={{display:"flex", fontSize:"1em"}}>{song.name}</div>
                  <div style={{display:"flex", fontSize: "x-small"}}>{song.artists[0].name}</div>
                </div>
              </List>
              <AddButton />
            </SongContainer>
          ))}
        </SearchResult> : <></>
        }
      </SearchForm>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchForm = styled.form`
  width: 100%;
  height: 36px;
  display: flex;
  position: relative;
  flex-grow: 1;
  background-color: #D9D9D9;
  width: 100%;
  border: 2px solid #022B3A;
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
  color: #CEE5F2;
  background-color: #333;
`;

const SongContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-bottom: 2px;
  padding-left: 10px;
  padding-top: 6px;
  border-radius: 20px;
  border-left: 1px solid #70CAD1;
  border-right: 1px solid #70CAD1;
  border-bottom: 1px solid #70CAD1;
  &:hover {
    color: #022B3A;
    background-color: #70CAD1;
    cursor: pointer;
  };
`;

const List = styled.li`
  list-style: none;
  padding: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 90px;
  border-radius: 3px;
  font-size: 17px;
`;

const AddButton = styled(FiPlusCircle)`
  fontSize: 30px;
  display: flex;
  font-size: 30px;
  margin-right: 10px;
  opacity: 0;
  ${SongContainer}:hover & {
    opacity: 1;
  }
`;
