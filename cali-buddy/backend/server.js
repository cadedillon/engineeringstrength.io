// server.js
require("dotenv").config();

const express = require("express");
const fs = require("fs"); // Import the fs module

const multer = require("multer");
const uploadFile = require("./upload");

const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Middleware
app.use(express.json());

// Auth routes
app.use("/auth", authRoutes);

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "temp"); // Save uploaded files temporarily
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Endpoint to upload a video file
app.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Upload the file to S3
    const result = await uploadFile(filePath);

    // Delete the file from local storage
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });

    // Respond with the S3 URL of the uploaded video
    res
      .status(200)
      .json({ message: "File uploaded successfully!", url: result.Location });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
