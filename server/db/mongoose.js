const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let db = {
  localhost: "mongodb://localhost:27017/TodoApp",
  mlab: "mongodb://thisisusername:thisispassword@ds127443.mlab.com:27443/stefan-todo-api"
};

mongoose.connect(db.localhost || db.mlab, { useMongoClient: true });

module.exports = {mongoose};


// heroku config:set MONGODB_URI="mongodb://thisisusername:thisispassword@ds127443.mlab.com:27443/stefan-todo-api"
// run this in terminal
