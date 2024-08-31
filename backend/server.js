const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const { User } = require("../backend/db");

// Use CORS middleware
app.use(
  cors({
    origin: "http://127.0.0.1:5501", // Replace with your frontend origin
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// signup request
app.post("/api/signup", async (req, res) => {
  const { name, dob, email, password } = req.body;

  const isUserExist = await User.findOne({ email: email });
  // if user already exist.
  if (isUserExist) {
    res.status(200).send("User already exist");
  } else {
    // if user doesn't exist.
    await User.create({
      name: name,
      dateOfBirth: dob,
      email: email,
      password: password,
    });
    res.status(200).json({
      msg: "user created successfully 😁😁😁",
    });
  }
});

// signin request
app.post("/api/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  if (user.password !== password) {
    return res.status(404).json({
      msg: "password is incorrect",
    });
  }

  // if every credential is true
  res.status(200).json({
    msg: "User found successfully",
    user,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
