import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProfileProvider } from "./contexts/UserContext";

const container = document.getElementById("root");
const root = createRoot(container); // Use createRoot instead of ReactDOM.render

root.render(
  <ThemeProvider>
    <UserProfileProvider>
      <App />
    </UserProfileProvider>
  </ThemeProvider>
);
