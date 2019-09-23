import React, { Component } from "react";
import styled, { css } from "styled-components";
import GlobalStyle from "../../GlobalStyles/globalStyles";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect
} from "react-router-dom";
import Navigation from "../Navigation/navigation";
import { connect } from "react-redux";
//import { userCheck } from "../../actions/loginActions"
import { userRegister} from "../../actions/loginActions"


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

const RegisterContainer = styled.div`
  display: grid;
  grid-gap: 30px 30px;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  justify-items: center;
  align-items: start;
  justify-content: space-evenly;
  margin: 5% auto 5% auto;
  max-width: 82%;
  justify-items: center;
`;
const PageName = styled.h1`
  max-width: 82%;
  margin: 2% auto 0 auto;
`;

const Input = styled.input`
  width: 20vw;
  border: solid thin black;
  border-radius: 0.8em;
  margin: 0.5em 0 0.5em 0;
  padding: 0.5em 0 0.5em 0.5em;
`;
const InputTitle = styled.h2``;
const Submit = styled.input`
  background-color: #1e2d75;
  border: solid thin black;
  color: white;
  border-radius: 1em;
  margin: 0.5em 0 0.5em 0;
  padding: 0.5em 1.5em 0.5em 1.5em;
  font-size: 0.9em;
  transition: background-color 0.5s linear;
  cursor: pointer;

  &: hover {
    background-color: #293b91;
  }
`;



class Login extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.state = {
      email: "",
      password: "",
      name: ""
    };
  }


  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //async below
  handleSubmit = e => {
    e.preventDefault();
    this.props.userRegister(this.state)
  /*  try {
      await this.props.auth.currentUser
      this.props.userCheck(this.state);
      this.props.history.push("/")
    } catch (e) {
      alert(e.message)
    }*/
    };
  render() {
    console.log(this.props)
    const token = localStorage.token;
    
    return (
      
      <>
      {token ? <Redirect to="/"/> :
      <>
        <Navigation />
        <PageName>Register</PageName>
        <form onSubmit={this.handleSubmit}>
          <RegisterContainer>
          <div>
              <InputTitle>Name</InputTitle>
              <Input
                ref={this.inputRef}
                type="text"
                name="name"
                value={this.state.name}
                onMouseEnter={() => {
                  this.inputRef.current.focus();
                }}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <InputTitle>E-mail</InputTitle>
              <Input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <InputTitle>Password</InputTitle>
              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            
            <div>
              <Submit
                type="submit"
                name="submit button"
                value="Entrar"
              />
            </div>
          </RegisterContainer>
        </form>
        
        <GlobalStyle />
        </>
      }
      </>
   
    );
  }
}

/*const mapStateToProps = state => {
  return {
    auth: state.auth.currentUser
  };
};
*/

const mapDispatchToProps = dispatch => ({
  userRegister: userInfo => dispatch(userRegister(userInfo))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
