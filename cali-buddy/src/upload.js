const fs = require("fs");
const path = require("path");
const s3 = require("./aws-config");

const uploadFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: path.basename(filePath),
    Body: fileContent,
    ContentType: "video/mp4", // Adjust the content type if necessary
  };

  return s3.upload(params).promise();
};

module.exports = uploadFile;
