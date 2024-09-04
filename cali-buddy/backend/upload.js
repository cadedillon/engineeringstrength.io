// upload.js
const fs = require("fs");
const path = require("path");
const s3 = require("./aws-config");

const uploadFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: path.basename(filePath), // File name you want to save as in S3
    Body: fileContent,
    ContentType: "video/mp4", // Adjust the content type if necessary
  };

  return s3.upload(params).promise(); // Return a promise for async/await support
};

module.exports = uploadFile;
