const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new localStrategy({
        usernameField : 'email'
    },
    function(email, password, done){
        // find a user and establish identity

        User.findOne({email : email}, function(err, user){
            if(err){console.log('Error in finding user => passport');
            return done(err); // callback function
        }

        if(!user || user.password != password){
            console.log('Inavlid Username/Password');
            return done(null, false); //false is authentication ie failed to authenticate user
        }

        return done(null, user);

        });
    }
));

// serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user');
            return done(err);
        }

        return done(null, user);
    });
});

// check if the user is authenticated

passport.checkAuthentication = function(req, res, next){
    // if user is signed in, then pass the request to the next function (controller's action)

    if(req.isAuthenticated()){
        return next(); //move onto next page
    }

    // if user is not signed in

    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie
        // and we are just sending this to the locals for the views

        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;



