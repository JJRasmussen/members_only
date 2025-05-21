const path = require('node:path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const { Pool } = require('pg');
const indexRouter = require('./routes/indexRouter');
require('dotenv').config();

const app = express();

//setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//setup styles
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use(session({ 
    secret: 'cats',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(3000, () => console.log(`app listening on port ${3000}!`));
