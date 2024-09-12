const fs = require("fs"); // Import the fs module
const { fetchSignedURLsFromS3, uploadToS3 } = require("../utils/s3Helper");
const Video = require("../models/Video");
const User = require("../models/User");

// @route   POST /video/upload
// @desc    Upload a video file to S3
// @access  Private
// Endpoint to upload a video file
const uploadVideo = async (req, res) => {
  // Set Cache-Control headers to prevent caching
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
  );

  try {
    const filePath = req.file.path;
    const fileName = req.file.originalname;
    const userID = req.user._id;

    const key = `${userID}/videos/${fileName}`;

    // Create a new video document and store it in the database
    const video = await Video.create({
      userID,
      fileName,
      key,
    });
    await video.save();

    // Upload the file to S3
    const result = await uploadToS3(filePath, fileName, userID);

    // Delete the file from local storage
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });

    // Respond with the S3 URL of the uploaded video
    res
      .status(200)
      .json({ message: "File uploaded successfully!", url: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @route   GET /video/history
// @desc    Fetch user's video files from S3
// @access  Private
// Endpoint to fetch a video file
const fetchVideo = async (req, res) => {
  // Set Cache-Control headers to prevent caching
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
  );

  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch videos related to the user, sorted by upload date
    const videos = await Video.find({ userID: user._id }).sort({
      uploadedAt: -1,
    });

    // Generate pre-signed URLs for each video
    const videosWithUrls = await fetchSignedURLsFromS3(videos);

    res.status(200).json(videosWithUrls);
  } catch (error) {
    console.error("Error fetching user videos:", error);
    res.status(500).json({ message: "Error fetching user videos" });
  }
};

module.exports = {
  uploadVideo,
  fetchVideo,
};
