// models/userModel.js

const db = require("../db.js");

const bcrypt = require("bcrypt");

const getUserByUsername = (username, callback) => {
  console.log(username + 'desde Model');
  const query = "SELECT * FROM users WHERE user_name = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results[0]);
  });
};

const comparePassword = (password, hashedPassword, callback) => {
  bcrypt.compare(password, hashedPassword, (err, isMatch) => {
    if (err) {
      console.log(err + "bcrypt");
      return callback(err);
    }
    return callback(null, isMatch);
  });
};


module.exports = {
  getUserByUsername,
  comparePassword,
};
