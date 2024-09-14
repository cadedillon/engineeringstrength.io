import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

// Component imports
import AccountCard from "../components/cards/AccountCard";
import VideoCard from "../components/cards/VideoCard";
import AnalysisCard from "../components/cards/AnalysisCard";
import TimelineCard from "../components/cards/TimelineCard";
import HistoryCard from "../components/cards/HistoryCard";

const Dashboard = () => {
  return (
    <Flex minH="100vh" direction="column" p={5} bg="gray.50">
      <AccountCard />

      {/* Two Side-by-Side Cards for Video Playback and Analysis */}
      <SimpleGrid columns={[1, 2]} spacing={10} mb={6}>
        {/* Video Playback Card */}
        <VideoCard />

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
