export const checkForWinner = (values) => {
  const checkRows = (values) => {
    for(let i = 0; i < 3; i++) {
      let points = {
        'X': 0,
        'O': 0
      }
      let coordinatesX = []
      let coordinatesO = []
      for(let j = 0; j < 3; j++) {
        let index = i.toString() + j.toString()
        if(values[index] === 'X') {
          points['X'] += 1
          coordinatesX.concat(index)
        } else if(values[index] === 'O') {
          points['O'] += 1
          coordinatesO.concat(index)
        }
      }
      if(points['X'] === 3) {
        return {'X': coordinatesX};
      } else if(points['O'] === 3) {
        return {'O': coordinatesO}
      }
    }
  }
  const checkCols = (values) => {
    for(let i = 0; i < 3; i++) {
      let points = {
        'X': 0,
        'O': 0
      }
      let coordinatesX = []
      let coordinatesO = []
      for(let j = 0; j < 3; j++) {
        let index = j.toString() + i.toString()
        if(values[index] === 'X') {
          points['X'] += 1
          coordinatesX.concat(index)
        } else if(values[index] === 'O') {
          points['O'] += 1
          coordinatesO.concat(index)
        }
      }
      if(points['X'] === 3) {
        return {'X': coordinatesX};
      } else if(points['O'] === 3) {
        return {'O': coordinatesO}
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
      let coordinatesX = []
      let coordinatesO = []
      for(let j = 0; j < 3; j++) {
        if(values[diagonals[i][j]] === 'X') {
          points['X'] += 1
          coordinatesX.concat(diagonals[i][j])
        } else if(values[diagonals[i][j]] === 'O') {
          points['O'] += 1
          coordinatesO.concat(diagonals[i][j])
        }
        if(points['X'] === 3) {
          return {'X': coordinatesX};
        } else if(points['O'] === 3) {
          return {'O': coordinatesO}
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
  } else {
    return {null: []}
  }
}