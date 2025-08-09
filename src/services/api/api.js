import axios from 'axios';
import { getToken, isPublicRoute } from '../../utils/login/auth';
import { applyApiDelay } from './delay';
import { handleApiError } from './error';

const api = axios.create({
  baseURL: process.env.REACT_APP_ANOTAAI_API_URL,
});

api.interceptors.request.use(config => {
  const token = getToken();

  if (token && !isPublicRoute(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  async response => {
    await applyApiDelay();
    return response;
  },
  error => {
    handleApiError(error);
    return Promise.reject(error);
  }
);

export default api;