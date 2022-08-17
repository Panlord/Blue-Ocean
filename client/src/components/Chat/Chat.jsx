/* eslint-disable no-console */
// Import stuff
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import io from 'socket.io-client';

const socket = io();

export default function Chat({ username }) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [message, setMessage] = useState('');
  const [listOfMessages, setListOfMessages] = useState([]);
  const [name, setName] = useState('');
  const [group, setGroup] = useState(['A', 'B', 'C', 'D', 'E']);

  // need something to get userName from token data
  useEffect(() => {
    if (name !== null) {
      console.log(name);
      setName(username);
      socket.emit('new-user', name);
    }
  }, [username]);

  useEffect(() => {
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
      const newMessage = `${msg.name}: ${msg.msg}`;
      setListOfMessages([...listOfMessages, newMessage]);
    });

    socket.on('user-connected', (name) => {
      if (name !== '') {
        const msg = `${name} is connceted`;
        setListOfMessages([...listOfMessages, msg]);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, [listOfMessages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message === '') {
      return;
    }
    socket.emit('chat message', message);
    console.log(username, name);
    setMessage('');
  };

  return (
    <ChatContainer>
      {/* <UserFace id="face">
        <div>{group.map((pic, index) => {
          return <span>{pic}</span>
        })}</div>
      </UserFace> */}
      <Messages id="messages">
        <div>
          {listOfMessages.map((msg, index) => <Message key={index}>{msg}</Message>)}
        </div>
      </Messages>
      <MessageForm id="form" onSubmit={(event) => { handleSubmit(event); }}>
        <MessageInput id="input" type="text" value={message} placeholder="Send a message" autocomplete="off" onChange={(event) => { setMessage(event.target.value); }} />
        <SendButtonWrapper>
          <BsFillArrowUpCircleFill onClick={(event) => { handleSubmit(event); }} />
        </SendButtonWrapper>
      </MessageForm>
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
  height: 80vh;
  background: #0D1317;
  border: 2px solid #000000;
  border-radius: 20px;
`;
const Messages = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  max-height: 80vh;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
`;
const Message = styled.li`
  background: #D9D9D9;
  border-radius: 10px;
  color: black;
  font-size: 24px;
  margin: 4px 8px 4px 8px;
`;
const MessageForm = styled.form`
  display: flex;
  flex-direction: row;
  margin: 16px 8px 8px 8px;
  position: relative;
`;
const MessageInput = styled.input`
  background: #D9D9D9;
  border-radius: 10px;
  color: black;
  font-size: 24px;
  flex-grow: 1;
`;
// Perhaps turn this sendbuttonwrapper into inline styling for the BsFillArrowUpCircleFill
const SendButtonWrapper = styled.div`
  color: #70CAD1;
  position: absolute;
  right: 2%;
`;

const UserFace = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 90vw;
  height: 15vh;
  background: blue;
  border: 2px solid #000000;
  border-radius: 20px;
`;

