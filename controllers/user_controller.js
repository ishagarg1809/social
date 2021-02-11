
// module.exports.profile = function(req,res){
//     res.end('<h1> user profile </h1>');
// }

const User = require('../models/user');

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
    if(res.body.password != req.body.confirm_password){
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
    //Todo later
    return res.redirect('/');
}

