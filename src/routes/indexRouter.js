const { Router } = require('express');
const { createNewUser } = require('../controllers/userController')
const { passport } = require('../passport/passport')

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
    res.render('index', { user: req.user })
});
indexRouter.post('/log-in', 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    })
);
indexRouter.get('/log-out', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    })
})

indexRouter.get('/sign-up', (req, res) => res.render('sign-up-form'));
indexRouter.post('/sign-up', createNewUser);


module.exports = indexRouter;