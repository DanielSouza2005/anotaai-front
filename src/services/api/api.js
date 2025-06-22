import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_ANOTAAI_API_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  const isAuthRequired = !config.url.endsWith('/login') &&
    !config.url.endsWith('/health') &&
    token;

  if (isAuthRequired) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;

    if (response) {
      const status = response.status;
      const errorCode = response.headers['x-error-code']?.toUpperCase();
      const isAuthError = status === 401 || status === 403;

      const isHandled403 = errorCode === 'USUARIO_LOGADO_EXCLUSAO_BLOQUEADA';

      const isNotOnLoginPage = !window.location.pathname.endsWith('/') &&
        !window.location.pathname.endsWith('/login');

      if (isAuthError && !isHandled403 && isNotOnLoginPage) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;