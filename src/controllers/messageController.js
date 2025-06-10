const db = require('../db/queries/messageQueries');

async function getAllMessages(req, res){
    const rows = await db.queryGetAllMessages()
    return rows
};

async function createNewMessage(req, res){
    const { messageTitle, messageContent } = req.body
    await db.postNewMessage(messageTitle, messageContent, req.user.id)
    res.redirect('/');
};

module.exports = {
    getAllMessages,
    createNewMessage,
};