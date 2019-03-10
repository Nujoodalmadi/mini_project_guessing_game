import React, { Component } from "react";

class Track extends Component {
  render() {
    return (
      <div className="right-container">
        <h3 className="message-pop">{this.props.message}</h3>
        <br />
        <h4 className="message-text">Trials Left: {this.props.trials}</h4>
        <h4 className="message-text">{this.props.randomNumber}</h4>
      </div>
    );
  }
}

export default Track;
