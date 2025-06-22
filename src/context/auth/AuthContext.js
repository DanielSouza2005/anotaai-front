import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    setUser({ nome: decoded.nome, email: decoded.sub, foto: decoded.foto });
                } catch (error) {
                    localStorage.removeItem('token');
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
        localStorage.removeItem('token');
        setUser(null);
    };

    const isAuthenticated = () => !!localStorage.getItem('token');

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
