const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Codial-development', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('err', console.error.bind(console, "error in connecting to the database"));
db.once('open', function() {
    console.log('Successfully Connected To codieal development database');
});
module.exports = db;