import React from 'react';
import { Square } from './Square';

export const Board = () => {
  const nextPlayer = 'Next player: X';

  const generateRow = (props) => {
    let row = []
    for(let i = 0; i < 3; i++) {
      let colIndex = (i + 1).toString()
      row.push(
        <Square 
          key={props.rowIndex + colIndex} 
        />
      )
    }
    return row
  }
  const generateBoard = () => {
    let board = []
    for(let j = 0; j < 3; j++) {
      let rowIndex = (j + 1).toString()
      board.push(<div className="board-row" key={rowIndex}>{generateRow(rowIndex)}</div>)
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