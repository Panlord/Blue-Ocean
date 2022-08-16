// Import stuff
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';

const socket = io();

export default function Chat(props) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [message, setMessage] = useState('');
  const [listOfMessages, setListOfMessages] = useState([]);

  useEffect(() => {
    console.log('AHHHH');
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('CONNECTED');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    socket.on('chat message', (msg) => {
      setListOfMessages([...listOfMessages, msg]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, [listOfMessages]);

  return (
    <div>
      AHHHHH
    </div>
  );
}
