import React, { useState, useRef } from "react";
import { Box, Button, Heading, Text, Input, useToast } from "@chakra-ui/react";

const VideoAnalysisTool = () => {
  const [videoFile, setVideoFile] = useState(null); // Store the video file for browser playback
  const [videoURL, setVideoURL] = useState(""); // Store the video URL for playback
  const videoRef = useRef(null); // Reference for the video element
  const toast = useToast();

  // Handle video file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);

    // Create a URL for the video file to be used in the video player
    const videoURL = URL.createObjectURL(file);
    setVideoURL(videoURL);
  };

  // Save video to cloud (S3) after user confirms
  const handleSaveToHistory = async () => {
    if (!videoFile) {
      toast({
        title: "No video selected",
        status: "error",
        isClosable: true,
      });
      return;
    }

    // Trigger the upload to the backend (similar to the previous upload process)
    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5050/video/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        console.log("Response data:", data); // Log the full response

        toast({
          title: "Video saved to history",
          description: `Video URL: ${data.url}`,
          status: "success",
          isClosable: true,
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast({
        title: "Error saving video",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading size="lg">Video Analysis Tool</Heading>
      <Text mb={4}>
        Upload a video for analysis. You can play back the video and analyze it
        without saving it to history.
      </Text>

      {/* Video Upload Input */}
      <Input type="file" accept="video/*" onChange={handleFileChange} mb={4} />

      {/* Video Playback */}
      {videoURL && (
        <Box>
          <video
            ref={videoRef}
            src={videoURL}
            controls
            maxwidth="600px" // Set the max width for the video
            height="auto" // Maintains the aspect ratio
          />
        </Box>
      )}

      {/* Save to History Button */}
      <Button
        onClick={handleSaveToHistory}
        colorScheme="blue"
        isDisabled={!videoFile}
      >
        Save Video to History
      </Button>
    </Box>
  );
};

export default VideoAnalysisTool;
