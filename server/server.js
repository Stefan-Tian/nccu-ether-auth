require('./config/config');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const cors = require('cors');
const _ = require('lodash');

const app = express();

app.use(cors());
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then(
    todos => {
      res.send({ todos });
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;

  // valid id using isValid
  if (!ObjectID.isValid(id)) {
    // 404 - send back empty body
    return res.status(404).send();
  }

  // findById
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then(
    todo => {
      // success
      if (todo) {
        // if todo - send it back
        return res.send({ todo });
      }
      // if not - send back 404 with empty body
      res.status(404).send();
    },
    err => {
      // Error
      // 400 - and send empty back
      res.status(400).send(err);
    }
  );
});

app.delete('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Invalid ID');
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  })
    .then(todo => {
      if (todo) {
        return res.send({ todo });
      }
      res.status(404).send('ID not found');
    })
    .catch(err => {
      res.status(400).send();
    });
});

app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']); // limit items that can be updated

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Invalid ID');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(
    {
      _id: id,
      _creator: req.user._id
    },
    { $set: body },
    { new: true }
  )
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }

      res.send({ todo });
    })
    .catch(err => {
      res.status(404).send();
    });
});

app.post('/create-user', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.get('/users/me', (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch(err => {
      res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    err => {
      res.status(400).send();
    }
  );
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
