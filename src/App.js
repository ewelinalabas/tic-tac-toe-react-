import React from 'react';
import './App.css';
import { Board } from './Board';

export const App = () => {
  return (
    <div className="game">
      <div>
        <Board />
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    </div>
  );
}

