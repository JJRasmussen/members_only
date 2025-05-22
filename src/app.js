const path = require('node:path');
const express = require('express');
const session = require('express-session');
const { passport } = require('./passport/passport');
const LocalStrategy = require('passport-local').Strategy
const indexRouter = require('./routes/indexRouter');
const pool = require('./db/pool');
require('dotenv').config();

const app = express();

//setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//setup styles
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

//setup session
app.use(session({ 
    store: new(require('connect-pg-simple')(session))({
        //insert connect-pg-simple options
        pool: pool,
    }),
    secret: 'cats',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30*24*60*60*1000 } //30 days
}));

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

app.listen(3000, () => console.log(`app listening on port ${3000}!`));
