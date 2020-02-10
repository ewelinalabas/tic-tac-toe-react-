import React, { useState} from 'react';
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

  const validateWinner = (values) => {
    const result = checkForWinner(values)
    const winnerMark = Object.keys(result)
    if(winnerMark != "null") {
      setWinner(winnerMark)
      setWinningFields(result[winnerMark])
      setCoordinates(prepareCoordinates(coordinates, 'Winner: ' + winnerMark, ['-', '-']))
    }
  }

  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null)
  const [winningFields, setWinningFields] = useState([])
  const [stepNumber, setStepNumber] = useState(0)
  const [history, setHistory] = useState([generateBoardInitialState()])
  const [coordinates, setCoordinates] = useState([])
  const [sortAsc, setSortAsc] = useState(true)
  const nextPlayer = xIsNext ? 'X' : 'O';

  const handleClick = (index) => {
    if(winner === null) {
      const squareValuesNew = {...history[stepNumber]}
      squareValuesNew[index] = xIsNext ? 'X' : 'O'
      setCoordinates(prepareCoordinates(coordinates, squareValuesNew[index], index))
      setStepNumber(stepNumber + 1)
      const newHistory = history
        .slice(0, stepNumber + 1)
        .concat(squareValuesNew)
      setHistory(newHistory)
      setXIsNext(!xIsNext)
      validateWinner(squareValuesNew)
    } else {}
  };

  const jumpTo = (step) => {
    setStepNumber(step)
    setXIsNext((step % 2 === 0))
    setCoordinates(prepareCoordinates(coordinates, 'Go to move ' + step, ['-', '-']))
    setWinner(null)
    setWinningFields([])
  }

  const generateMoves = (ascending, h) => {
    const moves = h.map((el, i) => {
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
    return ascending ? moves : moves.reverse()
  }
  const moves = generateMoves(sortAsc, history)

  const createMessage = (nextPlayer, winner) => {
    if(winner != null) {
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
          winningSquares={winningFields}
          handleClick={handleClick}
        />
      </div>
        <div className="game-info">
          <p>Go to:</p>
          <button onClick={() => setSortAsc(!sortAsc)}>Sort</button>
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

