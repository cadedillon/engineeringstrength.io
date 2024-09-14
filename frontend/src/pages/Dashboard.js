import React, { useState, useEffect, useRef } from "react";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

// Component imports
import AccountCard from "../components/cards/AccountCard";
import VideoCard from "../components/cards/VideoCard";
import AnalysisCard from "../components/cards/AnalysisCard";
import TimelineCard from "../components/cards/TimelineCard";
import HistoryCard from "../components/cards/HistoryCard";

// PoseNet imports
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";

const Dashboard = () => {
  const [detector, setDetector] = useState(null); // Changed to null initially
  const [isPoseNetReady, setIsPoseNetReady] = useState(false);

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
      setIsPoseNetReady(true); // Mark PoseNet as fully ready
      console.log("Detector has been initialized");
      console.log(detector);
    };
    loadPoseNet();
  }, []);

  return (
    <Flex minH="100vh" direction="column" p={5} bg="gray.50">
      <AccountCard />

      {/* Two Side-by-Side Cards for Video Playback and Analysis */}
      <SimpleGrid columns={[1, 2]} spacing={10} mb={6}>
        {/* Video Playback Card */}
        {/* Conditionally render VideoCard only if PoseNet is ready */}
        {isPoseNetReady ? (
          <VideoCard detector={detector} />
        ) : (
          <div>Loading PoseNet...</div> // You can display a loader or null here
        )}
        {/* Analysis Charts Card */}
        <AnalysisCard />
      </SimpleGrid>

      {/* Progress Timeline Card */}
      <TimelineCard />

      {/* Scrollable Video History Card */}
      <HistoryCard />

      {/* Outlet for nested routes */}
      <Outlet />
    </Flex>
  );
};

export default Dashboard;
