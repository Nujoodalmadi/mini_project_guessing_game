import React, { Component } from "react";
import Track from "./Track";
import GameOver from "./GameOver";
import Correct from "./Correct";

class Guess extends Component {
  state = {
    randomNumber: 34,
    guessInput: "",
    guess: "",
    trials: this.props.trials,
    message: "",
    hints: []
  };

  // methodsmethodsmethodsmethodsmethodsmethods

  howClose = () => {
    return Math.abs(parseInt(this.state.guessInput) - this.state.randomNumber);
  };

  trialsDecrease = () => {
    return this.state.trials - 1;
  };

  randomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  handleUserInput = x => {
    this.setState({ guessInput: x.target.value });
  };

  guessClick = () => {
    this.setState({
      guess: parseInt(this.state.guessInput),
      guessInput: ""
    });
    this.displayMessage();
  };

  clearClick = () => {
    this.setState({ guessInput: "" });
  };

  hintClick = () => {
    this.setState({ hints: this.generateHints() });
  };

  resetClick = () => {
    this.setState({
      guessInput: "",
      guess: "",
      randomNumber: this.randomNumber(),
      message: "",
      hints: [],
      trials: this.props.trials
    });
  };

  displayMessage = () => {
    if (
      parseInt(this.state.guessInput) > 100 ||
      parseInt(this.state.guessInput) < 1
    ) {
      this.setState({
        message: "Your guess has to be between 1 and 100"
      });
    } else if (parseInt(this.state.guessInput) === this.state.randomNumber) {
      this.setState({
        message: "Correct!",
        randomNumber: this.randomNumber(),
        trials: this.props.trials
      });
    } else if (this.howClose() < 5) {
      this.setState({
        message: "Hot!",
        trials: this.trialsDecrease()
      });
    } else if (this.howClose() < 25) {
      this.setState({
        message: "Warm!",
        trials: this.trialsDecrease()
      });
    } else {
      this.setState({
        message: "Cold! ",
        trials: this.trialsDecrease()
      });
    }
  };

  generateHints = () => {
    let hintList = [
      this.state.randomNumber,
      this.randomNumber(),
      this.randomNumber(),
      this.randomNumber()
    ].sort(function(a, b) {
      return a - b;
    });
    return hintList;
  };

  selectHint = index => {
    this.setState({ guessInput: this.state.hints[index] });
  };

  //   methodsmethodsmethodsmethodsmethodsmethods

  render() {
    let display;
    const notZero = this.state.trials !== 0;

    if (notZero && this.state.message !== "Correct!") {
      display = (
        <Track
          trials={this.state.trials}
          message={this.state.message}
          hints={this.state.hints}
          randomNumber={this.state.randomNumber}
        />
      );
    } else if (!notZero) {
      display = <GameOver />;
    } else {
      display = <Correct />;
    }

    return (
      <main className="container">
        {display}

        <div className="left-container">
          <h3>What's your guess?</h3>

          <input
            type="number"
            className="guess-input-field"
            value={this.state.guessInput}
            onChange={this.handleUserInput.bind(this)}
            placeholder="1-100"
          />

          <section className="buttons">
            <button
              className="GuessButton"
              onClick={this.guessClick.bind(this)}
              disabled={this.state.guessInput === "" ? true : false}
            >
              GUESS
            </button>

            <button
              className="ClearButton"
              onClick={this.clearClick.bind(this)}
              disabled={this.state.guessInput === "" ? true : false}
            >
              Clear
            </button>

            <button
              className="ResetButton"
              onClick={this.resetClick.bind(this)}
            >
              Reset
            </button>
            <button className="HintButtonH" onClick={this.hintClick.bind(this)}>
              Hint
            </button>
            <h4>Hints</h4>

            <br />

            <button className="HintButton" onClick={() => this.selectHint(0)}>
              {this.state.hints[0]}
            </button>
            <button className="HintButton" onClick={() => this.selectHint(1)}>
              {this.state.hints[1]}
            </button>
            <button className="HintButton" onClick={() => this.selectHint(2)}>
              {this.state.hints[2]}
            </button>
            <button className="HintButton" onClick={() => this.selectHint(3)}>
              {this.state.hints[3]}
            </button>
          </section>
        </div>
      </main>
    );
  }
}

export default Guess;
