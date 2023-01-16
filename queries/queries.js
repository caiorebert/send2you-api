const Pool = require('pg').Pool
require('dotenv').config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
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

const login = (request, response) => {
  const { login, password } = request.body;
  pool.query("SELECT * FROM users WHERE login = $1 AND password = $2", [login, password], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rowCount > 0) {
      response.status(200).json(results.rows[0]);
    } else {
      response.status(204).json({});
    }
  });
}

module.exports = {
    getPublicacoes,
    insertPublicacao,
    login
}