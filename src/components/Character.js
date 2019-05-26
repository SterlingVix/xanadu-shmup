import React, {Component} from 'react';
import './Character.css';

class Character extends Component {
  unhandledKey = event => console.log(event.keyCode);
  onPressUp = (event) => {
    const newPosition = this.state.y + this.speed;
    this.setState({y: newPosition > window.innerHeight ? window.innerHeight : newPosition});
  };
  onPressRight = (event) => {
    const newPosition = this.state.x + this.speed;
    this.setState({x: newPosition > window.innerWidth ? window.innerWidth : newPosition});
  };
  onPressDown = (event) => {
    const newPosition = this.state.y - this.speed;
    this.setState({y: newPosition < 0 ? 0 : newPosition});
  };
  onPressLeft = (event) => {
    const newPosition = this.state.x - this.speed;
    this.setState({x: newPosition < 0 ? 0 : newPosition});
  };
  initializeAvatarMovement = (avatarElement) => {
    // Create reference to our Avatar
    this.avatar = avatarElement;

    // Add event listeners (document listens, Character moves).
    document.addEventListener(`keydown`, (event) => {
      // Each key is a keycode; the value is the func to run.
      const inputHandlerDictionary = {
        87/* W */: this.onPressUp,
        38/* ^ */: this.onPressUp,
        68/* D */: this.onPressRight,
        39/* > */: this.onPressRight,
        83/* S */: this.onPressDown,
        40/* v */: this.onPressDown,
        65/* A */: this.onPressLeft,
        37/* < */: this.onPressLeft,
      };
      const inputHandler = inputHandlerDictionary[event.keyCode] || this.unhandledKey;

      // Invoke the input handler
      inputHandler(event);
    }); // end keyDown()
  };

  constructor(props) {
    super(props);

    // Character properties:
    this.height = 70;
    this.speed = 5;
    this.width = 100;

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    this.state = {
      x: 0,
      y: 0,
    };
  } // end constructor

  render() {
    const {
      height,
      state: {
        x,
        y,
      },
      width,
    } = this;

    return (
      <div
        className="avatar"
        ref={this.initializeAvatarMovement}
        style={{
          height: `${height}px`,
          // transform: `translate(${x}px, ${y}px)`,
          width: `${width}px`,
          left: `${x}px`,
          bottom: `${y}px`,
        }}
      />);
  };
}

export default Character;
