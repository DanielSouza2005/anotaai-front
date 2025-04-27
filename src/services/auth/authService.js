import api from '../api/api';

const login = async (email, senha) => {
    const response = await api.post('/login', { email, senha });
    const token = response.data.token;

    localStorage.setItem('token', token);

    return token;
};

const logout = () => {
    localStorage.removeItem('token');
};

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const authService = { login, logout, isAuthenticated };

export default authService;
