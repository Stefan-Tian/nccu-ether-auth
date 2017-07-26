const {MongoClient, ObjectID} = require("mongodb");

// var user = {name: "Stefan", age: 20};
// var {name} = user; // ES6 destructuring
// console.log(name);

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  // db.collection("Todos").find({completed: false}).toArray().then((docs) => {
  //   console.log("Todos");
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log("Unable to fetch todos", err);
  // });

  db.collection("Users").find({
    name: "Stefan"
  }).toArray().then((docs) => {
    console.log("Users");
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log("Unable to fetch todos", err);
  });

  // db.close();
});

// using "return" here means if there's an error we'll stop running anything
// after the console.log();
