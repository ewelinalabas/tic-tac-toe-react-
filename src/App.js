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

  const prepareCoordinates = (list, value, index) => {
    return list.concat({
      value: value,
      row: index[0], 
      col: index[1], 
    })
  }

  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null)
  const [stepNumber, setStepNumber] = useState(0)
  const [history, setHistory] = useState([generateBoardInitialState()])
  const [coordinates, setCoordinates] = useState([])
  const nextPlayer = xIsNext ? 'X' : 'O';

  const handleClick = (index) => {
    const squareValuesNew = {...history[stepNumber]}
    squareValuesNew[index] = xIsNext ? 'X' : 'O'
    setCoordinates(prepareCoordinates(coordinates, squareValuesNew[index], index))
    setStepNumber(stepNumber + 1)
    const newHistory = history
      .slice(0, stepNumber + 1)
      .concat(squareValuesNew)
    setHistory(newHistory)
    setXIsNext(!xIsNext)
    setWinner(checkForWinner(squareValuesNew))
  };

  const jumpTo = (step) => {
    setStepNumber(step)
    setXIsNext((step % 2 === 0))
    setCoordinates(prepareCoordinates(coordinates, 'Go to move ' + step, ['-', '-']))
  }

  const moves = history.map((el, i) => {
    const description = i ? 'Move ' + i : 'Beginning'
    return (
      <li key={i}>
        <button
          key={i}
          onClick={() => jumpTo(i)}
        >
          {description}
        </button>
      </li>
    )
  })

  // fix sorting
  // const handleSort = (list) => {
  //   console.log(list)
  //   console.log(list.reverse())
  //   return list.reverse()
  // }

  const createMessage = (nextPlayer, winner) => {
    if(winner) {
      return <p>{winner + " won!"}</p>
    } else {
      return <p>{'Next player is: ' + nextPlayer}</p>
    }
  }
  const message = createMessage(nextPlayer, winner)

  const decoratedCoordinates = coordinates.map((el, i) => {
    return (
      <tr key={i}>
        <td>{el.value}</td>
        <td>{el.row}</td>
        <td>{el.col}</td>
      </tr>
    )
  })
      

  return (
    <div className="game">
      <div>
        {message}
        <Board 
          squareValues={history[stepNumber]}
          handleClick={handleClick}
        />
      </div>
        <div className="game-info">
          <p>Go to:</p>
          {/* <button onClick={() => handleSort(moves)}>Sort</button> */}
          <ol>{moves}</ol>
        </div>
        <div className="game-info">
          <p>History of moves</p>
          <table>
            <thead>
              <tr>
                  <th>Value</th>
                  <th>Row</th>
                  <th>Column</th>
              </tr>
            </thead>
            <tbody>
              {decoratedCoordinates}
            </tbody>
          </table>
        </div>
    </div>
  );
}

