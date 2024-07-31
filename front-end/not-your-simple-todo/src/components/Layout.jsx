// src/components/Layout.jsx
import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthService from "../services/AuthService";

const Layout = ({ children, colorMode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await AuthService.isAuth();
        setIsAuthenticated(result);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Navbar colorMode={colorMode} />
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          marginTop: (theme) => theme.spacing(8), // Adjust based on your Navbar height
          p: 2,
        }}
      >
        {isAuthenticated && <Sidebar />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            margin: "16px", // Added margin for floating effect
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for floating effect
            borderRadius: "16px", // Curved borders
          }}
        >
          <Container>{children}</Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
