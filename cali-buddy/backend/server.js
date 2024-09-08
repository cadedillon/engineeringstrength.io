// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const app = express();

const REACT_URL =
  process.env.IS_PROD === "true"
    ? "https://engineeringstrength.io:3000"
    : "http://localhost:3000";

const corsOptions = {
  origin: `${REACT_URL}`, // Allow only this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify which methods are allowed
  credentials: true, // Allow cookies and other credentials
};

app.use(cors(corsOptions));

const port = process.env.PORT || 5050;

// Middleware
app.use(express.json());

// Auth routes
app.use("/auth", authRoutes);

// Video routes
app.use("/video", videoRoutes);

// Only start the server if not in test environment
// Only connect to the database if not in test environment
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app; // Export the app instance for testing
