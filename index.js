const express = require('express');
const port = 8000;

const app = express();
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
app.set('view engine', 'ejs');
app.set('views', './views');
LocalStrategy = require('passport-local').Strategy;
// middleware
app.use(express.urlencoded());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// use express router
app.use('/', require('./route')); 

app.get('/', require('./route/index'));

app.listen(port, function(err){
    if(err){ console.log(`error in running the server : ${err}`); return;}

    console.log(`server is running on port : ${port}`);
});
