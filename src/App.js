import React, { Component } from "react";
import Home from "./components/Home/home.js";
import GlobalStyle from "./globalStyles/globalStyles.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import songDetails from "./components/SongDetails/songDetails.js";

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
          <GlobalStyle />
        </Switch>
      </Router>
    );
  }
}

export default App;
