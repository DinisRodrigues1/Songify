import React, { Component } from "react";
import GlobalStyle from "../../GlobalStyles/globalStyles";
import styled, { css } from "styled-components";
import Navigation from "../Navigation/navigation";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../actions/loginActions";
import { getSongFavorites, removeFavorite } from "../../actions/songActions";

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

const LibraryContainer = styled.div`
  display: grid;
  grid-gap: 50px 50px;
  grid-template-columns:1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 2fr;
  justify-items: center;
  align-items: start;
  justify-content: space-evenly;
  margin: 5% auto 10% auto;
  max-width: 82%;
  
  ${media.desktop`
  width: 90%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 2fr;
  margin: 15% auto 5% auto;`}

  ${media.tablet`
  width: 92%;
  `}

  ${media.phone`
  width: 95%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr;
  margin: 12% auto 30% auto;`}
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

const Heart = styled.span`
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

const FavTxt = styled.span``;

const UnfavoriteBtn = styled.a`
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

export class Library extends Component {
  componentDidMount = async () => {
    this.props.getUser();
    await this.props.getSongFavorites();
    await this.props.favorite;
  };

  handleFavorite = param => e => {
    e.preventDefault();
    this.props.removeFavorite(param);
    this.props.getSongFavorites();
  };

  render() {
    const user = this.props.user;
    const favs = this.props.favorite;
    const token = localStorage.token;
    console.log(this.props);
    return (
      <>
        {!token ? (
          <Redirect to="/" />
        ) : (
          <>
            <Navigation />
            <PageName>{user.name}'s Library</PageName>
            {!favs ? (
              <></>
            ) : (
              <LibraryContainer>
                {favs.map(song => (
                  <div key={song.id}>
                    <Img src={song.imgUrl} />
                    <SongName
                      id={song.id}
                      to={{
                        pathname: `/song/${song.id}`,
                        params: { song: song.id }
                      }}
                    >
                      {song.title}
                    </SongName>
                    <ArtName>{song.artist}</ArtName>
                    <UnfavoriteBtn onClick={this.handleFavorite(song.id)}>
                      <FavTxt>Unfavorite</FavTxt>
                      <Heart></Heart>
                    </UnfavoriteBtn>
                  </div>
                ))}
                <GlobalStyle />
              </LibraryContainer>
            )}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.currentUserAuth,
    favorite: state.songs.favs
  };
};

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
  getSongFavorites: () => dispatch(getSongFavorites()),
  removeFavorite: param => dispatch(removeFavorite(param))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
