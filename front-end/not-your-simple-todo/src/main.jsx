// src/main.jsx
import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import getTheme from "./theme";
import "./main.css";
import { LoaderProvider } from "./context/LoaderContext";
import { SnackbarProvider } from "./context/SnacknarContext";
import { AuthProvider } from "./context/AuthContext";

const ThemedApp = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const currentTheme = useMemo(() => createTheme(getTheme(mode)), [mode]);

  return (
    <React.StrictMode>
      <AuthProvider>
        <LoaderProvider>
          <SnackbarProvider>
            <ThemeProvider theme={currentTheme}>
              <CssBaseline />
              <App colorMode={colorMode} />
            </ThemeProvider>
          </SnackbarProvider>
        </LoaderProvider>
      </AuthProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<ThemedApp />);
