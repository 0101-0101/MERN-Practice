const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: { type: Boolean, default: false, required: true }
  })
);

module.exports = User;
