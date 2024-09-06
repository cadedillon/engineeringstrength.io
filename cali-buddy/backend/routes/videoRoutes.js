const express = require("express");
const upload = require("../utils/multerConfig");
const { uploadVideo, fetchVideo } = require("../controllers/videoController");

const { protect } = require("../middleware/auth"); // Protect route with auth middleware

const router = express.Router();

// @route   POST /video/upload
// @desc    Upload a video file to S3
// @access  Private
router.post("/upload", protect, upload.single("video"), uploadVideo);

// @route   GET /api/video/:id
// @desc    Fetch video from S3
// @access  Private
router.get("/:id", protect, fetchVideo);

module.exports = router;
