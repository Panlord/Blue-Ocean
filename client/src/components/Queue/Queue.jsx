import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Track from './Track.jsx';
import axios from "axios";

export default function Queue ({ queue, username, token, currentUri, setQueue }) {


  useEffect(() => {
    if (queue.length > 0) {
      // console.log('---queue before shift', queue);
      const newQueue = queue.filter(item => item.uri !== currentUri );
      // console.log('---queue after shift', newQueue)
      setQueue(newQueue);
      axios.delete('/deleteSong', {data: {uri: currentUri}})
        .then((response) => {
          console.log('track deleted from db', response.data)
        })
        .catch((err) => {
          console.log('error deleting track', err);
        })
    }
  }, [currentUri]);

  return (
    <Container className='Queue'>
      <QueueContainer>
        {queue.map((item, index) => (
          <Track track={item} key={index} username={username} token={token} />
        ))}
      </QueueContainer>
    </Container>
  )
}

const Container = styled.div`
width: 270px;
height: 900px;
border: 1px solid black;
border-radius: 20px;
background-color: #3A4965;
// overflow: scroll;
`

const QueueContainer = styled.div`
display: flex;
flex-direction: column;
width: 250px;
// height: auto;
margin: 10px;
`