import axiosInstance from "./axiosInstance";

const AuthService = {
  isAuth: () => {
    return localStorage.getItem("token") ? true : false;
  },
  login: async (username, password) => {
    const response = await axiosInstance.post("auth/login", {
      username: username,
      password: password,
    });
    localStorage.setItem("token", response.data.accessToken);
    return response.data;
  },

  register: async (userData) => {
    const response = await axiosInstance.post("auth/register", userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

export default AuthService;
