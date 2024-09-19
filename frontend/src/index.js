import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";

const container = document.getElementById("root");
const root = createRoot(container); // Use createRoot instead of ReactDOM.render

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
