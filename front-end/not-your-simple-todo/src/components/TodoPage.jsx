import React, { useState, useEffect } from "react";
import { Container, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WorkspaceService from "../services/WorkspaceService";
import UserService from "../services/UserService";
import TodoService from "../services/TodoService";
import { useSnackbar } from "../context/SnacknarContext";
import TodoTable from "./Todo Page Components/TodoTable";
import TodoDialog from "./Todo Page Components/TodoDialog";

const TodoPage = () => {
  const { setSnackbar } = useSnackbar();
  const [workspaces, setWorkspaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
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

    const fetchUsers = async () => {
      try {
        const result = await UserService.getUsers();
        setUsers(result);
      } catch (error) {
        console.error("Error fetching users:", error);
        setSnackbar({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    };

    fetchWorkspaces();
    fetchUsers();
  }, [setSnackbar]);

  const handleOpenDialog = (todo = null) => {
    setEditTodo(todo);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditTodo(null);
  };

  const updateWorkspaces = async () => {
    try {
      const result = await WorkspaceService.getWorkspacesOfUser();
      setWorkspaces(result);
    } catch (error) {
      console.error("Error updating workspaces:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
  };

  const ensureUserInWorkspace = async (workspaceId, userId) => {
    try {
      await WorkspaceService.addUserToWorkspace(workspaceId, [userId]);
    } catch (error) {
      console.error("Error adding user to workspace:", error);
      setSnackbar({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
  };

  const handleSaveTodo = async (todo) => {
    try {
      if (editTodo) {
        await TodoService.updateTodo(todo);
      } else {
        await TodoService.createTodo(todo);
      }

      // Ensure assigned users are in the workspace
      // const assignedUsers = todo.assignedUsers;
      // const workspaceId = todo.workspaceId;
      // console.log(todo,assignedUsers, workspaceId);
      // if (assignedUsers && workspaceId) {
      //   for (const user of assignedUsers) {
      //     await ensureUserInWorkspace(workspaceId, user.id);
      //   }
      // }

      handleCloseDialog();
      updateWorkspaces(); // Update workspaces after saving a todo
    } catch (error) {
      console.error("Error saving todo:", error);
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
        Todos
      </Typography>
      {/* <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        sx={{ mb: 2 }}
      >
        Add Todo
      </Button> */}
      <Typography variant="h6" gutterBottom>
        Todos
      </Typography>
      <TodoTable
        workspaces={workspaces}
        users={users}
        onEditTodo={handleOpenDialog}
        onDeleteTodo={async (id) => {
          try {
            await TodoService.deleteTodo(id);
            updateWorkspaces(); // Update workspaces after deleting a todo
          } catch (error) {
            console.error("Error deleting todo:", error);
            setSnackbar({
              open: true,
              message: error.response.data.message,
              severity: "error",
            });
          }
        }}
        onMarkComplete={async (todo) => {
          try {
            await TodoService.updateTodo({
              ...todo,
              completed: !todo.completed,
            });
            updateWorkspaces(); // Update workspaces after marking a todo complete/incomplete
          } catch (error) {
            console.error("Error updating todo:", error);
            setSnackbar({
              open: true,
              message: error.response.data.message,
              severity: "error",
            });
          }
        }}
      />
      <TodoDialog
        open={openDialog}
        onClose={handleCloseDialog}
        todo={editTodo}
        workspaces={workspaces}
        users={users}
        onSave={handleSaveTodo}
      />
    </Container>
  );
};

export default TodoPage;
