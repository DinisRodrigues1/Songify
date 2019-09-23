import React, { Component } from "react";
import Home from "./components/Home/home.js";
import GlobalStyle from "./GlobalStyles/globalStyles.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import songDetails from "./components/SongDetails/songDetails.js";
import Login from "./components/Login/login.js";
import Register from "./components/Register/register.js";
import Library from "./components/Library/library.js";
import { connect } from "react-redux";
import { getUser } from "./actions/loginActions";

class App extends Component {
  componentDidMount = () => {
    this.props.getUser();
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path={`/song/:id`} component={songDetails} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/library" component={Library} />
          <GlobalStyle />
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
