const express = require('express');
const port = 8000;

const app = express();

// use express router
app.use('/', require('./route/index')); 
