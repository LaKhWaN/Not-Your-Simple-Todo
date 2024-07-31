import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useSnackbar } from "../../context/SnacknarContext";

const TodoDialog = ({ open, onClose, todo, workspaces, users, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setSnackbar } = useSnackbar();

  // Update state when todo prop changes
  useEffect(() => {
    if (todo) {
      setTitle(todo.title || "");
      setDescription(todo.description || "");
      setWorkspace(todo.workspaceId || "");
      setAssignedUsers(todo.assignedUsers || []);
    } else {
      // Reset state when creating a new todo
      setTitle("");
      setDescription("");
      setWorkspace("");
      setAssignedUsers([]);
    }
  }, [todo]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave({
        id: todo ? todo.id : null,
        title,
        description,
        workspaceId: workspace,
        assignedUsers
      });
      onClose();
    } catch (error) {
      console.error("Error saving todo:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{todo ? "Edit Todo" : "Create Todo"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Workspace</InputLabel>
          <Select
            value={workspace}
            onChange={(e) => setWorkspace(e.target.value)}
            label="Workspace"
          >
            {workspaces.map(ws => (
              <MenuItem key={ws.id} value={ws.id}>
                {ws.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Autocomplete
          multiple
          options={users}
          getOptionLabel={(option) => option.username}
          value={assignedUsers}
          onChange={(event, newValue) => setAssignedUsers(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Assigned Users" variant="standard" />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoDialog;
