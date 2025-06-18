
const pool = require('../pool');

async function queryGetAllMessages(){
    const { rows } = await pool.query('SELECT username, title, text_content, message_timestamp FROM messages inner join users ON messages.userid = users.id');
    return rows;
};

async function postNewMessage(messageTitle, messageContent, messageUser){
    await pool.query(
        'INSERT INTO messages (title, text_content, userid, message_timestamp) VALUES ($1, $2, $3, $4)', [
            messageTitle, 
            messageContent,
            messageUser,
            new Date()]
    );
};

module.exports = {
    queryGetAllMessages,
    postNewMessage
}