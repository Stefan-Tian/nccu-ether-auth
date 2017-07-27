const {MongoClient, ObjectID} = require("mongodb");

// var user = {name: "Stefan", age: 20};
// var {name} = user; // ES6 destructuring
// console.log(name);

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }

  console.log("Connected to MongoDB server");

  // db.collection("Todos").findOneAndUpdate({
  //   _id: new ObjectID("597742cf906abb1ea8797dc9")
  // }, {
  //   $set: {
  //     text: "Sign up for more courses",
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection("Users").findOneAndUpdate(
    {_id: new ObjectID("59788b16eb937610098d774f")},
    {
      $set: {name: "Elena"},
      $inc: {age: 1}
    },
    {returnOriginal: false}).then((result) => {
      console.log(result);
    });

  // db.close();
});

// using "return" here means if there's an error we'll stop running anything
// after the console.log();
