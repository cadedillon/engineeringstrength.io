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
import { useContext, useState } from "react";
import axios from "axios";
import { replace, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserProfileContext } from "../contexts/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { profile, updateProfile } = useContext(UserProfileContext);

  console.log(theme);

  const API_URL =
    process.env.REACT_APP_IS_PROD === "true"
      ? "https://app.engineeringstrength.io"
      : "http://localhost:5050";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      console.log(response.data);

      const { email, token } = response.data;

      if (!token) {
        throw new Error("Token not received");
      }

      const userProfile = {
        username: username,
        email: email,
        avatar: "",
      };

      updateProfile(userProfile);

      await localStorage.setItem("token", token);

      // Set logged-in state to trigger redirect in `useEffect`
      const auth = await isAuthenticated();
      if (auth) {
        navigate("/dashboard", { replace });
      }
    } catch (err) {
      setError("Login failed.");
      console.error("Login error:", err);
    }
  };

  return (
    <Box
      bg={theme.colors.background}
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
        bg={theme.colors.primary}
        onSubmit={handleLogin}
      >
        <Heading size="lg">Log In</Heading>
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
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button
          background={theme.colors.secondary}
          _hover={{
            color: theme.colors.accent,
          }}
          color="white"
          type="submit"
          w="full"
        >
          Log In
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
