const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  token: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;