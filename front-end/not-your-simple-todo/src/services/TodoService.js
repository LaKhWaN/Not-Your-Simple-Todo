import axiosInstance from './axiosInstance';

const TodoService = {
  getTodos: async () => {
    const response = await axiosInstance.get('todo/user');
    return response.data;
  },

  getTodo: async (id) => {
    const response = await axiosInstance.get(`todo/${id}`);
    return response.data;
  },

  createTodo: async (workspaceId, todo) => {
    const response = await axiosInstance.post(`todo/${workspaceId}`, todo);
    return response.data;
  },

  updateTodo: async (todo) => {
    const response = await axiosInstance.put('todo/', todo);
    return response.data;
  },

  deleteTodo: async (id) => {
    const response = await axiosInstance.delete(`todo/${id}`);
    return response.data;
  },
};

export default TodoService;
