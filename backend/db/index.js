const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://trySingh:sa123@try-clustor0.59gvu.mongodb.net/hack-heritage"
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
