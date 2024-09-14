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

const HistoryCard = () => {
  return (
    <Card p={5} bg="white">
      <Heading size="md" mb={4}>
        Video History
      </Heading>
      <SimpleGrid
        columns={[2, 3, 5]} // Adjust the number of columns based on screen size
        spacing={4}
        overflowX="auto"
        whiteSpace="nowrap"
      >
        {/* {videos.map((video) => (
            <Card
              key={video.id}
              p={2}
              onClick={() => navigate(`/dashboard/analysis/${video.id}`)}
            >
              <Box>
                <img src={video.thumbnailUrl} alt={video.name} width="100%" />
              </Box>
              <Text mt={2}>{video.name}</Text>
            </Card>
          ))} */}
      </SimpleGrid>
    </Card>
  );
};

export default HistoryCard;
