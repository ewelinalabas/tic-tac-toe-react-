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
  }
  const [squareValues, setSquareValues] = useState(generateInitialState())
  const nextPlayer = 'Next player: X';

  const handleClick = (value, index) => {
    const squareValuesNew = {...squareValues}
    squareValuesNew[index] = 'X'
    setSquareValues(squareValuesNew)
  }

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
  }

  const generateBoard = () => {
    let board = []
    for(let j = 0; j < 3; j++) {
      let rowIndex = j.toString()
      board.push(<div className="board-row" key={j}>{generateSquares(rowIndex)}</div>)
    }
    return board
  }

  return(
    <div>
      <div className="status">{nextPlayer}</div>
      {generateBoard()}
    </div>
  )
}