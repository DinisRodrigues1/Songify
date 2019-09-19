import React, { Component } from "react";
import styled, { css } from "styled-components";
import GlobalStyle from "../../globalStyles/globalStyles";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navigation from "../Navigation/navigation";
import axios from "axios";

//Page Styling
const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576
};

// eslint-disable-next-line
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

const SongName = styled(Link)`
  font-size: 0.9rem;
  font-weight: 900;
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const ArtName = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: #c2c2c2;
`;

const HomeContainer = styled.div`
  display: grid;
  grid-gap: 50px 50px;
  grid-template-columns: 180px 180px 180px 180px 180px;
  grid-template-rows: 250px 250px 250px 250px 250px;
  justify-items: center;
  align-items: start;
  justify-content: space-evenly;
  margin: 5% auto 5% auto;
  max-width: 82%;
`;

const Img = styled.img`
  max-height: 100%;
  max-width: 100%;
  border: thin solid black;
`;

const PageName = styled.h1`
  max-width: 82%;
  margin: 2% auto 0 auto;
`;


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: []
    };
  }

  componentDidMount() {
    axios.get("https://songs-api-ubiwhere.now.sh/api/songs")
      .then(res => {
        const songs = res.data;
        this.setState ({ songs })
      })
  }

  render() {
    const songs = this.state.songs
    console.log(songs);
    return (
      <>
        <Navigation />
        <PageName>Home</PageName>
        <HomeContainer>
        
          {songs.map(item => (
            <div key={item.id}>
              <Img src={item.imgUrl} />

              <SongName
                id={item.id}
                to={{ pathname: `/song/${item.id}`, params: { song: item.id } }}
              >
                {item.title}
              </SongName>
              <ArtName>{item.artist}</ArtName>
            </div>
          ))}
          <GlobalStyle />
        </HomeContainer>
      </>
    );
  }
}

export default Home;
