import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";

const VideoHistory = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const API_URL =
    process.env.IS_PROD === "true"
      ? "http://engineeringstrength.io:5050"
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
    <Box>
      <Heading size="lg" mb={4}>
        Your Video History
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {videos.map((video, index) => (
          <Box key={index} as="video" controls src={video.url} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default VideoHistory;
