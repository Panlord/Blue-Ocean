import React from 'react';
import axios from 'axios';
import logo from "../../../dist/SONAR_logo.png";

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-block">
          <img className="logo" src={logo}></img>
          <p>sonar version 1.0</p>
        </div>
        <h1>HOST A ROOM?</h1>
        <p>play and listen to music with friends</p>
        <div className="login-wrapper">
          <a className="btn-spotify" href="/auth/login">
            Login with Spotify    <i class="fa fa-spotify"></i>
          </a>
        </div>
      </header>
    </div>
  );
}

export default Login;
