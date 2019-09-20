import React, { Component } from "react";
import Home from "./components/Home/home.js";
import GlobalStyle from "./GlobalStyles/globalStyles.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import songDetails from "./components/SongDetails/songDetails.js";
import Login from "./components/Login/login.js";
import Library from "./components/Library/library.js";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path={`/song/:id`} component={songDetails} />
          <Route path="/login" exact component={Login} />
          <Route path="/library" exact component={Library} />
          <GlobalStyle />
        </Switch>
      </Router>
    );
  }
}

export default App;
