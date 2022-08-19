import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiPlusCircle } from 'react-icons/fi';
import axios from 'axios';

export default function SearchBar({ setQueue, username, token, deviceID, roomID }) {
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
        limit: 20,
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
      roomID: roomID,
    };
    setQueue((prev) => [...prev, queueData]);
    console.log('---deviceID---', deviceID.device_id);
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
				<InputWrapper>
					<i className="fa fa-search" style={{color: "#70CAD1"}}/>
					<Input type="text" name="search" placeholder="Songs, artists..." value={searchEntry} onChange={searchChange} />
				</InputWrapper>
        {searchEntry.length ?
				<ScrollContainer>
					<SearchResult>
						{songs.map((song) => (
							<SongContainer onClick={(e) => {
								setSearchEntry('');
								addToQueue(e, song);
							}}>
								<img alt="" src={song.album.images[0].url} width="50" style={{borderRadius: "4px"}}/>
								<List key={song.id}>
									<SongDetail>
										<SongName>{song.name}</SongName>
										<Artist>{song.artists[0].name}</Artist>
									</SongDetail>
								</List>
								<AddButton />
							</SongContainer>
						))}
					</SearchResult>
				</ScrollContainer> : <></>
        }
      </SearchForm>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 42px 40px 0px 40px;
`;

const SearchForm = styled.form`
  display: flex;
	flex-direction: column;
  position: relative;
  align-items: center;
  flex-grow: 1;
`;

const InputWrapper = styled.div`
  display: flex;
	width: 500px;
	height: 50px;
	background-color: white;
	border-radius: 10px;
	flex-direction: row;
	align-items: center;
	padding: 20px;
`;

const Input = styled.input`
	flex: 1;
	height: 40px;
	border: none;
	outline: none;
	font-size: 18px;
	padding-left: 10px;
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 396px;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 10000;
`;

const SearchResult = styled.ul`
  width: 500px;
  height: 100%;
  margin: auto;
	border-radius: 3px;
  color: #CEE5F2;
  background-color: rgba(2,43,58,0.8);
	white-space: nowrap;
  overflow-x: scroll;
  scrollbar-width: none;
  align-items: center;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
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

const SongDetail = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  alignItems: stretch;
`;

const SongName = styled.div`
  display: flex;
  font-size: 1em;
  width: 350px;
  overflow: hidden;
`;

const Artist = styled.div`
 display: flex;
 font-size: x-small;
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
