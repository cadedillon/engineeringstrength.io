import React, { useState, useEffect, useRef } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useContext } from "react";

// Component imports
import AccountCard from "../components/cards/AccountCard";
import VideoAnalysisCard from "../components/cards/VideoAnalysisCard";
import DataVisualizationCard from "../components/cards/DataVisualizationCard";
import TimelineCard from "../components/cards/TimelineCard";
import HistoryGridCard from "../components/cards/HistoryGridCard";

// PoseNet imports
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import { ThemeContext } from "../contexts/ThemeContext";

const Dashboard = () => {
  const [detector, setDetector] = useState(null); // Changed to null initially
  const [isPoseNetReady, setIsPoseNetReady] = useState(false);
  const { theme } = useContext(ThemeContext);

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
    };
    loadPoseNet();
  }, []);

  return (
    <Flex minH="100vh" direction="column" p={5} bg={theme.colors.background}>
      <AccountCard />

      {/* Two Side-by-Side Cards for Video Playback and Analysis */}
      <Flex justify="space-between" mb={6} width="100%">
        {/* Video Playback Card - 30% width */}
        {isPoseNetReady ? (
          <Box width="30%">
            <VideoAnalysisCard detector={detector} />
          </Box>
        ) : (
          <Box width="30%">Loading PoseNet...</Box> // Loader or placeholder
        )}

        {/* Analysis Charts Card - 65% width */}
        <Box width="70%">
          <DataVisualizationCard />
        </Box>
      </Flex>

      {/* Progress Timeline Card */}
      <TimelineCard />

      {/* Scrollable Video History Card */}
      <HistoryGridCard />

      {/* Outlet for nested routes */}
      <Outlet />
    </Flex>
  );
};

export default Dashboard;
