import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell,
} from 'recharts';
import WorkspaceService from '../services/WorkspaceService';
import TodoService from '../services/TodoService';
import UserService from '../services/UserService';
import { useSnackbar } from '../context/SnacknarContext';

const Dashboard = () => {
  const { setSnackbar } = useSnackbar();
  const [workspaces, setWorkspaces] = useState([]);
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workspaceResult = await WorkspaceService.getWorkspacesOfUser();
        const todoResult = await TodoService.getTodos();
        const userResult = await UserService.getUsers();

        setWorkspaces(workspaceResult);
        setTodos(todoResult);
        setUsers(userResult);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSnackbar({
          open: true,
          message: error.response.data.message,
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setSnackbar]);

  if (loading) {
    return <CircularProgress />;
  }

  const completedTodos = todos.filter(todo => todo.completed).length;
  const incompleteTodos = todos.length - completedTodos;
  const workspaceCount = workspaces.length;
  const userCount = users.length;

  const pieData = [
    { name: 'Completed', value: completedTodos },
    { name: 'Incomplete', value: incompleteTodos },
  ];

  const barData = workspaces.map(ws => ({
    name: ws.name,
    todos: ws.todos.length,
  }));

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <Container sx={{ margin: "16px", padding: "16px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Workspaces</Typography>
              <Typography variant="h4">{workspaceCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Todos</Typography>
              <Typography variant="h4">{todos.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{userCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Todos Status</Typography>
              <PieChart width={400} height={400}>
                <Pie
                  data={pieData}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Todos per Workspace</Typography>
              <BarChart
                width={850}
                height={300}
                data={barData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="todos" fill="#8884d8" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
