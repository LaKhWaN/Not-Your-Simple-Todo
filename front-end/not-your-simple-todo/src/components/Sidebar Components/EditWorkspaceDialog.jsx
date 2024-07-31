import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

const EditWorkspaceDialog = ({ open, onClose, onSave, workspace, setWorkspace }) => {
  if (!workspace) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkspace((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Workspace</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Workspace Name"
          fullWidth
          name="name"
          value={workspace.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Workspace Type"
          select
          fullWidth
          name="type"
          value={workspace.type}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
        >
          <option value="personal">Personal</option>
          <option value="team">Team</option>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditWorkspaceDialog;
