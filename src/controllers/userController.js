const db = require('../db/queries/userQueries');
const bcrypt = require('bcryptjs');
const { format } = require('date-fns');

async function createNewUser(req, res, next){
    const creationTime = format(new Date(), "dd/MM/yyyy");
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.HASH_LENGTH));
        await db.addNewUserToDatabase(req.body.username, hashedPassword, creationTime);
    } catch(err) {
        console.error(err);
        next(err);
    };
};

async function giveMemberStatus(req, res, next){
    try {
        await db.setMembershipStatus(req.user, true)
    } catch(err) {
        console.error(err);
        next(err);
    };
};

async function removeMemberStatus(req, res, next){
    try {
        await db.setMembershipStatus(req.user, false)
    } catch(err) {
        console.error(err);
        next(err);
    };
};



module.exports = {
    createNewUser,
    giveMemberStatus,
    removeMemberStatus

};