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
  grid-gap: 50px 50px;
  grid-template-columns: 180px 180px 180px 180px;
  grid-template-rows: 250px 250px 250px 250px;
  justify-items: stretch;
  align-items: start;
`;

class songDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
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
        <p>Hello there, {detail.artist}</p>
        <GlobalStyle />
      </DetailContainer>
    );
  }
}

export default songDetails;
