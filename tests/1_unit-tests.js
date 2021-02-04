const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

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
      const input = '1?80.2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const expected = "Invalid characters in puzzle"


      expect(() => solver.validate(input)).to.throw(expected)

    })

    test('Puzzle string that is not 81 characters in length', () => {
      const input = '.2.3674.3.7.2..9.47...8..1..16....926914.'
      const expected = 'Expected puzzle to be 81 characters long'


      expect(() => solver.validate(input)).to.throw(expected)

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

      expect(() => solver.checkRowPlacement(inputPuz, inputRow, inputVal)).to.throw(expected)

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


      expect(() => solver.checkColPlacement(inputPuz, inputCol, inputVal)).to.throw(expected)

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
      assert.property(output, 'conflict')
      assert.typeOf(output.conflict, 'array')
      assert.include(output.conflict, 'row')
    })

    test('Invalid column placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'F'
      const inputCol = 2
      const inputVal = 6
      const output = solver.checkPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output.valid, false)
      assert.property(output, 'conflict')
      assert.typeOf(output.conflict, 'array')
      assert.include(output.conflict, 'column')
    })

    test('Invalid region placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'D'
      const inputCol = 3
      const inputVal = 3
      const output = solver.checkPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output.valid, false)
      assert.property(output, 'conflict')
      assert.typeOf(output.conflict, 'array')
      assert.include(output.conflict, 'region')
    })

    test('Invalid row and column placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'D'
      const inputCol = 1
      const inputVal = 1
      const output = solver.checkPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output.valid, false)
      assert.property(output, 'conflict')
      assert.typeOf(output.conflict, 'array')
      assert.include(output.conflict, 'row')
      assert.include(output.conflict, 'column')
    })

    test('Invalid row and region placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'D'
      const inputCol = 1
      const inputVal = 9
      const output = solver.checkPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output.valid, false)
      assert.property(output, 'conflict')
      assert.typeOf(output.conflict, 'array')
      assert.include(output.conflict, 'row')
      assert.include(output.conflict, 'region')
    })

    test('Invalid region and column placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'D'
      const inputCol = 1
      const inputVal = 2
      const output = solver.checkPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output.valid, false)
      assert.property(output, 'conflict')
      assert.typeOf(output.conflict, 'array')
      assert.include(output.conflict, 'column')
      assert.include(output.conflict, 'region')
    })

    test('Invalid row, region and column placement', () => {
      const inputPuz = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      const inputRow = 'E'
      const inputCol = 2
      const inputVal = 7
      const output = solver.checkPlacement(inputPuz, inputRow, inputCol, inputVal)

      assert.equal(output.valid, false)
      assert.property(output, 'conflict')
      assert.typeOf(output.conflict, 'array')
      assert.include(output.conflict, 'column')
      assert.include(output.conflict, 'region')
      assert.include(output.conflict, 'row')

    })
  });

  suite('SudokuSolver.solve(puzzleString', () => {

    test('Valid puzzle strings pass the solver', () => {
      const input = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'

      try {
        solver.solve(input)
      } catch {
        assert.fail('solver.solve() should have thrown')
      }

    })

    test('Invalid puzzle strings do not pass the solver', () => {
      const input = '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
      const expected = 'Puzzle cannot be solved'


      expect(() => solver.solve(input)).to.throw(expected)

    })

    test('Puzzle solver returns expected solution for incomplete puzzle', () => {
      const input = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6'
      const output = solver.solve(input)

      assert.equal(output, '473891265851726394926345817568913472342687951197254638734162589685479123219538746')
    })
  });
});