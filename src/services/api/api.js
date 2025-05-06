import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_ANOTAAI_API_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (!config.url.endsWith('/login') &&
    !config.url.endsWith('/health') &&
    token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;