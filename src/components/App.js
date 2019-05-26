import React from 'react';
import Stage from './Stage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Stage
        height={480}
        width={640}
      >
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </Stage>
    </div>);
}

export default App;
