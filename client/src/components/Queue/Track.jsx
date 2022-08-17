import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function Track({ track, username, token }) {
  const [likeCount, setLikeCount] = useState("");
  const [dislikeCount, setDislikeCount] = useState("");
  const [likeStatus, setLikeStatus] = useState(false);
  const [dislikeStatus, setDislikeStatus] = useState(false);

  // useEffect(() => {
  //   axios.post(
  //     `https://api.spotify.com/v1/me/player/queue?device_id=${device_id}&uri=${spotify:track:35xilew5nalcetOeytaDFj}`,
  //     null,
  //     { headers: { Authorization: `Bearer ${token}` } }
  //   );
  // }, []);

  useEffect(() => {
    axios
      .get("/findLikes", { params: { uri: track.uri } })
      .then((response) => {
        console.log("response for get likes: ", response.data);
        setLikeCount(response.data.likes);
        setDislikeCount(response.data.dislikes);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("testing useEffect change");
  }, [likeStatus, dislikeStatus]);

  const handleLike = (button) => {
    const params = {
      user: username,
      action: button,
      uri: track.uri,
    };
    axios
      .put(`/action/${track.uri}`, params)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log("error liking track", err);
      });
    if (button === "like") {
      setLikeStatus(true);
      console.log("changed like status");
    } else {
      setDislikeStatus(true);
    }
  };

  return (
    <div>
      <SongContainer>
        <SongImage src={track.songImg} />
        <InnerContainer>
          <ArtistName>{track.artist}</ArtistName>
          <SongName>{track.songName}</SongName>
          <ThumbsContainer>
            <LikesContainer>
              <ThumbsUp onClick={() => handleLike("like")} />
              <Count>{likeCount}</Count>
            </LikesContainer>
            <LikesContainer>
              <ThumbsDown onClick={() => handleLike("dislike")} />
              <Count>{dislikeCount}</Count>
            </LikesContainer>
          </ThumbsContainer>
        </InnerContainer>
      </SongContainer>
    </div>
  );
}

const ThumbsContainer = styled.div`
  display: flex;
`;

const LikesContainer = styled.div`
  display: flex;
`;

const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  height: 10px;
  width: 10px;
  border: 1px solid;
  border-radius: 50%;
`;

const SongContainer = styled.div`
  border: 1px solid;
  border-radius: 10px;
  display: flex;
  margin-bottom: 10px;
`;

const InnerContainer = styled.div`
  margin-top: 10px;
`;
const ArtistName = styled.div``;
const SongName = styled.div``;
const SongImage = styled.img`
  height: 60px;
  width: 60px;
  margin: 10px;
`;

const ThumbsUp = styled(FaThumbsUp)`
  height: 20px;
  width: 20px;
`;

const ThumbsDown = styled(FaThumbsDown)`
  height: 20px;
  width: 20px;
`;
