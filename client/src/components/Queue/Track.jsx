import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

export default function Track ({ track, username }) {

  const handleLike = (button) => {
    const params = {
      user: username,
      action: button,
      uri: track.uri
    };
    axios.put(`/action/${track.uri}`, params)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log('error handleLike', err);
      })
  };

  return (
    <div>
      <SongContainer>
        <SongImage src={track.imageUrl}></SongImage>
        <InnerContainer>
          <ArtistName>{track.artist}</ArtistName>
          <SongName>{track.name}</SongName>
          <ThumbsUp onClick={() => handleLike('like')} />
          <ThumbsDown onClick={() => handleLike('dislike')} />
        </InnerContainer>
      </SongContainer>
    </div>
  )
}

const SongContainer = styled.div`
border: 1px solid;
border-radius: 10px;
display: flex;
margin-bottom: 10px;
`

const InnerContainer = styled.div`
margin-top: 10px;
`
const ArtistName = styled.div`

`
const SongName = styled.div`

`
const SongImage = styled.img`
height: 60px;
width: 60px;
margin: 10px;
`

const ThumbsUp = styled(FaThumbsUp)`
height: 20px;
width: 20px;
`;

const ThumbsDown = styled(FaThumbsDown)`
height: 20px;
width: 20px;
`;