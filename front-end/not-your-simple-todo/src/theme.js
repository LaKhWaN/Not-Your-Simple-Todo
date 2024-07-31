// src/theme.js
import { createTheme } from "@mui/material/styles";

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              main: "#1976d2",
            },
            background: {
              default: "#ffffff",
              paper: "#f5f5f5",
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: "#90caf9",
            },
            background: {
              default: "#121212",
              paper: "#424242",
            },
          }),
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backdropFilter: "blur(10px)",
            backgroundColor:
              mode === "light" ? "rgba(255, 255, 255, 0.7)" : "rgba(66, 66, 66, 0.7)",
            margin: "16px", // Added margin for spacing between cards
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            margin: "16px", // Added margin for spacing between papers
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            margin: "16px", // Added margin for the AppBar to give floating effect
            borderRadius: 16,
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
  });

export default getTheme;
