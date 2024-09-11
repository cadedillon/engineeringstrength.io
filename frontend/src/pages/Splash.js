import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Splash = () => {
  return (
    <Box
      bg="gray.100"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={8} textAlign="center">
        <Heading size="2xl">Welcome to CaliBuddy</Heading>
        <Text fontSize="xl">
          Your personal calisthenics coach with real-time feedback.
        </Text>
        <VStack spacing={4}>
          <Link to="/register">
            <Button colorScheme="teal" size="lg">
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button colorScheme="gray" size="lg">
              Log In
            </Button>
          </Link>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Splash;
