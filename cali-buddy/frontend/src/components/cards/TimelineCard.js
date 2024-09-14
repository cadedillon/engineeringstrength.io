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

const TimelineCard = () => {
  return (
    <Card p={5} mb={6} bg="white">
      <Heading size="md" mb={4}>
        Progress Over Time
      </Heading>
      {/* <Line
      data={{
        labels: ["Day 1", "Day 2", "Day 3", "Day 4"],
        datasets: [
          {
            label: "Hold Time",
            data: [30, 45, 50, 60], // Example data
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      }}
      options={{
        responsive: true,
        scales: {
          x: { title: { display: true, text: "Day" } },
          y: { title: { display: true, text: "Time (seconds)" } },
        },
      }}
    /> */}
    </Card>
  );
};

export default TimelineCard;
