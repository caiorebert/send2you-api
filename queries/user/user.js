const pool = require('../db');
const login = (request, response) => {
    const { login, password } = request.body;
    if ((login == undefined || login=="")|| (password == undefined || password == null)) {
        response.status(400).json({
            message: "Login ou senha não preenchidos!" 
        })
    }
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
            response.status(401).json({
                message: "Usuário ou senha incorretos!"
            });
        }
    });
};

const getUsers = (request, response) => {
    const {idUser} = request.body; 
    if (idUser==undefined) {
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
    } else {
        pool.query("SELECT * FROM users WHERE id <> $1 ORDER BY id", [idUser], (error, results) => {
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
    
}

const getUser = (request, response) => {
    const {idUser} = request.body; 
    pool.query("SELECT * FROM users WHERE id = $1", [idUser], (error, results) => {
       if (error) {
            throw error;
       }

       if (results.rowCount > 0) {
            response.status(200).json(results.rows);
       }
    });
}

const newUser = (request, response) => {
    const {nome, login, password} = request.body;
    pool.query("SELECT * FROM users WHERE login LIKE $1", [login], 
        (error, results) => {
            if (error) {
                error;
            }
            if (results.rowCount > 0) {
                console.log("aqui");
                response.status(401).json({
                    message: "Login já cadastrado no sistema!"
                });
            } else {
                pool.query(
                    "INSERT INTO users (nome, login, password) VALUES ($1, $2, $3)", 
                    [nome, login, password],    
                    (error, results) => {
                        if (error) {
                            error;
                        }
                        response.status(200).json({
                            message: "Usuário cadastrado!"
                        });
                    }
                )
            }
        }
    );
}

module.exports = {
    login,
    getUsers,
    getUser,
    newUser
};