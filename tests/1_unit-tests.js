const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
const solver = new SudokuSolver();

suite('UnitTests', () => {

  suite('SudokuSolver.validate(puzzleString)', () => {

    test('Valid puzzle string of 81 characters', () => {
      const input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const output = solver.validate(input)

      assert.equal(output, input)
    })

    test('Puzzle string with invalid characters (not 1-9 or .)', () => {
      const input = '1?50.2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const expected = 'Invalid characters in puzzle'

      assert.throws(() => solver.validate(input), expected)
    })

    test('Puzzle string that is not 81 characters in length', () => {
      const input = '.2.3674.3.7.2..9.47...8..1..16....926914.'
      const expected = 'Expected puzzle to be 81 characters long'

      assert.throws(() => solver.validate(input), expected)
    })
  });

  suite('SudokuSolver.checkRowPlacement(puzzleString, row, value)', () => {

    test('Valid row placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputVal = 5
      const inputRow = 'B'
      const output = solver.checkRowPlacement(inputPuz, inputRow, inputVal)

      assert.equal(output, true)
    })

    test('Invalid row placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputVal = 5
      const inputRow = 'A'
      const output = solver.checkRowPlacement(inputPuz, inputRow, inputVal)

      assert.equal(output, false)
    })

    test('Invalid row value', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputVal = 5
      const inputRow = 'P'
      const expected = 'Invalid coordinate'

      assert.throws(() => solver.checkRowPlacement(inputPuz, inputRow, inputVal), expected)
    })
  });

  suite('SudokuSolver.checkColPlacement(puzzleString, column, value)', () => {

    test('Valid column placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputVal = 4
      const inputCol = 4
      const output = solver.checkColPlacement(inputPuz, inputCol, inputVal)

      assert.equal(output, true)
    })

    test('Invalid column placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputVal = 1
      const inputCol = 1
      const output = solver.checkColPlacement(inputPuz, inputCol, inputVal)

      assert.equal(output, false)
    })

    test('Invalid column input', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputVal = 5
      const inputCol = 0
      const expected = 'Invalid coordinate'

      assert.throws(() => solver.checkColPlacement(inputPuz, inputCol, inputVal), expected)
    })
  });

  suite('SudokuSolver.checkRegionPlacement(puzzleString, row, column, value)', () => {

    test('Valid region placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'C'
      const inputCol = 1
      const inputVal = 7
      const output = solver.checkRegionPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output, true)
    })

    test('Invalid region placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'C'
      const inputCol = 1
      const inputVal = 1
      const output = solver.checkRegionPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output, false)
    })
  });

  suite('SudokuSolver.checkPlacement(puzzleString, row, column, value', () => {

    test('Valid placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'C'
      const inputCol = 1
      const inputVal = 7
      const output = solver.checkPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output.valid, true)
    })

    test('Invalid row placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'E'
      const inputCol = 2
      const inputVal = 4
      const output = solver.checkPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output.valid, false)
      assert.property(output, 'conflicts')
      assert.typeOf(output.conflicts, 'array')
      assert.include(output.conflicts, 'row')
    })

    test('Invalid column placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'F'
      const inputCol = 2
      const inputVal = 6
      const output = solver.checkPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output.valid, false)
      assert.property(output, 'conflicts')
      assert.typeOf(output.conflicts, 'array')
      assert.include(output.conflicts, 'column')
    })

    test('Invalid region placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'D'
      const inputCol = 3
      const inputVal = 3
      const output = solver.checkPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output.valid, false)
      assert.property(output, 'conflicts')
      assert.typeOf(output.conflicts, 'array')
      assert.include(output.conflicts, 'region')
    })

    test('Invalid row and column placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'D'
      const inputCol = 1
      const inputVal = 1
      const output = solver.checkPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output.valid, false)
      assert.property(output, 'conflicts')
      assert.typeOf(output.conflicts, 'array')
      assert.include(output.conflicts, 'row')
      assert.include(output.conflicts, 'column')
    })

    test('Invalid row and region placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'D'
      const inputCol = 1
      const inputVal = 9
      const output = solver.checkPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output.valid, false)
      assert.property(output, 'conflicts')
      assert.typeOf(output.conflicts, 'array')
      assert.include(output.conflicts, 'row')
      assert.include(output.conflicts, 'region')
    })

    test('Invalid region and column placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'D'
      const inputCol = 1
      const inputVal = 2
      const output = solver.checkPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output.valid, false)
      assert.property(output, 'conflicts')
      assert.typeOf(output.conflicts, 'array')
      assert.include(output.conflicts, 'column')
      assert.include(output.conflicts, 'region')
    })

    test('Invalid row, region and column placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'E'
      const inputCol = 2
      const inputVal = 7
      const output = solver.checkPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output.valid, false)
      assert.property(output, 'conflicts')
      assert.typeOf(output.conflicts, 'array')
      assert.include(output.conflicts, 'column')
      assert.include(output.conflicts, 'region')
      assert.include(output.conflicts, 'row')

    })
  });

  suite('SudokuSolver.solve(puzzleString', () => {

    test.only('Valid puzzle strings pass the solver', () => {
      const input = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'
      const output = solver.solve(input)

      assert.equal(output, '568913724342687519197254386685479231219538467734162895926345178473891652851726943')
    })

    test('Invalid puzzle strings do not pass the solver', () => {

    })

    test('Puzzle solver returns expected solution for incomplete puzzle', () => {

    })
  });
});
