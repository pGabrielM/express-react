const Pool = require('pg').Pool

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'default',
  password: 'secret',
  port: 5432,
})

const getUsersA = (_request, response) => {
    pool.query('SELECT * FROM person where first_name like $1 LIMIT 10', ['A%'], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
const getUsersB = (_request, response) => {
    pool.query('SELECT * FROM person where first_name like $1 LIMIT 10', ['B%'], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
const getUsersC = (_request, response) => {
    pool.query('SELECT * FROM person where first_name like $1 LIMIT 10', ['C%'], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getUsersA,
    getUsersB,
    getUsersC,
  }