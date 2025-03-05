const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role", // Reference to the Role table
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Login = mongoose.model("Login", loginSchema);
module.exports = Login;
