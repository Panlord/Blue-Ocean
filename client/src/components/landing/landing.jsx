import React, { useState, useEffect } from 'react';
import Player from '../player.jsx';
import Login from './login.jsx';
import '../App.css';

function Landing() {
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    async function getToken() {
      const response = await fetch('http://localhost:3001/auth/token');
      const json = await response.json();

      setToken(json.access_token);
      setRefreshToken(json.refresh_token)
    }

    getToken();
  }, []);

  return (
    <>
      { (token === '') ? <Login/> : <Player token={token} refreshToken={refreshToken}/>}
    </>
  )
}

export default Landing;