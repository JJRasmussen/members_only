const db = require('../db/queries');
const { format } = require('date-fns')

async function createNewUser(req, res, next){
    const { username, password } = req.body
    const creationTime = format(new Date(), "dd/MM/yyyy");
    try {
        await db.addNewUserToDatabase(username, password, creationTime);
        res.redirect('/');
    } catch(err) {
        return next(err);
    }
}

module.exports = {
    createNewUser,
}