import React, { Component } from "react";
import styled, { css } from "styled-components";
import GlobalStyle from "../../globalStyles/globalStyles";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { longStackSupport } from "q";

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
  grid-gap: 30px 30px;
  grid-template-columns: 200px 600px;
  grid-template-rows: 200px 300px;
  justify-items: stretch;
  align-items: start;
`;

const Img = styled.img`
  max-height: 100%;
  max-width: 100%;
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

class songDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    console.log(this.props.location.params);
    let info = this.props.location.params.test;
    fetch(`https://songs-api-ubiwhere.now.sh/api/songs/${info}`)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {
    let detail = this.state.data;
    console.log(detail);
    return (
      <DetailContainer>
        <div>
          <Img src={detail.imgUrl} />
        </div>
        <div>
          <p>Song</p>
          <SongName>{detail.title}</SongName>
          <p>
            <FadedTxt>By</FadedTxt> {detail.artist}
          </p>
          <FadedTxt>
            {detail.year}
            <FavoriteBtn>
              <FavTxt>Favorite</FavTxt>
              <Heart></Heart>
            </FavoriteBtn>
          </FadedTxt>
        </div>
        <GlobalStyle />
      </DetailContainer>
    );
  }
}

export default songDetails;
