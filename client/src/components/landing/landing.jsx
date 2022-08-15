import React, { useState, useEffect } from 'react';
import Player from '../player.jsx';
import Login from './login.jsx';
import '../App.css';

function Landing() {
  const [token, setToken] = useState('');

  useEffect(() => {
    async function getToken() {
      const response = await fetch('http://localhost:3001/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []);

  return (
    <>
      { (token === '') ? <Login/> : <Player token={token} />}
    </>
  )
}

export default Landing;