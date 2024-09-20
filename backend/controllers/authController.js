const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @desc    Register new user
// @route   POST /auth/register
// @access  Public
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Set Cache-Control headers to prevent caching
    res.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
    });
    await user.save();

    // Send a success response
    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc    Authenticate user & get token
// @route   POST /auth/login
// @access  Public
const login = async (req, res) => {
  // Set Cache-Control headers to prevent caching
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
  );

  const { username, password } = req.body;

  try {
    // Check for user
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Export the functions
module.exports = {
  register,
  login,
};
