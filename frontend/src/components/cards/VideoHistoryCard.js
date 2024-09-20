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
        <video
          width="480"
          height="640"
          controls
          src={videoURL} // Check if the video URL works in a native HTML5 video tag
          style={{ objectFit: "contain" }}
        />
      </CardBody>
    </Card>
  );
};

export default VideoHistoryCard;
