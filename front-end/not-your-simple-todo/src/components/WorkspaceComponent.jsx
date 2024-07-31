import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
  Divider,
  Box,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import { useSnackbar } from "../context/SnacknarContext";
import WorkspaceService from "../services/WorkspaceService";

const WorkspacePage = () => {
  const theme = useTheme();
  const { setSnackbar } = useSnackbar();
  const [workspaces, setWorkspaces] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editWorkspace, setEditWorkspace] = useState(null);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newWorkspaceType, setNewWorkspaceType] = useState("personal");

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const result = await WorkspaceService.getWorkspacesOfUser();
        setWorkspaces(result);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
        setSnackbar({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    };
    fetchWorkspaces();
  }, [setSnackbar]);

  const handleOpenDialog = (workspace = null) => {
    setEditWorkspace(workspace);
    if (workspace) {
      setNewWorkspaceName(workspace.name);
      setNewWorkspaceType(workspace.type);
    } else {
      setNewWorkspaceName("");
      setNewWorkspaceType("personal");
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditWorkspace(null);
  };

  const handleSave = async () => {
    try {
      if (editWorkspace) {
        await WorkspaceService.updateWorkspace({
          id: editWorkspace.id,
          name: newWorkspaceName,
          type: newWorkspaceType,
        });
      } else {
        await WorkspaceService.createWorkspace({
          name: newWorkspaceName,
          type: newWorkspaceType,
        });
      }
      handleCloseDialog();
      const result = await WorkspaceService.getWorkspacesOfUser();
      setWorkspaces(result);
    } catch (error) {
      console.error("Error saving workspace:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await WorkspaceService.deleteWorkspace(id);
      const result = await WorkspaceService.getWorkspacesOfUser();
      setWorkspaces(result);
    } catch (error) {
      console.error("Error deleting workspace:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Workspaces
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}
      >
        Add Workspace
      </Button>
      <Divider sx={{ mb: 3 }} />
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: theme.palette.primary.dark,
              color: theme.palette.primary.contrastText,
            }}
          >
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "inherit" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "inherit" }}>Type</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "inherit" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workspaces.map((workspace) => (
              <TableRow key={workspace.id}>
                <TableCell>{workspace.name}</TableCell>
                <TableCell>
                  {workspace.type === 'organizational' ? (
                    <Typography variant="body2" color="textSecondary">
                      <BusinessIcon sx={{ mr: 1 }} /> Organizational
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      <WorkspacesIcon sx={{ mr: 1 }} /> Personal
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(workspace)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(workspace.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editWorkspace ? "Edit Workspace" : "Create Workspace"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            value={newWorkspaceName}
            onChange={(e) => setNewWorkspaceName(e.target.value)}
          />
          <FormControl fullWidth variant="standard" sx={{ mt: 2 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={newWorkspaceType}
              onChange={(e) => setNewWorkspaceType(e.target.value)}
            >
              <MenuItem value="personal">
                <WorkspacesIcon sx={{ mr: 1 }} /> Personal
              </MenuItem>
              <MenuItem value="organizational">
                <BusinessIcon sx={{ mr: 1 }} /> Organizational
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave}>{editWorkspace ? "Save" : "Create"}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WorkspacePage;
