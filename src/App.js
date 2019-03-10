import React, { Component } from "react";
import "./App.css";
import Guess from "./Guess";

class App extends Component {
  state = {
    trials: 5
  };
  render() {
    return (
      <div class="w3-container w3-blue">
        <Guess trials={this.state.trials} />
      </div>
    );
  }
}

export default App;

// random value generated
