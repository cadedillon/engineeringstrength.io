const express = require("express");
const multer = require("multer");
const { uploadVideo, fetchVideo } = require("../controllers/videoController");

//const { protect } = require("../middleware/auth"); // Protect route with auth middleware

const router = express.Router();

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

// @route   POST /video/upload
// @desc    Upload a video file to S3
// @access  Private
router.post("/upload", upload.single("video"), uploadVideo);

// @route   GET /api/video/:id
// @desc    Fetch video from S3
// @access  Private
router.get("/:id", fetchVideo);

module.exports = router;
