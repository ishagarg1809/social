
// module.exports.profile = function(req,res){
//     res.end('<h1> user profile </h1>');
// }

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