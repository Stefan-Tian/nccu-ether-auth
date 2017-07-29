const {mongoose} = require("./db/mongoose");
const {Todo} = require("./models/todo");
const {user} = require("./models/user");

const express = require("express");
const bodyParser = require("body-parser");
const {ObjectID} = require("mongodb");

const app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get("/todos", (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get("/todos/:id", (req, res) => {
  let id = req.params.id;

  // valid id using isValid
  if (!ObjectID.isValid(id)) {
    // 404 - send back empty body
    res.status(404).send();
  }

  // findById
  Todo.findById(id).then((todo) => {
    // success
    if (todo) {
      // if todo - send it back
      return res.send({todo});
    }
    // if not - send back 404 with empty body
    res.status(404).send();
  }, (err) => {
    // Error
    // 400 - and send empty back
    res.status(400).send();
  });
});

app.listen(3111, () => {
  console.log("Started on port localhost:3111");
});

module.exports = {app};
