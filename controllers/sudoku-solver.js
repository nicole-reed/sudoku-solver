class SudokuSolver {
  constructor() {
    this.rowStartVals = {
      A: 0,
      B: 9,
      C: 18,
      D: 27,
      E: 36,
      F: 45,
      G: 54,
      H: 63,
      I: 72
    }
  }


  validate(puzzleString) {
    try {
      const validString = /[1-9\.]{81}/g

      if (!puzzleString) {
        throw new Error('Required field(s) missing')
      }

      if (puzzleString.length !== 81) {
        throw new Error('Expected puzzle to be 81 characters long')
      }


      if (!puzzleString.match(validString)) {
        throw new Error('Invalid characters in puzzle')
      }

      return puzzleString
    } catch (error) {
      console.log('error in validate', error)

      throw error
    }
  }

  checkRowPlacement(puzzleString, row, value) {
    try {
      if (!this.rowStartVals.hasOwnProperty(row.toUpperCase())) {
        throw new Error('Invalid coordinate')
      }

      const rowStartValue = this.rowStartVals[row.toUpperCase()]
      const rowValue = puzzleString.slice(rowStartValue, rowStartValue + 9)

      return !rowValue.includes(value)
    } catch (error) {
      console.log('error in checkRowPlacement', error)

      throw error
    }
  }

  checkColPlacement(puzzleString, column, value) {
    try {
      if (column < 1 || column > 9) {
        throw new Error('Invalid coordinate')
      }

      let columnString = ''
      for (let i = 0; i < 9; i++) {
        const index = (column - 1) + (i * 9)
        columnString += puzzleString[index]
      }

      return !columnString.includes(value)
    } catch (error) {
      console.log('error in checkColPlacement', error)

      throw error
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    try {
      const regionStartValues = {
        topLeft: 0,
        topCenter: 3,
        topRight: 6,
        middleLeft: 27,
        middleCenter: 30,
        middleRight: 33,
        bottomLeft: 54,
        bottomCenter: 57,
        bottomRight: 60
      }
      const rowStartValue = this.rowStartVals[row.toUpperCase()]
      let region = ''
      if (rowStartValue <= 18) {
        region += 'top'
      } else if (rowStartValue > 18 && rowStartValue <= 45) {
        region += 'middle'
      } else {
        region += 'bottom'
      }

      if (column <= 3) {
        region += 'Left'
      } else if (column > 3 && column <= 6) {
        region += 'Center'
      } else if (column > 6) {
        region += 'Right'
      }
      //push regionStartVal+2, skip 6 push val+2, skip six push val+2
      let regionVals = ''
      // console.log('regionStartValues[region]', regionStartValues[region])
      for (let i = regionStartValues[region]; i < regionStartValues[region] + 27; i += 9) {
        // console.log('i', i)
        const regionRow = puzzleString.slice(i, i + 3)
        regionVals += regionRow
        // regionVals.push(puzzleString[i], puzzleString[i + 1], puzzleString[i + 2])
      }
      // console.log('regionVals', regionVals)
      // console.log('value', value)

      return !regionVals.includes(value)
    } catch (error) {
      console.log('error in checkRegionPlacement', error)

      throw error
    }
  }

  checkPlacement(puzzleString, row, column, value) {
    try {
      const validRow = this.checkRowPlacement(puzzleString, row, value)
      const validColumn = this.checkColPlacement(puzzleString, column, value)
      const validRegion = this.checkRegionPlacement(puzzleString, row, column, value)

      const returnObj = {
        valid: validRow && validColumn && validRegion
      }

      if (!returnObj.valid) {
        returnObj.conflicts = []
      }

      if (!validRow) {
        returnObj.conflicts.push('row')
      }

      if (!validColumn) {
        returnObj.conflicts.push('column')
      }

      if (!validRegion) {
        returnObj.conflicts.push('region')
      }

      return returnObj
    } catch (error) {
      console.log('error in checkPlacement')
      throw error
    }
  }


  solve(puzzleString, previousEmptyIndex = 0) {
    try {
      this.validate(puzzleString)

      if (!puzzleString.includes('.')) {
        return puzzleString
      }

      const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
      let retry = false
      let solutionStartValue = 1

      parentLoop:
      for (let i = previousEmptyIndex; i < puzzleString.length; i++) {

        if (puzzleString[i] === '.' || (retry && i == previousEmptyIndex)) {
          const rowLetterIndex = Math.floor(i / 9)
          const rowLetter = rowLetters[rowLetterIndex]
          const columnNumber = (i % 9) + 1

          nestedLoop:
          for (let j = solutionStartValue; j < 10; j++) {

            if (this.checkPlacement(puzzleString, rowLetter, columnNumber, j).valid) {

              let puzzleStringCopy = puzzleString.split('')
              puzzleStringCopy[i] = j
              puzzleStringCopy = puzzleStringCopy.join('')

              const solution = this.solve(puzzleStringCopy, i)

              if (solution && !solution.includes('.')) {
                return solution
              } else {
                break nestedLoop
              }
            }
          }

          if (!retry) {
            retry = true
            i = previousEmptyIndex - 1
            solutionStartValue = parseInt(puzzleString[previousEmptyIndex]) + 1
          } else if (previousEmptyIndex === 0) {
            throw new Error('Puzzle cannot be solved')
          } else {
            break parentLoop
          }
        }
      }

    } catch (error) {
      console.log('error in solve', error)

      throw error
    }
  }
}


module.exports = SudokuSolver;

