import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Home } from "styled-icons/boxicons-solid/Home";
import { Music } from "styled-icons/boxicons-solid/Music";
import { User } from "styled-icons/boxicons-solid/User";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/loginActions";

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
  z-index: 2;
  ${media.desktop`
  height: 10vh`}

  ${media.tablet`
  height: 10vh
  `}

  ${media.phone`
  height: 15vh;
  `}
`;
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
  ${media.desktop`
  font-size: 1.2em`}
`;
const LinkTxt = styled.span`
  vertical-align: middle;
  margin-left: 1%;

  ${media.desktop`
  font-size: 0.9em`}
`;

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  handleClick = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.props.logoutUser();
    this.setState({
      data: []
    });
  };

  render() {
    const token = localStorage.token;
    console.log(this.props);
    return (
      <>
        {token ? (
          <Nav>
            <NaviLink exact to="/">
              <Home size="27" title="Homepage" />
              <LinkTxt>Home</LinkTxt>
            </NaviLink>
            <NaviLink redirect="/" onClick={this.handleClick}>
              <User size="27" title="Logout" />
              <LinkTxt>Logout</LinkTxt>
            </NaviLink>
            <NaviLink exact to="/library">
              <Music size="27" title="Music Library" />
              <LinkTxt>Library</LinkTxt>
            </NaviLink>
          </Nav>
        ) : (
          <Nav>
            <NaviLink exact to="/">
              <Home size="27" title="Homepage" />
              <LinkTxt>Home</LinkTxt>
            </NaviLink>
            <NaviLink to="/login">
              <User size="27" title="Login" />
              <LinkTxt>Login</LinkTxt>
            </NaviLink>
          </Nav>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
