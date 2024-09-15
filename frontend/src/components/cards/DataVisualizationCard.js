import { Heading, Card, Text } from "@chakra-ui/react";

const DataVisualizationCard = () => {
  return (
    <Card
      width="48vw" // 40% of the viewport width
      height="80vh" // 60% of the viewport height
      borderRadius="md"
      shadow="md"
      p={4}
    >
      <Heading size="md" mb={4}>
        Analysis Charts
      </Heading>
      {/* Placeholder for real-time metrics and analysis charts */}
      <Text>Joint Angle: [Data]</Text>
      <Text>Hold Time: [Data]</Text>
    </Card>
  );
};

export default DataVisualizationCard;
