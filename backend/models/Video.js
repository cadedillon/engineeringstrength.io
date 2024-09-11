const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who uploaded
  fileName: { type: String, required: true },
  description: String,
  key: { type: String, required: true }, // Path to the video in S3
  uploadedAt: { type: Date, default: Date.now }, // Date of upload
  thumbnailUrl: String, // Optional: path to the video thumbnail
  tags: [String], // Optional: tags to describe the video
});

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
