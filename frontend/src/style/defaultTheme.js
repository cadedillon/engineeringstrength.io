// theme.js
import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    primary: "#42213D", // For buttons, headers, etc.
    secondary: "#55DDE0", // For links, subheadings, or accents
    accent: "#E1CE7A", // For highlights, call-to-actions
    background: "#617073", // For background colors
    text: "#AF9AB2", // For main text color
  },
};

const defaultTheme = extendTheme({ colors });

export default defaultTheme;
