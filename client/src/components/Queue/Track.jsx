import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

export default function Track ({ track }) {


  return (
    <div>
      <SongContainer>
        <img src={track.imgUrl}></img>
        <InnerContainer>
          <ArtistName>{track.artist}</ArtistName>
          <SongName>{track.name}</SongName>
          <ThumbsUp />
          <ThumbsDown />
        </InnerContainer>
      </SongContainer>
    </div>
  )
}

const ThumbsUp = styled(FaThumbsUp)`
height: 20px;
width: 20px;
`;

const ThumbsDown = styled(FaThumbsDown)`
height: 20px;
width: 20px;
`;