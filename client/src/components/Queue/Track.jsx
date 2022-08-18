import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function Track({ track, user, token }) {
  const [likeCount, setLikeCount] = useState("");
  const [dislikeCount, setDislikeCount] = useState("");
  const [likeStatus, setLikeStatus] = useState(false);
  const [dislikeStatus, setDislikeStatus] = useState(false);


  useEffect(() => {
    axios.get("/findLikes", { params: { uri: track.uri } })
      .then((response) => {
        console.log("response for get likes: ", response.data);
        setLikeCount(response.data.likes);
        setDislikeCount(response.data.dislikes);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("testing useEffect change");
  }, []);

  const handleLike = (button) => {
    const params = {
      user: username,
      action: button,
      uri: track.uri,
    };
    axios.put(`/action/${track.uri}`, params)
      .then((response) => {
        console.log('put axios response.data', response.data);
        setLikeCount(response.data.likes);
        setDislikeCount(response.data.dislikes);
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
          <AddedBy>Added By: {user}</AddedBy>
        </InnerContainer>
      </SongContainer>
    </div>
  );
}

const AddedBy = styled.div`
font-size: 15px;
color: black;
`

const ThumbsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 7px;

`;

const LikesContainer = styled.div`
  display: flex;
  margin: 2px;
`;

const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  height: 10px;
  width: 10px;
  border: 1px solid black;
  border-radius: 50%;
`;

const SongContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  margin-bottom: 10px;
  background-color: #BACCEB;
`;

const InnerContainer = styled.div`
  margin-top: 10px;
`;
const ArtistName = styled.div`
color: black;
font-size: 20px;
`;

const SongName = styled.div`
font-size: 15px;
color: black;
`;

const SongImage = styled.img`
  height: 60px;
  width: 60px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid blac
`;

const ThumbsUp = styled(FaThumbsUp)`
  height: 15px;
  width: 15px;
  color: black;
`;

const ThumbsDown = styled(FaThumbsDown)`
  height: 15px;
  width: 15px;
  color: black;
`;
