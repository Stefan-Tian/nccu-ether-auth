const {MongoClient, ObjectID} = require("mongodb");

// var user = {name: "Stefan", age: 20};
// var {name} = user; // ES6 destructuring
// console.log(name);

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  // delete many
  // db.collection("Todos").deleteMany({
  //   text: "Take medicine"
  // }).then((result) => {
  //     console.log(result);
  // });

  // delete one
  // db.collection("Todos").deleteOne({
  //   text: "Take medicine"
  // }).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection("Todos").findOneAndDelete({
  //   text: "Take medicine"
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection("Users").deleteMany({
    name: "Stefan"
  }).then((result) => {
    console.log(result);
  });

  db.collection("Users").findOneAndDelete({
    _id: new ObjectID("59775811a464c52026f84441")
  }).then((result) => {
    console.log(result);
  });


  // db.close();
});

// using "return" here means if there's an error we'll stop running anything
// after the console.log();
