const {MongoClient, ObjectID} = require("mongodb");

// var user = {name: "Stefan", age: 20};
// var {name} = user; // ES6 destructuring
// console.log(name);

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }

  console.log("Connected to MongoDB server");

  // db.collection("Todos").insertOne({
  //   text: "Something to do",
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log("Unable to insert Todos", err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection("Users").insertOne({
  //   name: "Damon",
  //   age: 20,
  //   location: "New York"
  // }, (err, result) => {
  //   if (err) {
  //     console.log("Unable to insert Users", err);
  //   } else {
  //     console.log(result.ops[0]._id.getTimestamp());
  //   }
  // });

  db.close();
});

// using "return" here means if there's an error we'll stop running anything
// after the console.log();
