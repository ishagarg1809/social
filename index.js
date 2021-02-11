const express = require('express');
const port = 8000;
const app = express();
const cookieParser = require('cookie-parser');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name : 'SOcial',
    secret : 'Blahsomething',  // use a more encrypted key at the time of deployment
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);  //used as a middleware

// use express router
app.use('/', require('./route')); 

// middleware
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.get('/', require('./route/index'));




app.listen(port, function(err){
    if(err){ console.log(`error in running the server : ${err}`); return;}

    console.log(`server is running on port : ${port}`);
});
