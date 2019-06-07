import React, {Component} from 'react';
import './Character.css';

class Character extends Component {
  constructor(props) {
    super(props);
    // Character properties:
    this.height = 70;
    this.speed = 5;
    this.width = 100;

    this.state = {
      x: undefined,
      y: undefined,
    };
  } // end constructor

  componentDidUpdate(prevProps) {
    const { stage } = this.props;

    if ( prevProps.stage.top === 0 && prevProps.stage.top !== stage.top
      && prevProps.stage.right === 0 && prevProps.stage.right !== stage.right
      && prevProps.stage.bottom === 0 && prevProps.stage.bottom !== stage.bottom
      && prevProps.stage.left === 0 && prevProps.stage.left !== stage.left
    ) {
      const startingState = this.getStartingPosition(stage);
      console.log(`Setting starting position:`, startingState);
      this.setState(startingState);
    }
  }

  getStartingPosition = (stage) => ({
    // x: stage.left + ((stage.right - stage.left) / 2),
    x: stage.left,
    y: stage.bottom + ((stage.top - stage.bottom) / 2),
  });

  onPressUp = (event) => {
    const {
      height,
      props: { stage: { top } },
      speed,
      state: { y },
    } = this;
    const newPosition = y + speed;
    const maxPos = top - height;
    this.setState({y: newPosition > maxPos ? maxPos : newPosition});
  };
  onPressRight = (event) => {
    const {
      props: { stage: { right } },
      speed,
      state: { x },
      width,
    } = this;
    const newPosition = x + speed;
    const maxPos = right - width;
    this.setState({x: newPosition > maxPos ? maxPos : newPosition});
  };
  onPressDown = (event) => {
    const {
      props: { stage: { bottom } },
      speed,
      state: { y },
    } = this;
    const newPosition = y - speed;
    this.setState({y: newPosition < bottom ? bottom : newPosition});
  };
  onPressLeft = (event) => {
    const {
      props: { stage: { left } },
      speed,
      state: { x },
    } = this;
    const newPosition = x - speed;
    this.setState({x: newPosition < left ? left : newPosition});
  };
  unhandledKey = event => console.log(event.keyCode);
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
