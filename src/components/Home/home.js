import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch("https://songs-api-ubiwhere.now.sh/api/songs")
      .then(response => response.json())
      .then(data => this.setState({ data }));
      
  }

  
  render() {
    const { songs } = this.state.data;
    console.log(this.state.data)
    return (
        this.state.data == null ? <p>nothing</p> : this.state.data.map(item => (
            <p>{item.artist} - {item.title}</p>
            
    
        ))
    )
    
 }
}

export default Home;
