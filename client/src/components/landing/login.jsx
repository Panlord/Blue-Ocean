import React, { useEffect } from 'react';
import axios from 'axios';
import logo from "../../../dist/SONAR_logo.png";

function Login({ roomID }) {

  let authLoginRedirect = '/auth/login';
  if (roomID) {
    authLoginRedirect = `/auth/login?roomID=${roomID}`;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-block">
          <img className="logo" src={logo}></img>
          <p>Sonar v1.0</p>
        </div>
        <h1>HOST A ROOM?</h1>
        <p>Play and listen to music with friends</p>
        <div className="login-wrapper">
          <a className="btn-spotify" href={authLoginRedirect}>
            Login with Spotify    <i class="fa fa-spotify"></i>
          </a>
        </div>
      </header>
    </div>
  );
}

export default Login;
