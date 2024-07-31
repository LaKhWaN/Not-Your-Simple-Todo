import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Checkbox,
  FormControlLabel,
  Paper,
  List,
  ListItem,
  FormControl,
  InputLabel,
  Select,
  useTheme,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";
import WorkspacesIcon from "@mui/icons-material/Workspaces";

const TodoTable = ({
  workspaces,
  users,
  onEditTodo,
  onDeleteTodo,
  onMarkComplete,
}) => {
  const theme = useTheme();

  // console.log(workspaces[0].todos[0].completed)
  // console.log(workspaces[2].todos[0].assignedUsers[0].username)
  return (
    <TableContainer component={Paper} sx={{ mb: 4 }}>
      <Table>
        <TableHead
          sx={{
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
          }}
        >
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Workspace</TableCell>
            <TableCell>Assigned Users</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workspaces.map((workspace) =>
            workspace.todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>
                  {workspace.type === "organizational" ? (
                    <Typography variant="body2" color="textSecondary">
                      <BusinessIcon sx={{ mr: 1 }} />
                      {workspace.name}
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      <WorkspacesIcon sx={{ mr: 1 }} /> {workspace.name}
                    </Typography>
                  )}
                </TableCell>
                {/* <TableCell>{workspace.name}</TableCell> */}
                <TableCell>
                  {/* do it in if else */}
                  <FormControl fullWidth margin="dense">
                    <InputLabel>Assigned Users</InputLabel>
                    <Select
                      value={todo.assignedUsers[0].username}
                      label="Assigned Users"
                    >
                      {todo.assignedUsers.map((user) => (
                        <ListItem key={user.id}>{user.username}</ListItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* {
                    todo.assignedUsers.length > 0 ? todo.assignedUsers.map((user) => (
                      <span key={user.id}>{user.username}, </span>
                    )) : 'None'
                  } */}
                  {/* {todo.assignedUsers.length > 0 ? todo.assignedUsers..join(', ') : 'None'} */}
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={todo.completed}
                        onChange={() => onMarkComplete(todo)}
                      />
                    }
                    label={todo.completed ? "Completed" : "Incomplete"}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onEditTodo(todo)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDeleteTodo(todo.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodoTable;
