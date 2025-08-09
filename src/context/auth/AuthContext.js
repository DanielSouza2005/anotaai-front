import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../../services/api/api';
import { clearToken, getToken } from '../../utils/login/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = getToken();

            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const { data } = await api.get(`/usuario/${decoded.codigo}`);
                    setUser({ nome: data.nome, email: data.email, foto: data.foto });
                } catch (error) {
                    clearToken();
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setUser(null);
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, senha) => {
        try {
            const res = await api.post('/login', { email, senha });
            const token = res.data.token;

            localStorage.setItem('token', token);

            const decoded = jwtDecode(token);
            const userData = { nome: decoded.nome, email: decoded.sub, foto: decoded.foto };
            setUser(userData);
        } catch (error) {
            throw error.response?.data || 'Erro inesperado ao tentar fazer login.';
        }
    };

    const logout = () => {
        setIsLoggingOut(true); 
        setTimeout(() => {
            clearToken();
            setUser(null);
            setIsLoggingOut(false);
        }, 2000);
    };

    const isAuthenticated = () => !!getToken();

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading, isLoggingOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
