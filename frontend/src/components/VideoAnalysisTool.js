import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Heading, Text, Input, useToast } from "@chakra-ui/react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
// Register one of the TF.js backends.
import "@tensorflow/tfjs-backend-webgl";

// Utility imports
import { drawKeypoints, drawSkeleton } from "../utils/keypointDrawing";
import smoothKeypoints from "../utils/keypointSmoothing";

const VideoAnalysisTool = () => {
  const [videoFile, setVideoFile] = useState(null); // Store the video file for browser playback
  const [videoURL, setVideoURL] = useState(""); // Store the video URL for playback
  const [detector, setDetector] = useState("");
  const videoRef = useRef(null); // Reference for the video element
  const canvasRef = useRef(null);
  const toast = useToast();

  const API_URL =
    process.env.REACT_APP_IS_PROD === "true"
      ? "app.engineeringstrength.io"
      : "http://localhost:5050";

  // Load PoseNet model on component mount
  useEffect(() => {
    const loadPoseNet = async () => {
      await tf.ready();

      const detectorConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
      };
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        detectorConfig
      );
      setDetector(detector);
    };
    loadPoseNet();
  }, []);

  // Run PoseNet on the video
  const runPoseNet = async () => {
    if (!detector || !videoRef.current || !canvasRef.current) return;

    console.log("Running posenet...");

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Get the video's position and size
    const videoRect = video.getBoundingClientRect();

    canvas.style.position = "absolute";
    canvas.style.top = `${videoRect.top}px`;
    canvas.style.left = `${videoRect.left}px`;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Start analyzing the video frames
    const analyzeFrame = async () => {
      if (video.paused || video.ended) return;

      console.log("Analyzing frame...");

      // Run posenet and get the keypoints
      const poses = await detector.estimatePoses(video);
      console.log(poses);

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw keypoints and skeleton on the canvas
      for (const pose of poses) {
        const smoothedKeypoints = smoothKeypoints(pose.keypoints);

        drawKeypoints(smoothedKeypoints, ctx);
        drawSkeleton(smoothedKeypoints, ctx);
      }
      //drawKeypoints(poses[0].keypoints, ctx);

      // Keep running the analysis if the video is still playing
      requestAnimationFrame(analyzeFrame);
    };
    analyzeFrame();
  };

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
      const response = await fetch(`${API_URL}/video/upload`, {
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

  // Handle video playback
  const handleVideoPlay = () => {
    runPoseNet(); // Start PoseNet analysis once the video is playing
  };

  // Handle video stop (pause/ended) and remove canvas
  const handleVideoStop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas when the video is paused or stopped
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            onPlay={handleVideoPlay} // Ensure the video is fully loaded
            onEnded={handleVideoStop} // Clear canvas when video ends
            width="480px" // Set the max width for the video
            height="640px"
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "480px", // Match the video width
              height: "640px", // Match the video height
              pointerEvents: "none", // Make sure the canvas doesn't block video interaction
            }}
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
