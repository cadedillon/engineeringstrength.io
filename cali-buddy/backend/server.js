// server.js
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const uploadFile = require("./upload");
const app = express();
const port = process.env.PORT || 3000;

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save uploaded files temporarily
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
