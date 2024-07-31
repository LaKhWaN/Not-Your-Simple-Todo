import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
  Divider,
  Typography,
} from "@mui/material";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import BusinessIcon from "@mui/icons-material/Business";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const WorkspaceList = ({
  workspaces,
  onDeleteWorkspace,
  onEditWorkspace,
  onDeleteTodo,
  onEditTodo,
  onOpenTodoDialog,
}) => {
  const [openWorkspaces, setOpenWorkspaces] = useState({});

  const handleWorkspaceClick = (id) => {
    setOpenWorkspaces((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <List>
      {workspaces.map((workspace) => (
        <div key={workspace.id}>
          <ListItem button onClick={() => handleWorkspaceClick(workspace.id)}>
            <ListItemIcon>
              {workspace.type === 'organizational' ? <BusinessIcon /> : <WorkspacesIcon />}
            </ListItemIcon>
            <ListItemText
              primary={workspace.name}
              secondary={workspace.type === 'organizational' ? 'Organizational' : 'Personal'}
            />
            {openWorkspaces[workspace.id] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openWorkspaces[workspace.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {workspace.todos.map((todo) => (
                <ListItem key={todo.id}>
                  <ListItemText primary={todo.title} />
                  <IconButton onClick={() => onEditTodo(todo)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDeleteTodo(todo.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
              <ListItem>
                <IconButton onClick={() => onOpenTodoDialog(workspace.id)}>
                  <AddIcon />
                </IconButton>
              </ListItem>
            </List>
          </Collapse>
          <Divider />
        </div>
      ))}
    </List>
  );
};

export default WorkspaceList;
