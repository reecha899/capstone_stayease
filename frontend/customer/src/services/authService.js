import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';

const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const authService = {
  register,
  login,
  logout,
  isAuthenticated,
};

export default authService; 