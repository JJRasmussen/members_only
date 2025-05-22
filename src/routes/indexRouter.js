const { Router } = require('express');
const { createNewUser} = require('../controllers/userController')
const { passport } = require('../passport/passport');
const { isAuth, isMember, isAdmin } = require('./authMiddleware')

const indexRouter = Router();
//public routes
indexRouter.get('/', (req, res) => {
    res.render('index', { user: req.user })
});

//isUser routes
indexRouter.get('/protected-route', isAuth, (req, res, next) => {
    res.send('You made it to the route');
});

//isMember routes
indexRouter.get('/member-route', isMember, (req, res, next) => {
    res.send('You made it to the member route');
});

//isAdmin routes
indexRouter.get('/admin-route', isAdmin, (req, res, next) =>{
    res.send('You made it to the admin route')
});

//sign up, login and logout
indexRouter.get('/sign-up', (req, res) => res.render('sign-up-form'));
indexRouter.post('/sign-up', createNewUser);

indexRouter.post('/log-in', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    }));
indexRouter.get('/log-out', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    })
});


module.exports = indexRouter;