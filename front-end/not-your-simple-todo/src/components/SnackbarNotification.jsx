// src/components/SnackbarNotification.jsx
import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSnackbar } from "../context/SnacknarContext"; // Ensure you have SnackbarContext setup

const SnackbarNotification = () => {
  const { snackbar, setSnackbar } = useSnackbar();

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
