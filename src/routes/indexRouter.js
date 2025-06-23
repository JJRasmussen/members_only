const { Router } = require('express');
const { validationResult } = require('express-validator');
const { createNewUser, giveMemberStatus, removeMemberStatus } = require('../controllers/userController')
const { passport } = require('../passport/passport');
const { isAuth, isMember, isAdmin } = require('./middleware/authrization');
const { newUserSchema } = require('./middleware/validatorSchemas');
const { getAllMessages, createNewMessage } = require('../controllers/messageController');
const indexRouter = Router();

//public routes
indexRouter.get('/', async (req, res) => {
    messages = await getAllMessages();
    let userCreated = (req.query.userCreation === 'true');
    let invalidLogin = (req.query.invalidLogin === 'true');
    res.render('index', { 
        user: req.user,
        messages: messages,
        userCreated: userCreated,
        invalidLogin: invalidLogin
    });
});

indexRouter.get('/sign-up', (req, res) => res.render('sign-up-form', { user: req.user }));
indexRouter.post('/sign-up', 
    newUserSchema,
    (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).render('sign-up-form', {
            errors: errors.array(),
            user: req.user
        });
    };
        createNewUser(req, res, next);
        res.redirect('/?userCreation=true');
    }
);

indexRouter.post('/log-in', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/?invalidLogin=true'
    }));
indexRouter.get('/log-out', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        };
        res.redirect('/');
    });
});

//isUser routes
indexRouter.get('/member-status', isAuth, (req, res, next) => {
    res.render('member-status', { 
        user: req.user,
        message: null
    });
});
indexRouter.post('/member-status/add', isAuth, (req, res, next) => {
    if(req.body.membershipPassword.toUpperCase() != 'DRY'){
        res.render('member-status', {
            user: req.user,
            message: 'Incorrect password, please try again or consider a hint.'});
    } else {
        giveMemberStatus(req, res, next);
        res.redirect('/');   
    }
});
indexRouter.post('/member-status/remove', isAuth, (req, res, next) => {
    removeMemberStatus(req, res, next);
    res.redirect('/member-status', {
        user: req.user,
        message: null});
});

//isMember routes
indexRouter.post('/new-message', isMember, createNewMessage);

//isAdmin routes
indexRouter.get('/admin', isAdmin, (req, res, next) =>{
    res.send('You made it to the admin route');
});


module.exports = indexRouter;