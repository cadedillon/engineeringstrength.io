import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { asparagusTheme, purpleTheme } from "../style/themes";

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(purpleTheme);

  return (
    <ThemeContext.Provider value={{ theme }}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ThemeContext.Provider>
  );
};
