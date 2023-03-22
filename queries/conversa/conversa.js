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

module.exports = {
    getConversa
}