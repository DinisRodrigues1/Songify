import React, { Component } from "react";
import styled, { css } from "styled-components";
import GlobalStyle from "../GlobalStyles/globalStyles";
import Navigation from "../Navigation/navigation";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import {
  getSong,
  addToFavorites,
  getSongFavorites,
  removeFavorite
} from "../../actions/songActions";

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

const DetailContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px 650px;
  grid-template-rows: 200px 200px;
  justify-items: stretch;
  align-items: start;
  margin: 3rem auto;
  max-width: 70%;

  ${media.desktop`
  width: 80%;
  `}
  ${media.tablet`
  grid-template-columns: 2fr;
  grid-template-rows: 1fr;
  justify-items: center;
  `}
  ${media.phone`
  grid-template-columns: 2fr;
  grid-template-rows: 1fr;
  justify-items: center;
  `}
`;

const Img = styled.img`
  max-height: 100%;
  max-width: 100%;
  border: thin solid black;
`;

const SongName = styled.h1`
  font-weight: 900;
  color: white;
  text-decoration: none;
`;
const FadedTxt = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #c2c2c2;
`;

const Heart = styled.span`
background-color: white;
border-color: white;
display: inline-block;
cursor: pointer;
height: 10px;
margin: 0 10px;
position: relative;
top: 0;
transform: rotate(-45deg);
width: 10px;
}

&:before,
&:after {
content: "";
background-color: white;
border-color: white;
border-radius: 50%;
height: 10px;
position: absolute;
width: 10px;
}

&:before {
top: -5px;
left: 0;
}

&:after {
left: 5px;
top: 0;
}
`;

const LinkTo = styled.a`
  text-decoration: none;
  color: white;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const FavTxt = styled.span``;

const FavoriteBtn = styled.a`
  margin-left: 10px;  
  background: #1e2d75 no-repeat -12px center;
  border: 1px solid black;
  border-radius: 4px;
  color: #fff;
  display: inline-block;
  font-size: 0.8em;
  font-weight: 700;
  cursor: pointer;
  overflow: hidden;
  padding: 5px 8px 3px 8px;
  text-decoration: none;
  vertical-align: middle;
  text-transform: uppercase;
  transition: padding .2s ease, background-position .2s ease, transform .5s ease;;


&:${FavTxt} &:${Heart} {
  margin: 0;
  padding: 0;
}

&:hover {
    transform: scale(1, 1);
    padding-left: 88px;
    padding-right: 5px;
    background-position: 5px center;
}

& ${FavTxt}:nth-child(1) {
  position: absolute;
  left: -70px;
  transition: left .2s ease;
  line-height: 10px;
}

&:hover ${FavTxt}:nth-child(1) {
  left: 20px;
}
 
}`;

const SongTxt = styled.p`
  margin-top: 0;
  ${media.tablet`
  display: none;`}
`;

const UnfavoriteBtn = styled.a`
margin-left: 10px;
  background: #ffffff no-repeat -12px center;
  border: 1px solid black;
  border-radius: 4px;
  color: #1e2d75;
  display: inline-block;
  font-size: 0.8em;
  font-weight: 700;
  cursor: pointer;
  overflow: hidden;
  padding: 5px 8px 3px 8px;
  text-decoration: none;
  vertical-align: middle;
  text-transform: uppercase;
  transition: padding .2s ease, background-position .2s ease, transform .5s ease;;


&:${FavTxt} &:${Heart} {
  margin: 0;
  padding: 0;
}

&:hover {
    transform: scale(1, 1);
    padding-left: 100px;
    padding-right: 5px;
    background-position: 5px center;
}

& ${FavTxt}:nth-child(1) {
  position: absolute;
  left: -100px;
  transition: left .2s ease;
  line-height: 12px;
}

&:hover ${FavTxt}:nth-child(1) {
  left: 10px;
}
 
}`;
const Unheart = styled.span`
background-color: #1e2d75;
border-color: black;
display: inline-block;
cursor: pointer;
height: 10px;
margin: 0 10px;
position: relative;
top: 0;
transform: rotate(-45deg);
width: 10px;
}

&:before,
&:after {
content: "";
background-color: #1e2d75;
border-color: black;
border-radius: 50%;
height: 10px;
position: absolute;
width: 10px;
}

&:before {
top: -5px;
left: 0;
}

&:after {
left: 5px;
top: 0;
}
`;

class songDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: false
    };
  }

  componentDidMount = async () => {
    await this.props.getSong(this.props.location.params.song);
    await this.props.getSongFavorites();
  };

  handleAdd = e => {
    e.preventDefault();
    this.props.addToFavorites(this.props.location.params.song);
    this.props.getSongFavorites();
    this.setState = prevState => ({
      isFavorite: !prevState.isFavorite
    });
  };

  handleRemove = e => {
    e.preventDefault();
    this.props.removeFavorite(this.props.location.params.song);
    this.props.getSongFavorites();
    this.setState = prevState => ({
      isFavorite: !prevState.isFavorite
    });
  };

  render() {
    let detail = this.props.detail;
    const favorites = this.props.favorite.map(i => i.id);
    if (favorites.includes(this.props.location.params.song)) {
      this.setState = prevState => ({
        isFavorite: !prevState.isFavorite
      })
    }

    return (
      <>
        <Navigation />
        <DetailContainer>
          <div>
            <Img src={detail.imgUrl} />
          </div>
          <div>
            <SongTxt>Song</SongTxt>
            <SongName>{detail.title}</SongName>
            <p>
              <FadedTxt>By</FadedTxt> {detail.artist}
            </p>
            <FadedTxt>
              {detail.year}
              {favorites.includes(this.props.location.params.song) ? (
                <UnfavoriteBtn onClick={this.handleRemove}>
                  <FavTxt>Unfavorite</FavTxt>
                  <Unheart></Unheart>
                </UnfavoriteBtn>
              ) : (
                <FavoriteBtn onClick={this.handleAdd}>
                  <FavTxt>Favorite</FavTxt>
                  <Heart></Heart>
                </FavoriteBtn>
              )}
            </FadedTxt>
            <p>
              <LinkTo href={detail.webUrl}>Read the lyrics</LinkTo>
            </p>
          </div>
          <GlobalStyle />
        </DetailContainer>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    detail: state.songs.item,
    auth: state.auth.currentUser,
    favorite: state.songs.favs
  };
};

export default withRouter( connect(
  mapStateToProps,
  { getSong, addToFavorites, removeFavorite, getSongFavorites }
)(songDetails));
