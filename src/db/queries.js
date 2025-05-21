const pool = require('./pool');


async function addNewUserToDatabase(username, password, creationTime){
    //check if username already exists
        //if exists return false
        //else:

    await pool.query('INSERT INTO users (username, password, user_creation_time) VALUES ($1, $2, $3)', [
            username,
            password,
            creationTime,
        ]);
        // and return true
}

module.exports = {
    addNewUserToDatabase,
}