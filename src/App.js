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

  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null)
  const [stepNumber, setStepNumber] = useState(0)
  const [history, setHistory] = useState([generateBoardInitialState()])
  const nextPlayer = xIsNext ? 'X' : 'O';

  const handleClick = (index) => {
    const squareValuesNew = {...history[stepNumber]}
    squareValuesNew[index] = xIsNext ? 'X' : 'O'
    setStepNumber(stepNumber + 1)
    const newHistory = history.slice(0, stepNumber + 1).concat(squareValuesNew)
    setHistory(newHistory)
    setXIsNext(!xIsNext)
    setWinner(checkForWinner(squareValuesNew))
  };

  const jumpTo = (step) => {
    setStepNumber(step)
    setXIsNext((step % 2 === 0))
  }

  const moves = history.map((el, i) => {
    const description = i ? 'Go to move ' + i : 'Go to beginning'
      return (
        <li>
          <button key={i} onClick={() => jumpTo(i)}>{description}</button>
        </li>
      )
  })

  const message = (nextPlayer, winner) => {
    if(winner) {
      return <p>{winner + " won!"}</p>
    } else {
      return <p>{'Next player is: ' + nextPlayer}</p>
    }
  }

  return (
    <div className="game">
      <div>
        {message(nextPlayer, winner)}
        <Board 
          squareValues={history[stepNumber]}
          handleClick={handleClick}
        />
      </div>
        <div className="game-info">
          <p>List of moves</p>
          <ol>{moves}</ol>
        </div>
    </div>
  );
}

