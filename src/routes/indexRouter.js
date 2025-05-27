const { Router } = require('express');
const { validationResult } = require('express-validator');
const { createNewUser } = require('../controllers/userController')
const { passport } = require('../passport/passport');
const { isAuth, isMember, isAdmin } = require('./middleware/authrization');
const { newUserSchema } = require('./middleware/validatorSchemas');
const indexRouter = Router();

//public routes

indexRouter.get('/', (req, res) => {
    res.render('index', { user: req.user })
});

indexRouter.get('/sign-up', (req, res) => res.render('sign-up-form'));

indexRouter.post('/sign-up', 
    newUserSchema,
    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).render('sign-up-form', {
            errors: errors.array(),
        });
    }
        createNewUser(req, res, next);
        res.redirect('/');
    }
);

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


module.exports = indexRouter;