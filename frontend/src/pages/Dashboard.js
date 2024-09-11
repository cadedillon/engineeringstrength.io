import { Box, Flex, VStack, Button, Heading, Spacer } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens (if applicable)
    localStorage.removeItem("authToken"); // Example of clearing token

    // Redirect to landing page
    navigate("/");
  };

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box bg="gray.200" p={5} w="250px" display="flex" flexDirection="column">
        <VStack spacing={4} align="start" flex="1">
          <Heading size="md">Dashboard</Heading>
          <Link to="/dashboard/analysis">
            <Button w="full" colorScheme="teal">
              Video Analysis Tool
            </Button>
          </Link>
          <Link to="/dashboard/history">
            <Button w="full" colorScheme="teal">
              Video History
            </Button>
          </Link>
          <Link to="/dashboard/settings">
            <Button w="full" colorScheme="teal">
              Settings
            </Button>
          </Link>
          {/* Spacer pushes the log out button to the bottom */}
          <Spacer />
          {/* Log Out Button */}
          <Button w="full" colorScheme="red" onClick={handleLogout}>
            Log Out
          </Button>
        </VStack>
      </Box>

      {/* Main Content Area */}
      <Box flex="1" p={5} bg="gray.50">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Dashboard;
