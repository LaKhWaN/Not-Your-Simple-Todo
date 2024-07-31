import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

const EditTodoDialog = ({ open, onClose, onSave, todo, setTodo }) => {
  if (!todo) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Todo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Todo Title"
          fullWidth
          name="title"
          value={todo.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          name="description"
          value={todo.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Assigned Users"
          fullWidth
          name="assignedUsers"
          value={todo.assignedUsers}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTodoDialog;
