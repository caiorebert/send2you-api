const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'send2you',
  password: '1234',
  port: 5432,
})

const getPublicacoes = (request, response) => {
  pool.query('SELECT * FROM publicacoes ORDER BY created_at DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const insertPublicacao = (request, response) => {
    const { nomeUser, legenda } = request.body

    pool.query('INSERT INTO publicacoes ("nomeUser", "legenda", "created_at") VALUES ($1, $2, $3)', [nomeUser, legenda, new Date()], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Publicação adicionada com sucesso!`)
    })
  };

module.exports = {
    getPublicacoes,
    insertPublicacao
}