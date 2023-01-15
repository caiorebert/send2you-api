const Pool = require('pg').Pool
require('dotenv').config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: 'postgres://dpg-cf1j8rirrk0bpp942gu0-a.oregon-postgres.render.com',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
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

    pool.query('INSERT INTO publicacoes ("nomeuser", "legenda", "created_at") VALUES ($1, $2, $3)', [nomeUser, legenda, new Date()], (error, results) => {
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