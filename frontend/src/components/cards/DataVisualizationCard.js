import { Heading, Card, Text } from "@chakra-ui/react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";

const DataVisualizationCard = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Card
      background={theme.colors.primary}
      width="100%" // 40% of the viewport width
      height="640px" // 60% of the viewport height
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
