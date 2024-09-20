import HistoryPlayer from "../HistoryPlayer";
import { useRef } from "react";

import { Card, CardBody } from "@chakra-ui/react";

const VideoHistoryCard = ({ videoURL }) => {
  const playerRef = useRef(null);

  console.log(videoURL);
  // Example Video.js options
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    preload: "auto",
    playbackRates: [0.5, 1, 1.5, 2], // Enable playback speed control with these options
    disablePictureInPicture: true, // Disable Picture-in-Picture mode
    controlBar: {
      fullscreenToggle: false, // Disable Fullscreen mode
    },
    sources: [
      {
        src: videoURL,
        type: "video/mp4",
      },
    ],
  };

  return (
    <Card
      borderRadius="md"
      boxShadow="md"
      width="480px"
      height="640px"
      shadow="md"
      position="relative"
    >
      <CardBody
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        p="0"
      >
        {/* <HistoryPlayer options={videoJsOptions} /> */}
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
            width="480px"
            height="640px"
            controls
            src={videoURL} // Check if the video URL works in a native HTML5 video tag
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              maxWidth: "100%", // Prevent the video from expanding beyond the container
              maxHeight: "100%", // Prevent the video from expanding beyond the container
            }} // Stretch video to fill container
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default VideoHistoryCard;
