// src/App.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TestPage from "./components/TestPage";
import SnackbarNotification from "./components/SnackbarNotification";
import AuthService from "./services/AuthService";
import { useLoader } from "./context/LoaderContext";
import Loader from "./components/Loader";
import Layout from "./components/Layout";
import WorkspacePage from "./components/WorkspaceComponent";
import TodoPage from "./components/TodoPage";
import Dashboard from "./components/DashboardComponent";
import Settings from "./components/SettingsComponent";
import getTheme from "./theme";

const App = ({ colorMode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { loading } = useLoader();
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await AuthService.isAuth(); // Check authentication status
        setIsAuthenticated(result);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const currentTheme = useMemo(() => createTheme(getTheme(mode)), [mode]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router>
        <Layout colorMode={{ toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")) }}>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route path="/test" element={<TestPage />} />
            <Route
              path="/login"
              element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/workspaces" element={<WorkspacePage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/todos" element={<TodoPage />} />
          </Routes>
        </Layout>
      </Router>
      <SnackbarNotification />
      {loading && <Loader />} {/* Show loader based on state */}
    </ThemeProvider>
  );
};

export default App;
