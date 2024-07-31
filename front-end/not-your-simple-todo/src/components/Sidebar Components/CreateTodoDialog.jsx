import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

const CreateTodoDialog = ({ open, onClose, onCreate, newTodoTitle, setNewTodoTitle, newTodoDescription, setNewTodoDescription }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Todo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Todo Title"
          fullWidth
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTodoDialog;
