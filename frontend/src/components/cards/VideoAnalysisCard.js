import PoseNetPlayer from "../PoseNetPlayer";
import React, { useState, useRef } from "react";

import {
  Input,
  Card,
  CardBody,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { FiDatabase } from "react-icons/fi";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const VideoAnalysisCard = (detector) => {
  const [videoFile, setVideoFile] = useState(null); // Store the video file for browser playback
  const [videoURL, setVideoURL] = useState(""); // Store the video URL for playback
  const fileInputRef = useRef(null); // Reference to the file input element
  const { theme } = useContext(ThemeContext);
  const toast = useToast();

  const API_URL =
    process.env.REACT_APP_IS_PROD === "true"
      ? "https://app.engineeringstrength.io"
      : "http://localhost:5050";

  // Example Video.js options
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    playbackRates: [0.5, 1, 1.5, 2], // Enable playback speed control with these options
    disablePictureInPicture: true, // Disable Picture-in-Picture mode
    controlBar: {
      fullscreenToggle: false, // Disable Fullscreen mode
    },
    sources: videoFile ? [{ src: videoURL, type: "video/mp4" }] : [],
  };

  // Handle video file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);

    if (file) {
      // Create a URL for the video file to be used in the video player
      const videoURL = URL.createObjectURL(file);
      setVideoURL(videoURL);
    } else {
      setVideoURL("");
    }
  };

  // Save video to cloud (S3) after user confirms
  const handleSaveVideo = async (event) => {
    event.stopPropagation(); // Prevent the card's click event from firing

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

  // Function to trigger the file input click
  const handleCardClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically open file input dialog
    }
  };

  // Handle clearing the video
  const handleClearVideo = (event) => {
    event.stopPropagation(); // Prevent the card's click event from firing
    setVideoFile(null); // Clear the video from the state
    setVideoURL(""); // Clear the video URL
  };

  // Prevent click propagation when interacting with the video player
  const stopClickPropagation = (event) => {
    event.stopPropagation(); // Prevent the card click event from firing
  };

  if (!detector) {
    return <div>Loading...</div>; // Ensure the detector is present before rendering
  }

  return (
    <Card
      onClick={handleCardClick} // Make the whole card clickable for file input
      cursor="pointer" // Change the cursor to indicate the card is clickable
      backgroundColor={theme.colors.primary}
      borderRadius="md"
      boxShadow="md"
      _hover={{ backgroundColor: theme.colors.tertiary }} // Add hover effect
      width="480px"
      height="640px"
      shadow="md"
      position="relative"
    >
      {/* Video Upload Input */}
      <Input
        type="file"
        accept="video/*"
        onChange={(e) => {
          handleFileChange(e);
          setVideoFile(e.target.files[0]); // Update the state when a video is selected
        }}
        ref={fileInputRef}
        display="none" // Hide the input element
      />

      {/* Clear Video Button (only show if a video is present) */}
      {videoFile && (
        <IconButton
          aria-label="Clear video"
          icon={<CloseIcon />}
          size="sm"
          isRound="true"
          position="absolute"
          top="8px"
          right="8px"
          colorScheme="red"
          onClick={handleClearVideo} // Clear the video when clicked
          zIndex={10} // Make sure the button stays on top
        />
      )}

      {/* Conditionally render the Save button when a video is uploaded */}
      {videoFile && (
        <IconButton
          aria-label="Upload to database"
          icon={<FiDatabase />}
          onClick={handleSaveVideo}
          size="sm"
          isRound="true"
          position="absolute"
          top="8px"
          right="50px" // Adjust to position next to the X button
          colorScheme="green"
          zIndex={10}
        >
          Save
        </IconButton>
      )}

      <CardBody
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        p="0"
      >
        {videoFile ? (
          // Directly place the video element without an extra div
          <PoseNetPlayer
            options={videoJsOptions}
            detector={detector}
            onClick={stopClickPropagation}
          />
        ) : (
          <Text>Click to Upload a Video</Text>
        )}
      </CardBody>
    </Card>
  );
};

export default VideoAnalysisCard;
