import React, { Component } from "react";
import styled, { css } from "styled-components";
import GlobalStyle from "../../GlobalStyles/globalStyles";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Navigation from "../Navigation/navigation";

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

const LoginContainer = styled.div`
  display: grid;
  grid-gap: 30px 30px;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1fr;
  justify-items: center;
  align-items: start;
  justify-content: space-evenly;
  margin: 5% auto 5% auto;
  max-width: 70%;
  justify-items: center;

`;
const PageName = styled.h1`
  max-width: 70%;
  margin: 2% auto 0 auto;
`;

const Input = styled.input`
  width: 20vw;
`

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  render() {
    return (
      <>
        <Navigation/>
        <PageName>Login</PageName>
        <LoginContainer>
          <form>
          <div>
          <h2>Username</h2>
          <Input type="text" name="username"/>
          </div>
          <div>
          <h2>Password</h2>  
          <Input type="password" name="password"/>
          </div>
          </form>
        </LoginContainer>
        <GlobalStyle />
      </>
    );
  }
}

export default Login;
