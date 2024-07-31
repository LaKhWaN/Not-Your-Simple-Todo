import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import BusinessIcon from "@mui/icons-material/Business";

const CreateWorkspaceDialog = ({ open, onClose, onCreate, newWorkspaceName, setNewWorkspaceName, newWorkspaceType, setNewWorkspaceType }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Workspace</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Workspace Name"
          fullWidth
          value={newWorkspaceName}
          onChange={(e) => setNewWorkspaceName(e.target.value)}
        />
        <FormControl fullWidth variant="standard" sx={{ mt: 2 }}>
            <InputLabel>Workspace Type</InputLabel>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateWorkspaceDialog;
