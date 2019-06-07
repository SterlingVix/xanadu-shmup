import React from 'react';
import Character from './Character';
import './Stage.css';

class Stage extends React.Component {
  state = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  componentWillUnmount() {
    window.removeEventListener('resize');
  }

  updateStageBoundaries = () => {
    this.setState({
      top: this.stageElement.getBoundingClientRect().bottom, // NOTE: this is weird, but correct.
      right: this.stageElement.getBoundingClientRect().right,
      bottom: this.stageElement.getBoundingClientRect().top, // NOTE: this is weird, but correct.
      left: this.stageElement.getBoundingClientRect().left,
    });
  };

  onStageLoad = (stageElement) => {
    this.stageElement = stageElement;
    this.updateStageBoundaries();

    window.addEventListener('resize', this.updateStageBoundaries);
  };

  render() {
    const {
      height,
      width,
    } = this.props;

    const stageContainerStyles = {
      height: `${height}px`,
      width: `${width}px`,
    };

    return (
      <div className="stageContainer">
        <div
          className="stage"
          ref={this.onStageLoad}
          style={stageContainerStyles}
        >
          <div className="scrollingBackground" />
          <Character
            stage={this.state}
          />
        </div>
      </div>);
  }
};

export default Stage;
