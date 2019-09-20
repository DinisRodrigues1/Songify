import React, { Component } from "react";
import styled, { css } from "styled-components";
import GlobalStyle from "../../GlobalStyles/globalStyles";
import {Home} from "styled-icons/boxicons-solid/Home"
import {Music} from "styled-icons/boxicons-solid/Music"
import {User} from "styled-icons/boxicons-solid/User"
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
    background-image: repeating-linear-gradient(#4d4d4d 10%, #2b2b2b 10%);
    position: fixed;
    bottom: 0;    
    margin-top: 10%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: thin solid black;
    
`
const NaviLink = styled(NavLink)`
    text-decoration: none;
    color: #bababa;
    margin: 5%;
    
    
    &:hover {
      color: white;
      transition: color, 0.8s, linear 0.2s;
      
    }

    &.active {
      color: white;
    }
`
const LinkTxt = styled.span`
    vertical-align: middle;
    margin-left: 1%;
    
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
                <NaviLink exact to="/"><Home size="27" title="Homepage"/><LinkTxt>Home</LinkTxt></NaviLink>
                <NaviLink to="/login"><User size="27" title="User page"/><LinkTxt>User</LinkTxt></NaviLink>
                <NaviLink to="library"><Music size="27" title="Music Library"/><LinkTxt>Library</LinkTxt></NaviLink>
            </Nav>
        )
      }
}

export default Navigation