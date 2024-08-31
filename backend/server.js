const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const { User, Profile } = require("../backend/db");

// Use CORS middleware
app.use(
  cors({
    origin: "http://127.0.0.1:5501", // Replace with your frontend origin
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // Allow credentials
  })
);


// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors preflight
app.options("*", cors({
  origin: "http://127.0.0.1:5501",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true, // Allow credentials
}));


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

// create profile request
app.post("/api/createProfile", async (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    about,
    career_history,
    education,
    skills,
    references,
  } = req.body;

  try {
    // Assuming you have a Profile model similar to User model
    const profile = await Profile.create({
      name,
      email,
      phone,
      address,
      about,
      career_history,
      education,
      skills,
      references,
    });

    res.status(201).json({
      msg: "Profile created successfully",
      profile,
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// view profile request
app.post("/api/getProfile", async (req, res) => {
  const { email } = req.body;

  try {
    // Fetch user profile based on email
    const profile = await Profile.findOne({ email: email }); // Adjust query based on your schema

    if (profile) {
      res.status(200).json({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        about: profile.about,
        careerHistory: profile.career_history,
        education: profile.education,
        skills: profile.skills,
        references: profile.references,
      });
    } else {
      res.status(404).json({ msg: "Profile not found" });
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
