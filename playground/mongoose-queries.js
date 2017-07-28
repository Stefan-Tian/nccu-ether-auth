const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

// const id = "597b51dac5a2a84239a46e31";
//
// if (!ObjectID.isValid(id)) {
//   console.log("ID not valid");
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log("Todos", todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log("Todo", todo);
// });
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log("Todo not found with that id!");
//   }
//   console.log("Todo", todo)
// }).catch((err) => console.log("Invalid ID"));

const id = "597ab1bd30ed2e33363cba79";

User.findById(id).then((user) => {
  if (!user) {
    return console.log("User not found");
  }

  console.log(`User: ${user}`);
}).catch((e) => console.log("Invalid ID"));
