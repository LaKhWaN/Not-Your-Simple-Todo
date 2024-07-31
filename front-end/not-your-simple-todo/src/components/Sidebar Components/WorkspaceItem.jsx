import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  List,
} from "@mui/material";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import WorkspaceService from "../services/WorkspaceService";
import TodoService from "../services/TodoService";

const WorkspaceItem = ({
  workspace,
  open,
  onClick,
  setTodoDialogOpen,
  setEditWorkspaceDialogOpen,
  setEditTodoDialogOpen,
  setCurrentWorkspaceId,
  setWorkspaces,
  setSnackbar,
  setEditWorkspace,
  setEditTodo,
}) => {
  const handleDeleteWorkspace = async (workspaceId) => {
    try {
      const response = await WorkspaceService.deleteWorkspace(workspaceId);
      console.log(response);
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

  const handleDeleteTodo = async (todoId) => {
    try {
      const response = await TodoService.deleteTodo(todoId);
      console.log(response);
      const result = await WorkspaceService.getWorkspacesOfUser();
      setWorkspaces(result);
    } catch (error) {
      console.error("Error deleting todo:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
  };

  const handleEditWorkspaceClick = (workspace) => {
    setEditWorkspace(workspace);
    setEditWorkspaceDialogOpen(true);
  };

  const handleEditTodoClick = (todo) => {
    setEditTodo(todo);
    setEditTodoDialogOpen(true);
  };

  const handleOpenTodoDialog = (workspaceId) => {
    setCurrentWorkspaceId(workspaceId);
    setTodoDialogOpen(true);
  };

  return (
    <>
      <ListItem button onClick={onClick}>
        <ListItemIcon>
          <WorkspacesIcon />
        </ListItemIcon>
        <ListItemText primary={workspace.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
        <IconButton
          edge="end"
          onClick={(e) => {
            e.stopPropagation();
            handleEditWorkspaceClick(workspace);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteWorkspace(workspace.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          edge="end"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenTodoDialog(workspace.id);
          }}
        >
          <AddIcon />
        </IconButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {workspace.todos.map((todo) => (
            <ListItem key={todo.id} button>
              <ListItemText primary={todo.title} />
              <IconButton
                edge="end"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditTodoClick(todo);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTodo(todo.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default WorkspaceItem;
