import React from 'react';
import { Square } from './Square';


export const Board = (props) => {
  const generateSquares = (rowIndex) => {
    let squares = []
    for(let i = 0; i < 3; i++) {
      let index = rowIndex + i.toString()
      let winning = props.winningSquares.filter(el => el == index).length == 1 ? true : false
      squares.push(
        <Square 
          key={index}
          value={props.squareValues[index]}
          index={index} 
          winning={winning}
          handleClick={props.handleClick}
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
      {generateBoard()}
    </div>
  )
};