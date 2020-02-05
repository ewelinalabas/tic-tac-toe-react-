import React, { useState } from 'react';
import './App.css';
import { Board } from './Board';
import { checkForWinner } from './checkforwinner';

export const App = () => {
  const generateBoardInitialState = () => {
    let initialState = {}
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j< 3; j++) {
        return {...initialState, [i.toString() + j.toString()]: null}
      }
    }
    return initialState
  };

  const [squareValues, setSquareValues] = useState(generateBoardInitialState());
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null)
  const nextPlayer = 'Next player: '.concat(xIsNext ? 'X' : 'O');

  const handleClick = (index) => {
    const squareValuesNew = {...squareValues}
    squareValuesNew[index] = xIsNext ? 'X' : 'O'
    setSquareValues(squareValuesNew)
    setXIsNext(!xIsNext)
    setWinner(checkForWinner(squareValuesNew))
  };

  return (
    <div className="game">
      <div>
        <Board 
          squareValues={squareValues}
          nextPlayer={nextPlayer}
          winner={winner}
          handleClick={handleClick}
        />
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    </div>
  );
}

