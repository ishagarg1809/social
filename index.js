const express = require('express');
const port = 8000;

const app = express();

// use express router
app.use('/', require('./route')); 


const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.set('views', './views');

// middleware
app.use(express.urlencoded());
app.use(cookieParser());

app.get('/', require('./route/index'));

app.listen(port, function(err){
    if(err){ console.log(`error in running the server : ${err}`); return;}

    console.log(`server is running on port : ${port}`);
});
