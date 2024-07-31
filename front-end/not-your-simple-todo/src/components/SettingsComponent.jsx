import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import UserService from "../services/UserService";
import { useSnackbar } from "../context/SnacknarContext";

const Settings = () => {
  const { setSnackbar } = useSnackbar();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await UserService.getCurrentUser();
        setUser(result);
        setUserId(result.id);
        setFirstName(result.first_name);
        setLastName(result.last_name);
        setEmail(result.email);
        setGender(result.gender);
        setUsername(result.username);
      } catch (error) {
        console.error("Error fetching user:", error);
        setSnackbar({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setSnackbar]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await UserService.updateUser({
        id: userId,
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: gender,
        username: username,
        roles: ["USER"],
      });
      setSnackbar({
        open: true,
        message: "Profile updated successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await UserService.deleteUser();
      setSnackbar({
        open: true,
        message: "Account deleted successfully",
        severity: "success",
      });
      // Add logic to redirect user after account deletion
    } catch (error) {
      console.error("Error deleting account:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="First Name"
            fullWidth
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Last Name"
            fullWidth
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Gender"
            fullWidth
            select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="true">Male</MenuItem>
            <MenuItem value="false">Female</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenDeleteDialog(true)}
            disabled={loading}
          >
            Delete Account
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteAccount}
            color="secondary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Settings;
