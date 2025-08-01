const pool = require('../pool');

async function addNewUserToDatabase(username, password, creationTime){
    await pool.query('INSERT INTO users (username, hashed_password, user_creation_time) VALUES ($1, $2, $3)', [
            username,
            password,
            creationTime,
        ]
    );
}

//get users
async function getUserFromUsername(username){
    const { rows } = await pool.query('SELECT * FROM users WHERE username = ($1)', [username])
    return rows[0];
}
async function getUserFromID(id){
    const { rows } = await pool.query('SELECT * FROM users WHERE id = ($1)', [id]);
    return rows[0];
}

//update membership
async function setMembershipStatus(user, status){
    await pool.query(`UPDATE users SET is_member = ${status.toString()} WHERE username = '${user.username}'`)
};
module.exports = {
    addNewUserToDatabase,
    getUserFromUsername,
    getUserFromID,
    setMembershipStatus,
}