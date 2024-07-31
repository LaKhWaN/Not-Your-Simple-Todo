import React, { useState, useEffect } from "react";
import { Drawer, Box, Divider, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WorkspaceService from "../services/WorkspaceService";
import TodoService from "../services/TodoService";
import { useSnackbar } from "../context/SnacknarContext";
import WorkspaceList from "./Sidebar Components/WorkspaceList";
import CreateWorkspaceDialog from "./Sidebar Components/CreateWorkspaceDialog";
import CreateTodoDialog from "./Sidebar Components/CreateTodoDialog";
import EditWorkspaceDialog from "./Sidebar Components/EditWorkspaceDialog";
import EditTodoDialog from "./Sidebar Components/EditTodoDialog";

const drawerWidth = 350;

const Sidebar = () => {
  const { setSnackbar } = useSnackbar();
  const theme = useTheme();
  const [workspaces, setWorkspaces] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [todoDialogOpen, setTodoDialogOpen] = useState(false);
  const [editWorkspaceDialogOpen, setEditWorkspaceDialogOpen] = useState(false);
  const [editTodoDialogOpen, setEditTodoDialogOpen] = useState(false);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(null);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newWorkspaceType, setNewWorkspaceType] = useState("personal");
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [editWorkspace, setEditWorkspace] = useState(null);
  const [editTodo, setEditTodo] = useState(null);

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

  const handleCreateWorkspace = async () => {
    try {
      await WorkspaceService.createWorkspace({
        name: newWorkspaceName,
        type: newWorkspaceType,
      });
      setNewWorkspaceName("");
      setNewWorkspaceType("personal");
      setDialogOpen(false);
      const result = await WorkspaceService.getWorkspacesOfUser();
      setWorkspaces(result);
    } catch (error) {
      console.error("Error creating workspace:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
  };

  const handleCreateTodo = async () => {
    try {
      const response = await TodoService.createTodo(currentWorkspaceId, {
        title: newTodoTitle,
        description: newTodoDescription,
      });
      setNewTodoTitle("");
      setNewTodoDescription("");
      setTodoDialogOpen(false);
      await WorkspaceService.addTodo(currentWorkspaceId, response.id);
      const result = await WorkspaceService.getWorkspacesOfUser();
      setWorkspaces(result);
    } catch (error) {
      console.error("ERROR creating todo:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    try {
      await WorkspaceService.deleteWorkspace(workspaceId);
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
      await TodoService.deleteTodo(todoId);
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

  const handleEditWorkspace = async () => {
    try {
      await WorkspaceService.updateWorkspace({
        id: editWorkspace.id,
        name: editWorkspace.name,
        type: editWorkspace.type,
      });
      setEditWorkspaceDialogOpen(false);
      setEditWorkspace(null);
      const result = await WorkspaceService.getWorkspacesOfUser();
      setWorkspaces(result);
    } catch (error) {
      console.error("Error updating workspace:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
  };

  const handleEditTodo = async () => {
    try {
      await TodoService.updateTodo({
        id: editTodo.id,
        title: editTodo.title,
        description: editTodo.description,
        completed: editTodo.completed,
        assignedUsers: editTodo.assignedUsers,
      });
      setEditTodoDialogOpen(false);
      setEditTodo(null);
      const result = await WorkspaceService.getWorkspacesOfUser();
      setWorkspaces(result);
    } catch (error) {
      console.error("Error updating todo:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: theme.spacing(8),
          height: `calc(100% - ${theme.spacing(8)})`,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ padding: 2 }}>
        <Button
          onClick={() => setDialogOpen(true)}
          variant="contained"
          sx={{ mb: 2 }}
        >
          Create Workspace
        </Button>
        <Divider />
        <WorkspaceList
          workspaces={workspaces}
          onDeleteWorkspace={handleDeleteWorkspace}
          onEditWorkspace={(workspace) => {
            setEditWorkspace(workspace);
            setEditWorkspaceDialogOpen(true);
          }}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={(todo) => {
            setEditTodo(todo);
            setEditTodoDialogOpen(true);
          }}
          onOpenTodoDialog={(workspaceId) => {
            setCurrentWorkspaceId(workspaceId);
            setTodoDialogOpen(true);
          }}
        />
        <CreateWorkspaceDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onCreate={handleCreateWorkspace}
          newWorkspaceName={newWorkspaceName}
          setNewWorkspaceName={setNewWorkspaceName}
          newWorkspaceType={newWorkspaceType}
          setNewWorkspaceType={setNewWorkspaceType}
        />
        <CreateTodoDialog
          open={todoDialogOpen}
          onClose={() => setTodoDialogOpen(false)}
          onCreate={handleCreateTodo}
          newTodoTitle={newTodoTitle}
          setNewTodoTitle={setNewTodoTitle}
          newTodoDescription={newTodoDescription}
          setNewTodoDescription={setNewTodoDescription}
        />
        <EditWorkspaceDialog
          open={editWorkspaceDialogOpen}
          onClose={() => setEditWorkspaceDialogOpen(false)}
          onSave={handleEditWorkspace}
          workspace={editWorkspace}
          setWorkspace={setEditWorkspace}
        />
        <EditTodoDialog
          open={editTodoDialogOpen}
          onClose={() => setEditTodoDialogOpen(false)}
          onSave={handleEditTodo}
          todo={editTodo}
          setTodo={setEditTodo}
        />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
