import axiosInstance from './axiosInstance';

const WorkspaceService = {
  getWorkspacesOfUser: async () => {
    const response = await axiosInstance.get('workspace/user/');
    return response.data;
  },

  getWorkspace: async (id) => {
    const response = await axiosInstance.get(`workspace/${id}`);
    return response.data;
  },

  createWorkspace: async (workspace) => {
    const response = await axiosInstance.post('workspace/', workspace);
    return response.data;
  },

  updateWorkspace: async (workspace) => {
    const response = await axiosInstance.put(`workspace/`, workspace);
    return response.data;
  },

  deleteWorkspace: async (id) => {
    const response = await axiosInstance.delete(`workspace/${id}`);
    return response.data;
  },

  // /{workspace-id}/add-todo/{id}
  addTodo: async (workspaceId, todoId) => {
    const response = await axiosInstance.put(`workspace/${workspaceId}/add-todo/${todoId}`);
    return response.data;
  },
  addUserToWorkspace: async(workspaceId, userIds) => {
    const response = await axiosInstance.put(`workspace/user/${workspaceId}`, userIds);
    return response.data;
  }
};

export default WorkspaceService;
