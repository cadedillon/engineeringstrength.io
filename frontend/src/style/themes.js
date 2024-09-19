import { extendTheme } from "@chakra-ui/react";

// Define the purple theme
const purple = {
  colors: {
    primary: "#BFAEC1", // For buttons, headers, etc. AF9AB2
    secondary: "#42213D", // For links, subheadings, or accents
    tertiary: "#55DDE0",
    accent: "#E1CE7A", // For highlights, call-to-actions
    background: "#FAE6F7", // For background colors
    text: "#000000", // For main text color 55DDE0
  },
};

// Define the asparagus theme
const asparagus = {
  colors: {
    primary: "#001242", // For buttons, headers, etc.
    secondary: "#FF5A5F", // For links, subheadings, or accents
    accent: "#7EA16B", // For highlights, call-to-actions
    background: "#F5F5F5", // For background colors
    text: "#17301C", // For main text color
  },
};

// Define the lilac theme
const lilac = {
  colors: {
    primary: "#42213D", // For buttons, headers, etc.
    secondary: "#55DDE0", // For links, subheadings, or accents
    accent: "#E1CE7A", // For highlights, call-to-actions
    background: "#617073", // For background colors
    text: "#AF9AB2", // For main text color
  },
};

// Use extendTheme to wrap individual themes
const purpleTheme = extendTheme(purple);
const asparagusTheme = extendTheme(asparagus);
const lilacTheme = extendTheme(lilac);

export { purpleTheme, asparagusTheme, lilacTheme };
