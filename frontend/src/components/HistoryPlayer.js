import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const HistoryPlayer = ({ options, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      // Create the video.js element dynamically and append it to the DOM
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("Player is ready");
        if (onReady) {
          onReady(player);
        }
      }));

      // Error handling
      player.on("error", () => {
        console.error("VideoJS Error:", player.error());
      });
    } else if (playerRef.current) {
      // If player already exists, update the source on options change
      const player = playerRef.current;
      player.src(options.sources);
      player.autoplay(options.autoplay);
      console.log(player.currentSource());
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options]);

  console.log(options);

  return (
    <div
      className="video-container"
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
        style={{
          width: "480px",
          height: "640px",
          objectFit: "contain",
          maxWidth: "100%", // Prevent the video from expanding beyond the container
          maxHeight: "100%", // Prevent the video from expanding beyond the container
        }}
      />
    </div>
  );
};

export default HistoryPlayer;
