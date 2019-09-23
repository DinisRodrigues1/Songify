import React, { Component } from "react";
import styled, { css } from "styled-components";
import GlobalStyle from "../GlobalStyles/globalStyles";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/navigation";
import { connect } from "react-redux";
import { getSongs } from "../../actions/songActions";

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
 

  ${media.desktop`
  width: 90%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2fr;
  margin: 5% auto 18% auto;
  `}

  ${media.tablet`
  width: 92%;
 `}


  ${media.phone`
  width: 95%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr;
  margin: 5% auto 30% auto;
  grid-gap: 20px 20px;
  `}
  `;
const Img = styled.img`
  max-height: 100%;
  max-width: 100%;
  border: thin solid black;
`;

const PageName = styled.h1`
  max-width: 82%;
  margin: 2% auto 0 auto;

  ${media.desktop`
  width: 90%;`}

  ${media.tablet`
  width: 92%;
  `}

  ${media.phone`
  width: 95%;`}
`;

class Home extends Component {
  componentDidMount = () => {
    this.props.getSongs();
  };

  render() {
    console.log(this.props);
    const songs = this.props.songs;
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

const mapStateToProps = state => {
  return {
    songs: state.songs.songs
  };
};

export default connect(
  mapStateToProps,
  { getSongs }
)(Home);
