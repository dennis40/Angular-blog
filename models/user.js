const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserByLogin = (login, callback) => {
  const query = {
    login,
  };
  User.findOne(query, callback);
};

module.exports.getUserById = (id, callback) => {
  User.findOne(id, callback);
};

module.exports.addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        throw err;
      }
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePass = (inputPassword, currentPassword, callback) => {
  bcrypt.compare(inputPassword, currentPassword, (err, isMatch) => {
    if (err) {
      throw err;
    }
    callback(null, isMatch);
  });
};
