import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import defaultTheme from "./style/defaultTheme";

const container = document.getElementById("root");
const root = createRoot(container); // Use createRoot instead of ReactDOM.render

root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
