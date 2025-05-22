const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { getUserFromUsername, getUserFromID } = require('../db/queries')


passport.use(
    new LocalStrategy(async (username, password, done) => {
        try{
            const user = await getUserFromUsername(username);
        
            if (!user) {
                return done(null, false, {message: 'Incorrect username'});
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        } catch(err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserFromID(id);
        done(null, user);
    } catch(err) {
        done(err);
    }
});

module.exports = {
    passport,
}