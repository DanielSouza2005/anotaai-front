import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../../services/api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({ nome: decoded.nome, email: decoded.sub });
            } catch (e) {
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, senha) => {
        try {
            const res = await api.post('/login', { email, senha });
            const token = res.data.token;

            localStorage.setItem('token', token);

            const decoded = jwtDecode(token);
            const userData = { nome: decoded.nome, email: decoded.sub };
            setUser(userData);
        } catch (error) {
            throw new Error('Login inválido');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser({ nome: "", email: "" });
    };

    const isAuthenticated = () => !!localStorage.getItem('token');

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
