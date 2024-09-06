const fs = require("fs"); // Import the fs module
const { fetchFromS3, uploadToS3 } = require("../utilities/s3Helper");

// @route   POST /video/upload
// @desc    Upload a video file to S3
// @access  Private
// Endpoint to upload a video file
const uploadVideo = async (req, res) => {
  try {
    const filePath = req.file.path;

    // Upload the file to S3
    const result = await uploadToS3(filePath);

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
};

// @route   GET /video/:id
// @desc    Fetch a video file from S3
// @access  Private
// Endpoint to fetch a video file
const fetchVideo = async (req, res) => {
  try {
    const videoKey = req.params.id;

    const videoStream = await fetchFromS3(videoKey);

    // Set headers for video playback in the browser
    res.setHeader("Content-Type", "video/mp4");

    // Stream the video to the client
    videoStream.pipe(res);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ error: "Failed to fetch video" });
  }
};

module.exports = {
  uploadVideo,
  fetchVideo,
};
