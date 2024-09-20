import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Splash = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Box
      bg={theme.colors.background}
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={8} textAlign="center">
        <Heading size="2xl">Welcome to Engineering Strength</Heading>
        <Text fontSize="xl">
          Your personal calisthenics coach with real-time feedback.
        </Text>
        <VStack spacing={4}>
          <Link to="/register">
            <Button
              background={theme.colors.secondary}
              _hover={{
                color: theme.colors.accent,
              }}
              color="white"
              size="lg"
            >
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button
              background={theme.colors.secondary}
              _hover={{
                color: theme.colors.accent,
              }}
              color="white"
              size="lg"
            >
              Log In
            </Button>
          </Link>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Splash;
