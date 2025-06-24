const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;