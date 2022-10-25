const Pool = require('pg').Pool

const pool = new Pool({
  user: 'geus',
  host: 'geus-sim-db.hpp.br',
  database: 'geus_consulta',
  password: 'geus@OqK8i063IUmjFpam',
  port: 5432,
})

const getUsers = (_request, response) => {
    pool.query('SELECT * FROM cad_colaboradores where colaborador like $1', ['GABRIEL%'], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getUsers,
  }