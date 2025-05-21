const db = require('../db/queries');

async function createNewUser(req, res, next){
    const { username, password } = req.body
    try {
        const succesfullAddition = await db.addNewUserToDatabase(username, password);
        if (successfullAddition){
            res.redirect('/');
        } else {
            res.redirect('/sign-up')
        }
    } catch(err) {
        return next(err);
    }
}

module.exports = {
    createNewUser,
}