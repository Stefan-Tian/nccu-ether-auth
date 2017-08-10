const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 10,
    trim: true,
    unique: true,
    validate: {
      isAsync: false,
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ["_id", "email"]);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = "auth";
  const token = jwt.sign({ _id: user._id.toHexString(), access }, "abc123").toString();

  user.tokens.push({ access, token });

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, "abc123")
  } catch(e) {
    // return new Promse((resolve, reject) {
    //   reject();
    // });
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  }); // " " is necessary when you have dots
};

// this is the middleware that will ve run before saving to mongodb
UserSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) { // we want to make sure the password is changed or newly created
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = {User};
