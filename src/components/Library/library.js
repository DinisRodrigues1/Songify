import React, { Component } from "react";
import GlobalStyle from "../../GlobalStyles/globalStyles";
import Navigation from "../Navigation/navigation"

export class Library extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <h1>Library</h1>
        <GlobalStyle/>
      </div>
    );
  }
}

export default Library;
