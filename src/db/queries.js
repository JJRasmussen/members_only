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
async function getUserFromUsername(username){
    const { rows } = await pool.query('SELECT * FROM users WHERE username = ($1)', [username])
    return rows[0];
}
async function getUserFromID(id){
    const { rows } = await pool.query('SELECT * FROM users WHERE id = ($1)', [id]);
    return rows[0];
}
module.exports = {
    addNewUserToDatabase,
    getUserFromUsername,
    getUserFromID,
}