import React, { useState } from 'react';
import { Square } from './Square';

export const Board = () => {
  const generateInitialState = () => {
    let initialState = {}
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j< 3; j++) {
        return {...initialState, [i.toString() + j.toString()]: null}
      }
    }
    return initialState
  };

  const [squareValues, setSquareValues] = useState(generateInitialState());
  const [xIsNext, setXIsNext] = useState(true);
  const nextPlayer = 'Next player: '.concat(xIsNext ? 'X' : 'O');

  const handleClick = (value, index) => {
    const squareValuesNew = {...squareValues}
    squareValuesNew[index] = xIsNext ? 'X' : 'O'
    setSquareValues(squareValuesNew)
    setXIsNext(!xIsNext)
  };

  const generateSquares = (rowIndex) => {
    let squares = []
    for(let i = 0; i < 3; i++) {
      let index = rowIndex + i.toString()
      squares.push(
        <Square 
          key={index}
          value={squareValues[index]}
          index={index} 
          handleClick={handleClick}
        />
      )
    }
    return squares
  };

  const generateBoard = () => {
    let board = []
    for(let j = 0; j < 3; j++) {
      let rowIndex = j.toString()
      board.push(<div className="board-row" key={j}>{generateSquares(rowIndex)}</div>)
    }
    return board
  };

  return(
    <div>
      <div className="status">{nextPlayer}</div>
      {generateBoard()}
    </div>
  )
};