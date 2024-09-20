import {
  Heading,
  Card,
  Spinner,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import VideoHistoryCard from "./VideoHistoryCard";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const HistoryGridCard = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const toast = useToast();

  const API_URL =
    process.env.REACT_APP_IS_PROD === "true"
      ? "https://app.engineeringstrength.io"
      : "http://localhost:5050";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/video/history`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setVideos(data); // Video URLs received from the backend
        } else {
          throw new Error("Failed to fetch videos");
        }
      } catch (error) {
        toast({
          title: "Error fetching videos",
          description: error.message,
          status: "error",
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [toast]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (videos.length === 0) {
    return <Text>No videos found</Text>;
  }

  return (
    <Card p={5} bg={theme.colors.primary}>
      <Heading size="md" mb={4}>
        Video History
      </Heading>
      <SimpleGrid
        columns={[1, 2, 3]} // Adjust the number of columns based on screen size
        spacing={4}
        overflowX="auto"
        whiteSpace="nowrap"
      >
        {videos.map((video) => (
          <VideoHistoryCard
            key={video._id}
            //p={2}
            videoURL={video.url}
          ></VideoHistoryCard>
        ))}
      </SimpleGrid>
    </Card>
  );
};

export default HistoryGridCard;
