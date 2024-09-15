import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, replace } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL =
    process.env.REACT_APP_IS_PROD === "true"
      ? "https://app.engineeringstrength.io"
      : "http://localhost:5050";

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      });
      console.log("Registration successful:", response.data);
      const { token } = response.data;

      if (!token) {
        throw new Error("Token not received");
      }

      await localStorage.setItem("token", token);

      // Set logged-in state to trigger redirect in `useEffect`
      const auth = isAuthenticated();
      if (auth) {
        navigate("/dashboard", { replace });
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <Box
      bg="gray.100"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        as="form"
        spacing={4}
        w="full"
        maxW="md"
        p={6}
        boxShadow="lg"
        bg="white"
        onSubmit={handleRegister}
      >
        <Heading size="lg">Sign Up</Heading>
        {error && <Text color="red.500">{error}</Text>}
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button colorScheme="teal" type="submit" w="full">
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;
