import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchForm = styled.form`
  max-width: 600px;
  height: 36px;
  display: flex;
  position: relative;
  flex-grow: 1;
  background-color: #D9D9D9;
  width: 100%;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 8px 0 8px 15px;
  color: #022B3A;
  background-color: #D9D9D9;
  font-size: 18px;
`;

const SearchIcon = styled.div`
  display: flex;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  border-radius: 5px;
  color: #022B3A;
  cursor: pointer;
`;

const SearchResult = styled.ul`
  position: absolute;
  top: 36px;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border-radius: 3px;
  background-color: #D9D9D9;
  border-top: 1px solid #FFF;
  ${'' /* opacity: 0; */}
`;

const List = styled.li`
  list-style: none;
  padding: 10px 0 10px 10px;;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: default;
  border-radius: 3px;
  ${'' /* display: none; */}
  &:hover {
    color: #FFF;
    background-color: #1F7A8C;
    cursor: pointer;
  }
`;

export default function SearchBar({ setQueue }) {
  const [searchEntry, setSearchEntry] = useState('');
  const [songs, setSongs] = useState([]);

  const searchSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    const options = {
      url: 'https://api.spotify.com/v1/search',
      headers: { Authorization: process.env.TOKEN },
      params: {
        q: searchValue,
        type: 'track',
        market: 'US',
        limit: 5,
      },
    };
    axios(options)
      .then((response) => {
        setSongs(response.data.tracks.items);
      })
      .catch((err) => console.log(err));
  };

  const addToQueue = (e, song) => {
    e.preventDefault();
    setQueue((prev) => [...prev, {
      name: song.name,
      artist: song.album.artists[0].name,
      imageURL: song.album.images[0].url,
      uri: song.uri,
    }]);
  };

  useEffect(() => {

  }, [songs]);

  return (
    <Container>
      <SearchForm onSubmit={(e) => { searchSubmit(e); }}>
        <Input type="text" name="search" placeholder="Choose a song..." />
        <SearchIcon>
          <i className="fa fa-search" />
        </SearchIcon>
        <SearchResult>
          {songs.map((song) => <List type="button" onClick={(e) => { addToQueue(e, song); }} key={song.id}>{song.name}</List>)}
        </SearchResult>
      </SearchForm>
    </Container>
  );
}

/**
 * {
    "href": "https://api.spotify.com/v1/search?query=friday&type=track&market=US&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=5",
    "items": [
        {
            "album": {
                "album_type": "album",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/7bu3H8JO7d0UbMoVzbo70s"
                        },
                        "href": "https://api.spotify.com/v1/artists/7bu3H8JO7d0UbMoVzbo70s",
                        "id": "7bu3H8JO7d0UbMoVzbo70s",
                        "name": "The Cure",
                        "type": "artist",
                        "uri": "spotify:artist:7bu3H8JO7d0UbMoVzbo70s"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/3x1CmNdXWU0DzpTZXFFRZu"
                },
                "href": "https://api.spotify.com/v1/albums/3x1CmNdXWU0DzpTZXFFRZu",
                "id": "3x1CmNdXWU0DzpTZXFFRZu",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b273e410fa31e3dfcc7521cde86d",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e02e410fa31e3dfcc7521cde86d",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/ab67616d00004851e410fa31e3dfcc7521cde86d",
                        "width": 64
                    }
                ],
                "name": "Wish",
                "release_date": "1992-04-21",
                "release_date_precision": "day",
                "total_tracks": 12,
                "type": "album",
                "uri": "spotify:album:3x1CmNdXWU0DzpTZXFFRZu"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/7bu3H8JO7d0UbMoVzbo70s"
                    },
                    "href": "https://api.spotify.com/v1/artists/7bu3H8JO7d0UbMoVzbo70s",
                    "id": "7bu3H8JO7d0UbMoVzbo70s",
                    "name": "The Cure",
                    "type": "artist",
                    "uri": "spotify:artist:7bu3H8JO7d0UbMoVzbo70s"
                }
            ],
            "disc_number": 1,
            "duration_ms": 214400,
            "explicit": false,
            "external_ids": {
                "isrc": "USEE10180267"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/263aNAQCeFSWipk896byo6"
            },
            "href": "https://api.spotify.com/v1/tracks/263aNAQCeFSWipk896byo6",
            "id": "263aNAQCeFSWipk896byo6",
            "is_local": false,
            "is_playable": true,
            "name": "Friday I'm in Love",
            "popularity": 69,
            "preview_url": "https://p.scdn.co/mp3-preview/958e347444599fa593cb2d86459e67ad18719c72?cid=00d7458e267a40cb88fd2c6b6a09d42d",
            "track_number": 7,
            "type": "track",
            "uri": "spotify:track:263aNAQCeFSWipk896byo6"
        },
        {
            "album": {
                "album_type": "album",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/6jJ0s89eD6GaHleKKya26X"
                        },
                        "href": "https://api.spotify.com/v1/artists/6jJ0s89eD6GaHleKKya26X",
                        "id": "6jJ0s89eD6GaHleKKya26X",
                        "name": "Katy Perry",
                        "type": "artist",
                        "uri": "spotify:artist:6jJ0s89eD6GaHleKKya26X"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/2eQMC9nJE3f3hCNKlYYHL1"
                },
                "href": "https://api.spotify.com/v1/albums/2eQMC9nJE3f3hCNKlYYHL1",
                "id": "2eQMC9nJE3f3hCNKlYYHL1",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b273d20c38f295039520d688a888",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e02d20c38f295039520d688a888",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/ab67616d00004851d20c38f295039520d688a888",
                        "width": 64
                    }
                ],
                "name": "Teenage Dream",
                "release_date": "2010-01-01",
                "release_date_precision": "day",
                "total_tracks": 12,
                "type": "album",
                "uri": "spotify:album:2eQMC9nJE3f3hCNKlYYHL1"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/6jJ0s89eD6GaHleKKya26X"
                    },
                    "href": "https://api.spotify.com/v1/artists/6jJ0s89eD6GaHleKKya26X",
                    "id": "6jJ0s89eD6GaHleKKya26X",
                    "name": "Katy Perry",
                    "type": "artist",
                    "uri": "spotify:artist:6jJ0s89eD6GaHleKKya26X"
                }
            ],
            "disc_number": 1,
            "duration_ms": 230733,
            "explicit": false,
            "external_ids": {
                "isrc": "USCA21001264"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/3avYqdwHKEq8beXbeWCKqJ"
            },
            "href": "https://api.spotify.com/v1/tracks/3avYqdwHKEq8beXbeWCKqJ",
            "id": "3avYqdwHKEq8beXbeWCKqJ",
            "is_local": false,
            "is_playable": true,
            "name": "Last Friday Night (T.G.I.F.)",
            "popularity": 73,
            "preview_url": null,
            "track_number": 2,
            "type": "track",
            "uri": "spotify:track:3avYqdwHKEq8beXbeWCKqJ"
        },
        {
            "album": {
                "album_type": "single",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/7i9j813KFoSBMldGqlh2Z1"
                        },
                        "href": "https://api.spotify.com/v1/artists/7i9j813KFoSBMldGqlh2Z1",
                        "id": "7i9j813KFoSBMldGqlh2Z1",
                        "name": "Riton",
                        "type": "artist",
                        "uri": "spotify:artist:7i9j813KFoSBMldGqlh2Z1"
                    },
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/1gALaWbNDnwS2ECV09sn2A"
                        },
                        "href": "https://api.spotify.com/v1/artists/1gALaWbNDnwS2ECV09sn2A",
                        "id": "1gALaWbNDnwS2ECV09sn2A",
                        "name": "Nightcrawlers",
                        "type": "artist",
                        "uri": "spotify:artist:1gALaWbNDnwS2ECV09sn2A"
                    },
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/4L2dV3zY7RmkeiNO035Fi0"
                        },
                        "href": "https://api.spotify.com/v1/artists/4L2dV3zY7RmkeiNO035Fi0",
                        "id": "4L2dV3zY7RmkeiNO035Fi0",
                        "name": "Mufasa & Hypeman",
                        "type": "artist",
                        "uri": "spotify:artist:4L2dV3zY7RmkeiNO035Fi0"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/39qsmsNRXjVaFqTZj9af0j"
                },
                "href": "https://api.spotify.com/v1/albums/39qsmsNRXjVaFqTZj9af0j",
                "id": "39qsmsNRXjVaFqTZj9af0j",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b273815cb538fd7821595b2bc8c5",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e02815cb538fd7821595b2bc8c5",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/ab67616d00004851815cb538fd7821595b2bc8c5",
                        "width": 64
                    }
                ],
                "name": "Friday (feat. Mufasa & Hypeman) [Dopamine Re-Edit]",
                "release_date": "2021-01-15",
                "release_date_precision": "day",
                "total_tracks": 1,
                "type": "album",
                "uri": "spotify:album:39qsmsNRXjVaFqTZj9af0j"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/7i9j813KFoSBMldGqlh2Z1"
                    },
                    "href": "https://api.spotify.com/v1/artists/7i9j813KFoSBMldGqlh2Z1",
                    "id": "7i9j813KFoSBMldGqlh2Z1",
                    "name": "Riton",
                    "type": "artist",
                    "uri": "spotify:artist:7i9j813KFoSBMldGqlh2Z1"
                },
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/1gALaWbNDnwS2ECV09sn2A"
                    },
                    "href": "https://api.spotify.com/v1/artists/1gALaWbNDnwS2ECV09sn2A",
                    "id": "1gALaWbNDnwS2ECV09sn2A",
                    "name": "Nightcrawlers",
                    "type": "artist",
                    "uri": "spotify:artist:1gALaWbNDnwS2ECV09sn2A"
                },
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/4L2dV3zY7RmkeiNO035Fi0"
                    },
                    "href": "https://api.spotify.com/v1/artists/4L2dV3zY7RmkeiNO035Fi0",
                    "id": "4L2dV3zY7RmkeiNO035Fi0",
                    "name": "Mufasa & Hypeman",
                    "type": "artist",
                    "uri": "spotify:artist:4L2dV3zY7RmkeiNO035Fi0"
                },
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/3Edve4VIATi0OZngclQlkN"
                    },
                    "href": "https://api.spotify.com/v1/artists/3Edve4VIATi0OZngclQlkN",
                    "id": "3Edve4VIATi0OZngclQlkN",
                    "name": "Dopamine",
                    "type": "artist",
                    "uri": "spotify:artist:3Edve4VIATi0OZngclQlkN"
                }
            ],
            "disc_number": 1,
            "duration_ms": 169153,
            "explicit": false,
            "external_ids": {
                "isrc": "GBCEN2000163"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/4cG7HUWYHBV6R6tHn1gxrl"
            },
            "href": "https://api.spotify.com/v1/tracks/4cG7HUWYHBV6R6tHn1gxrl",
            "id": "4cG7HUWYHBV6R6tHn1gxrl",
            "is_local": false,
            "is_playable": true,
            "name": "Friday (feat. Mufasa & Hypeman) - Dopamine Re-Edit",
            "popularity": 83,
            "preview_url": "https://p.scdn.co/mp3-preview/298f47543a9e721733b6bb1cace0603cf300829a?cid=00d7458e267a40cb88fd2c6b6a09d42d",
            "track_number": 1,
            "type": "track",
            "uri": "spotify:track:4cG7HUWYHBV6R6tHn1gxrl"
        },
        {
            "album": {
                "album_type": "album",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/4TONBKcqVR1LmPdfJxvkMU"
                        },
                        "href": "https://api.spotify.com/v1/artists/4TONBKcqVR1LmPdfJxvkMU",
                        "id": "4TONBKcqVR1LmPdfJxvkMU",
                        "name": "Eric Paslay",
                        "type": "artist",
                        "uri": "spotify:artist:4TONBKcqVR1LmPdfJxvkMU"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/79RwxrHw6uKVimeEGyM00W"
                },
                "href": "https://api.spotify.com/v1/albums/79RwxrHw6uKVimeEGyM00W",
                "id": "79RwxrHw6uKVimeEGyM00W",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b273fd2875075d1ebe88211ae9b2",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e02fd2875075d1ebe88211ae9b2",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/ab67616d00004851fd2875075d1ebe88211ae9b2",
                        "width": 64
                    }
                ],
                "name": "Eric Paslay",
                "release_date": "2014-01-01",
                "release_date_precision": "day",
                "total_tracks": 11,
                "type": "album",
                "uri": "spotify:album:79RwxrHw6uKVimeEGyM00W"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/4TONBKcqVR1LmPdfJxvkMU"
                    },
                    "href": "https://api.spotify.com/v1/artists/4TONBKcqVR1LmPdfJxvkMU",
                    "id": "4TONBKcqVR1LmPdfJxvkMU",
                    "name": "Eric Paslay",
                    "type": "artist",
                    "uri": "spotify:artist:4TONBKcqVR1LmPdfJxvkMU"
                }
            ],
            "disc_number": 1,
            "duration_ms": 167213,
            "explicit": false,
            "external_ids": {
                "isrc": "USCN11300085"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/66rVt7PbwyKlu6CK6rxyAi"
            },
            "href": "https://api.spotify.com/v1/tracks/66rVt7PbwyKlu6CK6rxyAi",
            "id": "66rVt7PbwyKlu6CK6rxyAi",
            "is_local": false,
            "is_playable": true,
            "name": "Friday Night",
            "popularity": 68,
            "preview_url": null,
            "track_number": 2,
            "type": "track",
            "uri": "spotify:track:66rVt7PbwyKlu6CK6rxyAi"
        },
        {
            "album": {
                "album_type": "album",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/0hCNtLu0JehylgoiP8L4Gh"
                        },
                        "href": "https://api.spotify.com/v1/artists/0hCNtLu0JehylgoiP8L4Gh",
                        "id": "0hCNtLu0JehylgoiP8L4Gh",
                        "name": "Nicki Minaj",
                        "type": "artist",
                        "uri": "spotify:artist:0hCNtLu0JehylgoiP8L4Gh"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/7aADdYLiK1z7GlMFr0UIZw"
                },
                "href": "https://api.spotify.com/v1/albums/7aADdYLiK1z7GlMFr0UIZw",
                "id": "7aADdYLiK1z7GlMFr0UIZw",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/ab67616d0000b273aa7d2641af0fa4c1f76fafbf",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/ab67616d00001e02aa7d2641af0fa4c1f76fafbf",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/ab67616d00004851aa7d2641af0fa4c1f76fafbf",
                        "width": 64
                    }
                ],
                "name": "Pink Friday (Complete Edition)",
                "release_date": "2010-11-22",
                "release_date_precision": "day",
                "total_tracks": 21,
                "type": "album",
                "uri": "spotify:album:7aADdYLiK1z7GlMFr0UIZw"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/0hCNtLu0JehylgoiP8L4Gh"
                    },
                    "href": "https://api.spotify.com/v1/artists/0hCNtLu0JehylgoiP8L4Gh",
                    "id": "0hCNtLu0JehylgoiP8L4Gh",
                    "name": "Nicki Minaj",
                    "type": "artist",
                    "uri": "spotify:artist:0hCNtLu0JehylgoiP8L4Gh"
                }
            ],
            "disc_number": 1,
            "duration_ms": 200013,
            "explicit": true,
            "external_ids": {
                "isrc": "USCM51000734"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/3hlksXnvbKogFdPbpO9vel"
            },
            "href": "https://api.spotify.com/v1/tracks/3hlksXnvbKogFdPbpO9vel",
            "id": "3hlksXnvbKogFdPbpO9vel",
            "is_local": false,
            "is_playable": true,
            "name": "Super Bass",
            "popularity": 79,
            "preview_url": null,
            "track_number": 14,
            "type": "track",
            "uri": "spotify:track:3hlksXnvbKogFdPbpO9vel"
        }
    ],
    "limit": 5,
    "next": "https://api.spotify.com/v1/search?query=friday&type=track&market=US&locale=en-US%2Cen%3Bq%3D0.9&offset=5&limit=5",
    "offset": 0,
    "previous": null,
    "total": 10061
}
 */
