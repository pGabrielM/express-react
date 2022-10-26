const Pool = require('pg').Pool

const pool = new Pool({
  user: 'geus',
  host: 'geus-sim-db.hpp.br',
  database: 'geus_consulta',
  password: 'geus@OqK8i063IUmjFpam',
  port: 5432,
})

const getUsersA = (_request, response) => {
    pool.query('SELECT * FROM cad_colaboradores where colaborador like $1 LIMIT 50', ['A%'], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
const getUsersB = (_request, response) => {
    pool.query('SELECT * FROM cad_colaboradores where colaborador like $1 LIMIT 50', ['B%'], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
const getUsersC = (_request, response) => {
    pool.query('SELECT * FROM cad_colaboradores where colaborador like $1 LIMIT 50', ['C%'], (error, results) => {
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