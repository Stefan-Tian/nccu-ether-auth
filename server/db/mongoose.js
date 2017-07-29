const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://thisisusername:thisispassword@ds127443.mlab.com:27443/stefan-todo-api",
 { useMongoClient: true });

module.exports = {mongoose};


// heroku config:set MONGODB_URI="mongodb://thisisusername:thisispassword@ds127443.mlab.com:27443/stefan-todo-api"
// run this in terminal
