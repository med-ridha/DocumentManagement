const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/mydb")
    .then(() => console.log("database Connected"))
    .catch((error) => console.error(error));

module.exports = mongoose;
