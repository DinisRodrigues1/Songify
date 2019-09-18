import React, { Component } from "react";
import styled, { css } from "styled-components";
import GlobalStyle from "../../globalStyles/globalStyles";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom"


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


const Nav = styled.nav`
    width: 100%;
    margin: 0 auto;
    height: 10vh;
    background-image: repeating-linear-gradient(#4d4d4d 10%, #2b2b2b 10%)    
`

class Navigation extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          data: []
        };
      }

      render() {

        return(
            <Nav>
                <NavLink>Home</NavLink>
                <NavLink>User</NavLink>
            </Nav>
        )
      }
}

export default Navigation