// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useSnackbar } from "../context/SnacknarContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = ({ colorMode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogOut = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setSnackbar({
      open: true,
      message: "Logout successful!",
      severity: "success",
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ margin: "16px", borderRadius: 16, backdropFilter: "blur(10px)", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
        <Toolbar>
          <Typography
            variant="h5"
            style={{ fontWeight: "bolder" }}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Not Your Simple Todo
          </Typography>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/workspaces">
                Workspace
              </Button>
              <Button color="inherit" component={Link} to="/todos">
                Todo
              </Button>
              <Button color="inherit" component={Link} to="/settings">
                Profile
              </Button>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <Button onClick={handleLogOut} color="inherit">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
