
const pool = require('../pool');

async function queryGetAllMessages(){
    const { rows } = await pool.query('SELECT userid, title, text_content, message_timestamp FROM messages');
    console.log("messageQueries says:")
    console.log(rows)
    return rows;
};

async function postNewMessage(messageTitle, messageContent, messageUser){
    console.log("createNewMessage in messageQueries says")
    console.log('messageTitle: ' + messageTitle)
    console.log('messageContent: ' + messageContent)
    console.log('messageUser: ' + messageUser)
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