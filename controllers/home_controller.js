const { readSync } = require("fs");

module.exports.home = function(req, res){
    console.log(req.cookies);
    // to change the value of the user id
    res.cookie('user_id', 14);  
    return res.render('home', {
        title : 'Home Page'
    });
}

