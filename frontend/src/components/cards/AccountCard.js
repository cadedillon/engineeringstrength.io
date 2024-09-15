//import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Button, Heading, Card } from "@chakra-ui/react";

//const userName = useContext

const AccountCard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens (if applicable)
    localStorage.removeItem("authToken"); // Example of clearing token

    // Redirect to landing page
    navigate("/");
  };

  return (
    <Card p={5} mb={6} bg="white">
      <Flex justify="space-between" align="center">
        <Heading size="lg">Welcome, [Username]</Heading>
        <Button onClick={handleLogout} colorScheme="red">
          Log Out
        </Button>
      </Flex>
    </Card>
  );
};

export default AccountCard;
