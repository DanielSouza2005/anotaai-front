import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import loginAnimation from '../../assets/animations/Login-Sign-up.json';
import logoutAnimation from '../../assets/animations/Session-Expired.json';
import { useAuth } from '../../context/auth/AuthContext';
import LoadingScreen from '../loadingScreen/LoadingScreen';

const AppSecurity = ({ children }) => {
    const { isAuthenticated, isLoggingOut, loading } = useAuth();
    const location = useLocation();
    const [delayed, setDelayed] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setDelayed(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoggingOut) {
        return (
            <LoadingScreen
                animationData={logoutAnimation}
                message="Encerrando sua sessão..."
                width={200}
            />
        );
    }

    if (loading || delayed) {
        return (
            <LoadingScreen
                animationData={loginAnimation}
                message="Validando sua sessão..."
                width={200}
            />
        );
    }

    const isPublicRoute = location.pathname === '/' || location.pathname === '/login';

    if (!isAuthenticated() && !isPublicRoute) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AppSecurity;
