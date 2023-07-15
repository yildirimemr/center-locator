"use client";

import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ColorModeContext from "./DarkLightThemeContext";
import CssBaseline from "@mui/material/CssBaseline";
import { green, grey } from "@mui/material/colors";

const DarkLightTheme = ({ children }: { children: JSX.Element }) => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: green,
                divider: green[200],
                text: {
                  primary: grey[900],
                  secondary: grey[800],
                },
              }
            : {
                primary: grey,
                divider: grey[700],
                background: {
                  default: "#343a40",
                  paper: "#343a40",
                },
                text: {
                  primary: '#fff',
                  secondary: grey[300],
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DarkLightTheme;
