import React, { useState } from 'react';
import { Square } from './Square';
import { checkForWinner } from './checkforwinner'

export const Board = () => {
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
      <div>The winner is: {winner}</div>
    </div>
  )
};