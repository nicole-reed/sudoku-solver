'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  const solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      try {
        const { coordinate, value, puzzle } = req.body

        if (!coordinate || !value || !puzzle) {
          throw new Error('Required field missing')
        }

        if (solver.validate(puzzle) === false) {
          throw error
        }

        if (coordinate.length > 2) {
          throw new Error('Invalid coordinate')
        }

        if (!value.match(/[1-9]/)) {
          throw new Error('Invalid value')
        }

        const row = coordinate[0]
        const column = coordinate[1]
        const result = solver.checkPlacement(puzzle, row, column, value)

        res.json(result)
      } catch (error) {
        console.log('error in POST /api/check', error)

        res.json({
          error: error.message
        })
      }

    });

  app.route('/api/solve')
    .post((req, res) => {
      try {
        const puzzle = req.body.puzzle

        if (!puzzle) {
          throw new Error('Required field missing')
        }
        const solution = solver.solve(puzzle)


        res.json({ solution })
      } catch (error) {
        console.log('error in POST /api/solve', error)

        res.json({
          error: error.message
        })
      }
    });
};
