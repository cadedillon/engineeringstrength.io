// upload.js
const fs = require("fs");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// Initialize the S3 client
const s3 = new S3Client({ region: process.env.AWS_REGION });

const uploadFile = async (filePath) => {
  try {
    const fileContent = fs.readFileSync(filePath);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: path.basename(filePath), // File name you want to save as in S3
      Body: fileContent,
      ContentType: "video/mp4", // Adjust the content type if necessary
    };

    // Create a command instance
    const command = new PutObjectCommand(params);

    // Send the command to S3
    await s3.send(command);

    // Construct the file location URL manually
    const fileLocation = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

    console.log("File uploaded successfully. File location:", fileLocation);
    return fileLocation;
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err; // Re-throw the error after logging it
  }
};

module.exports = uploadFile;
