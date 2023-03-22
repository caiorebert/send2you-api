const pool = require('../db');

const login = (request, response) => {
    const { login, password } = request.body;
    pool.query("SELECT * FROM users WHERE login = $1 AND password = $2", [login, password], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount > 0) {
            const user = results.rows[0];
            pool.query("UPDATE users SET logged = 1 WHERE id = $1", [user.id], (error, results) => {
                if (error) {
                    throw error
                }

            });
            response.status(200).json(results.rows[0]);
        } else {
            response.status(204).json({});
        }
    });
};

const getUsers = (request, response) => {
    pool.query("SELECT * FROM users ORDER BY id", (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount > 0) {
            response.status(200).json(results.rows);
        } else {
            response.status(204).json(results);
        }
    });
}

const getUser = (request, response) => {
    const [idUser] = request.body; 
    pool.query("SELECT * FROM users WHERE id = $1", [], (error, results) => {
        
    });
}

module.exports = {
    login,
    getUsers
};