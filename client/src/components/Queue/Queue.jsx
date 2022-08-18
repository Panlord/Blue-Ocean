import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Track from './Track.jsx';

export default function Queue ({ queue, username, token, currentUri, setQueue }) {


  useEffect(() => {
    if (queue.length > 0) {
      // if (queue[0].uri === currentUri) {
        console.log('---queue before shift', queue);
        const newQueue = queue.filter(item=>item.uri !== currentUri );
        // queue.shift();
        console.log('---queue after shift', newQueue)
        setQueue(newQueue);
      // }
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
border: 1px solid;
border-radius: 20px;
`

const QueueContainer = styled.div`
display: flex;
flex-direction: column;
width: 250px;
height: auto;
margin: 10px;
`