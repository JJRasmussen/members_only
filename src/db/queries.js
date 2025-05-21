const pool = require('./pool');


async function addNewUserToDatabase(username, password){
    //check if username already exists
        //if exists return false
        //else:
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [
            req.body.username,
            req.body.password,
        ]);
        // and return true
}

module.exports = {
    addNewUserToDatabase,
}