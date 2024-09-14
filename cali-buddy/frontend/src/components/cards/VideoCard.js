import VideoPlayer from "../VideoPlayer";

import {
  Box,
  Flex,
  VStack,
  Button,
  Heading,
  Spacer,
  Card,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
// Register one of the TF.js backends.
import "@tensorflow/tfjs-backend-webgl";

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

const VideoCard = (selectedVideo) => {
  // Example Video.js options
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: selectedVideo
      ? [{ src: selectedVideo.url, type: "video/mp4" }]
      : [],
  };

  return (
    <Card
      width="48vw" // 40% of the viewport width
      height="80vh" // 60% of the viewport height
      borderRadius="md"
      shadow="md"
      p={4}
    >
      <Heading size="md" mb={4}>
        Video Playback
      </Heading>
      {selectedVideo ? (
        <VideoPlayer options={videoJsOptions} />
      ) : (
        <Text>Select a video from the history below to start analysis</Text>
      )}
    </Card>
  );
};

export default VideoCard;
