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

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    career_history: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    references: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Profile = mongoose.model("Profile", profileSchema);

module.exports = {
  User,
  Profile,
};
