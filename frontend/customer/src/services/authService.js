import axios from 'axios';
import config from '../config/env';

const API_URL = `${config.authApiUrl}/auth`;

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