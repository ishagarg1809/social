const express = require('express');
const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

// use express router
app.use('/', require('./route')); 

app.get('/', require('./route/index'));

app.listen(port, function(err){
    if(err){ console.log(`error in running the server : ${err}`); return;}

    console.log(`server is running on port : ${port}`);
});
