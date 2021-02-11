const User = require('../models/user');

module.exports.profile = function(req,res){
    // if the user with this cookie id exists then
    if(req.cookies.user.id){
        User.findById(req.cookies.user.id, function(err, user){
            if(user){
                return res.render('user_profile', {
                    title : "User profile",
                    user : user
                });
            }

            return res.redirect('/users/sign-in');
        });
    }else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title : 'SOcial | Sign Up'
    });
}

module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title : 'SOcial | Sign In'
    });
}

module.exports.create = function(req,res){

    // check if password matches the confirm password
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    // find the user in the database to prevent double use of email
    User.findOne({email : req.body.email}, function(err, user){

        // if error
        if(err){ console.log('error in finding user'); return;}

        // if not found create a new user
        if(!user){
            User.create(req.body, function(err, user){
                if(err){ console.log('error in creating user'); return;}

                return res.redirect('/users/sign-in');
            })
            // else redirect to previous page to sign up again
        }else{
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req,res){
    User.findOne({email : req.body.email}, function(err, user){
        if(err){ console.log('error in finding user in the database'); return;}

        // handle for if user is found
        if(user){
            // check password and handle for an unmatch
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            // handle for correct password i.e session
            // create a cookie
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        // user not found
        else{
            return res.redirect('back');
        }
    });
}

