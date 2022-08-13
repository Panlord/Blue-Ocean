import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
`;

export default function Song() {

  const searchChange = (e) => {
    setSearchEntry(e.target.value);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    // API get request with searchEntry
  };

  return (
    <Container>
      <form onSubmit={searchSubmit}>
        <input type="text" value={searchEntry} onChange={searchChange} placeholder="Search for a song..." required />
        <button type="submit">Search</button>
        {/* {songs.map((song, key) => <Song song={song} />)} */}
      </form>
    </Container>
  );
}