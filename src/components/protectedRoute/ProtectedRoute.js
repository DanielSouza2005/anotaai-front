import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';
import AuthLoading from '../authLoading/AuthLoading';

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    const [delayed, setDelayed] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setDelayed(false), 2000); 
        return () => clearTimeout(timer);
    }, []);

    if (loading || delayed) {
        return <AuthLoading />;
    }

    return isAuthenticated() ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
