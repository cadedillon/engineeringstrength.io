import React, { useEffect, useRef } from "react";

// VideoPlayer.js
import videojs from "video.js";
import "video.js/dist/video-js.css";

import "@tensorflow/tfjs-backend-webgl";

// Utility imports
import { drawKeypoints, drawSkeleton } from "../utils/keypointDrawing";
import smoothKeypoints from "../utils/keypointSmoothing";

const PoseNetPlayer = ({ options, onPlayerReady, detector, onClick }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!detector) {
      console.log("No detector available.");
      return;
    }

    console.log("Detector received: ", detector);

    if (videoRef.current && !playerRef.current) {
      const player = videojs(videoRef.current, options, () => {
        if (onPlayerReady) {
          onPlayerReady(player);
        }
      });
      playerRef.current = player;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [detector, options, onPlayerReady]);

  // Run PoseNet on the video
  const runPoseNet = async () => {
    if (!playerRef.current) {
      console.log("PoseNet detector or video/canvas ref not ready");
      return;
    }

    const video = playerRef.current.el().getElementsByTagName("video")[0];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.style.position = "absolute";
    canvas.style.top = `0px`;
    canvas.style.left = `$0px`;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Start analyzing the video frames
    const analyzeFrame = async () => {
      if (video.paused || video.ended) return;

      // Run posenet and get the keypoints
      const poses = await detector.detector.estimatePoses(video);

      // Uncomment to check pose data during debug
      //console.log(poses);

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw keypoints and skeleton on the canvas
      for (const pose of poses) {
        const smoothedKeypoints = smoothKeypoints(pose.keypoints);

        drawKeypoints(smoothedKeypoints, ctx);
        drawSkeleton(smoothedKeypoints, ctx);
      }

      // Keep running the analysis if the video is still playing
      requestAnimationFrame(analyzeFrame);
    };
    analyzeFrame();
  };

  // Handle video play, but only run PoseNet if it's ready
  const handleVideoPlay = () => {
    runPoseNet();
  };

  // Handle video stop (pause/ended) and remove canvas
  const handleVideoStop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas when the video is paused or stopped
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div
      className="video-container"
      onClick={onClick}
      style={{
        width: "480px", // Ensure the video container takes the full width
        height: "640px", // Ensure the video container takes the full height
        display: "flex", // Flexbox to center video if needed
        justifyContent: "center",
        alignItems: "center",
        objectFit: "contain",
        overflow: "hidden", // Prevent any overflow
      }}
    >
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        controls
        onPlay={handleVideoPlay} // Ensure the video is fully loaded
        onEnded={handleVideoStop} // Clear canvas when video ends
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          maxWidth: "100%", // Prevent the video from expanding beyond the container
          maxHeight: "100%", // Prevent the video from expanding beyond the container
        }} // Stretch video to fill container
      />
      {/* Canvas for PoseNet */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", // Overlay canvas on top of video
          top: 0,
          left: 0,
          width: "480px", // Ensure canvas matches video size
          height: "640px",
          pointerEvents: "none", // Ensure canvas doesn't block video controls
        }}
      />{" "}
    </div>
  );
};

export default PoseNetPlayer;
