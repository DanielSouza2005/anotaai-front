import axios from 'axios';
import authService from '../auth/authService';

const api = axios.create({
  baseURL: process.env.REACT_APP_ANOTAAI_API_URL, 
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 403) {
      authService.logout();

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;