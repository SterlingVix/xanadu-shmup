import React from 'react';
import Character from './Character';
import './Stage.css';

const Stage = (props) => {
  const stageContainerStyles = {
    height: `${props.height}px`,
    width: `${props.width}px`,
  };

  return (
    <div className="stageContainer">
      <div className="stage" style={stageContainerStyles}>
        <Character/>
        {props.children}
      </div>
    </div>);
};

export default Stage;
