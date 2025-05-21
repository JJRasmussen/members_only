const { Router } = require('express');
const { createNewUser } = require('../controllers/userController')

const indexRouter = Router();

indexRouter.get('/', (req, res) => res.render('index'));

indexRouter.get('/sign-up', (req, res) => res.render('sign-up-form'));
indexRouter.post('/sign-up', createNewUser);

module.exports = indexRouter;