const pool = require('../db');

const getPublicacoes = (request, response) => {
    pool.query("SELECT *, TO_CHAR(p.created_at, 'dd/mm/yyyy') as data_publicacao, TO_CHAR(p.created_at, 'hh:ii:ss') as hora_publicacao FROM publicacoes p ORDER BY created_at DESC", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const insertPublicacao = (request, response) => {
    const {
        nomeUser,
        legenda
    } = request.body

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