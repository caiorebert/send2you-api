const pool = require('../db');

const getConversa = (request, response) => {
    const {idRemetente, idDestinatario} = request.body;
    
    pool.query(
        "SELECT * FROM conversa WHERE id_user_remetente = $1 AND id_user_destinatario = $2",
        [idRemetente, idDestinatario],
        (error, results) => {
            if (error) 
                throw error

            if (results.rowCount > 0) {
                const conversa = results.rows[0];
                response.status(200).json(conversa)
            }
        }
    )
}

const getAllMensagens = (request, response) => {
    const {idRemetente, idDestinatario} = request.body;

    pool.query(
        `SELECT 
            *,
            TO_CHAR(created_at, 'HH24:MI') as hora 
            FROM mensagens 
            WHERE 
                (id_user_remetente = $1 AND id_user_destinatario = $2) 
                    OR 
                (id_user_remetente = $2 AND id_user_destinatario = $1) 
        ORDER BY created_at ASC`,
        [idRemetente, idDestinatario],
        (error, results) => {
            if (error) 
                throw error

            if (results.rowCount > 0) {
                response.status(200).json(results.rows)
            } else {
                response.status(200).json([])
            }
        }
    )
}

const insertMensagem = (request, response) => {
    const {texto, idRemetente, idDestinatario} = request.body;
    pool.query(
        `INSERT INTO 
            mensagens (texto, created_at, id_user_remetente, id_user_destinatario) 
        VALUES 
            ($1, Now(), $2, $3)`,
        [texto, idRemetente, idDestinatario],
        (error, results) => {
            if (error) {
                throw error;
            }

            if (results.rowCount > 0) {
                response.status(201).json(results.rows);
            } else {
                response.status(204).json([]);
            }
        }
    );
}

module.exports = {
    getConversa,
    getAllMensagens,
    insertMensagem
}