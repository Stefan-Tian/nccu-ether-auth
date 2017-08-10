const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const password = "123abc"

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

const hashedPassword = "$2a$10$GzyWvU3cuNnkweL0F0HN9OZFZ9cqywAuyrEuz4onH13KVzWc13zo.";

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// let data = {
//   id: 4
// };
//
// const token = jwt.sign(data, "123abc");
// console.log(token);
//
// const decoded = jwt.verify(token, "123abc");
// console.log(decoded);
// const message = "I am user number 3";
// const hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash message: ${hash}`);
//
// let data = {
//   id: 4
// };
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// const resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();
// if (resultHash === token.hash) {
//   console.log("Data was not changed");
// } else {
//   console.log("Data is hacked!!!!");
// }
