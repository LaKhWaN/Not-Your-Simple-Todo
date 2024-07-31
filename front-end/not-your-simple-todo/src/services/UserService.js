import axiosInstance from "./axiosInstance";

const UserService = {
  // Fetch all users
  getUsers: async () => {
    try {
      const response = await axiosInstance.get("users/");
      return response.data;
    } catch (error) {
      throw error; // You can handle this error in the component or globally
    }
  },

  // Fetch a specific user by ID
  getUserById: async (id) => {
    try {
      const response = await axiosInstance.get(`users/${id}`);
      return response.data;
    } catch (error) {
      throw error; // Handle the error appropriately
    }
  },

  // Create a new user
  createUser: async (userData) => {
    try {
      const response = await axiosInstance.post("users", userData);
      return response.data;
    } catch (error) {
      throw error; // Handle the error appropriately
    }
  },

  // Update an existing user
  updateUser: async (userData) => {
    try {
      const response = await axiosInstance.put(`users/`, userData);
      return response.data;
    } catch (error) {
      throw error; // Handle the error appropriately
    }
  },

  // Delete a user by ID
  deleteUser: async (id) => {
    try {
      await axiosInstance.delete(`users/${id}`);
    } catch (error) {
      throw error; // Handle the error appropriately
    }
  },
  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get("users/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default UserService;
