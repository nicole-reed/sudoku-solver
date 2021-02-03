const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suite('POST /api/solve', () => {

    test('Solve puzzle with valid puzzle string', async () => {
      const reqBody = { puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' }
      const expected = '769235418851496372432178956174569283395842761628713549283657194516924837947381625'
      const response = await chai.request(server)
        .post('/api/solve')
        .send(reqBody)

      assert.equal(response.body.solution, expected)
    })

    test('Solve puzzle with missing puzzle string', async () => {
      const reqBody = {}
      const expected = 'Required field(s) missing'
      const response = await chai.request(server)
        .post('/api/solve')
        .send(reqBody)

      assert.equal(response.body.error, expected)
    })

    test('Solve puzzle with invalid characters', async () => {
      const reqBody = { puzzle: 'AA9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' }
      const expected = 'Invalid characters in puzzle'
      const response = await chai.request(server)
        .post('/api/solve')
        .send(reqBody)

      assert.equal(response.body.error, expected)
    })

    test('Solve puzzle with incorrect length', async () => {
      const reqBody = { puzzle: '9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' }
      const expected = 'Expected puzzle to be 81 characters long'
      const response = await chai.request(server)
        .post('/api/solve')
        .send(reqBody)

      assert.equal(response.body.error, expected)
    })

    test('Solve a puzzle that cannot be solved', async () => {
      const reqBody = { puzzle: '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..' }
      const expected = 'Puzzle cannot be solved'
      const response = await chai.request(server)
        .post('/api/solve')
        .send(reqBody)

      assert.equal(response.body.error, expected)
    })
  });

  suite('POST /api/check', () => {

    test('Check a puzzle placement with all fields', async () => {
      const reqBody = {
        puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
        coordinate: 'A1',
        value: '7'
      }
      const response = await chai.request(server)
        .post('/api/check')
        .send(reqBody)

      assert.equal(response.body.valid, true)
    })

    test('Check a puzzle placement with single placement conflict', async () => {
      const reqBody = {
        puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
        coordinate: 'A9',
        value: '4'
      }
      const response = await chai.request(server)
        .post('/api/check')
        .send(reqBody)

      assert.equal(response.body.valid, false)
      assert.property(response.body, 'conflicts')
      assert.isArray(response.body.conflicts, true)
      assert.include(response.body.conflicts, 'column')
    })

    test('Check a puzzle placement with multiple placement conflicts', async () => {
      const reqBody = {
        puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
        coordinate: 'A9',
        value: '2'
      }
      const response = await chai.request(server)
        .post('/api/check')
        .send(reqBody)

      assert.equal(response.body.valid, false)
      assert.property(response.body, 'conflicts')
      assert.isArray(response.body.conflicts, true)
      assert.include(response.body.conflicts, 'column')
      assert.include(response.body.conflicts, 'region')
    })

    test('Check a puzzle placement with ALL placement conflicts', async () => {
      const reqBody = {
        puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
        coordinate: 'A1',
        value: '5'
      }
      const response = await chai.request(server)
        .post('/api/check')
        .send(reqBody)

      assert.equal(response.body.valid, false)
      assert.property(response.body, 'conflicts')
      assert.isArray(response.body.conflicts, true)
      assert.include(response.body.conflicts, 'column')
      assert.include(response.body.conflicts, 'region')
      assert.include(response.body.conflicts, 'row')
    })

    test('Check puzzle placement with missing required fields', async () => {
      const reqBody = {
        puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
        coordinate: 'A1'
      }
      const expected = 'Required field(s) missing'
      const response = await chai.request(server)
        .post('/api/check')
        .send(reqBody)

      assert.equal(response.body.error, expected)
    })

    test('Check puzzle placement with invalid characters', async () => {
      const reqBody = {
        puzzle: 'AA9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
        coordinate: 'A1',
        value: '7'
      }
      const expected = 'Invalid characters in puzzle'
      const response = await chai.request(server)
        .post('/api/check')
        .send(reqBody)

      assert.equal(response.body.error, expected)
    })

    test('Check puzzle placement with incorrect length', async () => {
      const reqBody = {
        puzzle: '..9..5.1.85.4...2432....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
        coordinate: 'A1',
        value: '7'
      }
      const expected = 'Expected puzzle to be 81 characters long'
      const response = await chai.request(server)
        .post('/api/check')
        .send(reqBody)

      assert.equal(response.body.error, expected)
    })

    test('Check puzzle placement with invalid placement coordinate', async () => {
      const reqBody = {
        puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
        coordinate: 'XZ18',
        value: '7'
      }
      const expected = 'Invalid coordinate'
      const response = await chai.request(server)
        .post('/api/check')
        .send(reqBody)

      assert.equal(response.body.error, expected)
    })

    test('Check puzzle placement with invalid value', async () => {
      const reqBody = {
        puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
        coordinate: 'A1',
        value: 'X'
      }
      const expected = 'Invalid value'
      const response = await chai.request(server)
        .post('/api/check')
        .send(reqBody)
      console.log('response.body', response.body)

      assert.equal(response.body.error, expected)
    })
  });

});

