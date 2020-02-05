export const checkForWinner = (values) => {
  const checkRows = (values) => {
    for(let i = 0; i < 3; i++) {
      let points = {
        'X': 0,
        'O': 0
      }
      for(let j = 0; j < 3; j++) {
        let index = i.toString() + j.toString()
        if(values[index] === 'X') {
          points['X'] += 1
        } else if(values[index] === 'O') {
          points['O'] += 1
        }
      }
      if(points['X'] === 3) {
        return 'X';
      } else if(points['O'] === 3) {
        return 'O'
      }
    }
  }
  const checkCols = (values) => {
    for(let i = 0; i < 3; i++) {
      let points = {
        'X': 0,
        'O': 0
      }
      for(let j = 0; j < 3; j++) {
        let index = j.toString() + i.toString()
        if(values[index] === 'X') {
          points['X'] += 1
        } else if(values[index] === 'O') {
          points['O'] += 1
        }
      }
      if(points['X'] === 3) {
        return 'X';
      } else if(points['O'] === 3) {
        return 'O'
      }
    }
  }
  const checkDiagonals = (values) => {
    const diagonals = [['00', '11', '22'], ['02', '11', '20']]
    for(let i = 0; i < 2; i++) {
      let points = {
        'X': 0,
        'O': 0
      }
      for(let j = 0; j < 3; j++) {
        if(values[diagonals[i][j]] === 'X') {
          points['X'] += 1
        } else if(values[diagonals[i][j]] === 'O') {
          points['O'] += 1
        }
        if(points['X'] === 3) {
          return 'X';
        } else if(points['O'] === 3) {
          return 'O'
        }
      }
    }
  }

  const row = checkRows(values)
  const col = checkCols(values)
  const diag = checkDiagonals(values)

  if(row) {
    return row
  } else if(col) {
    return col
  } else if(diag) {
    return diag
  }
}