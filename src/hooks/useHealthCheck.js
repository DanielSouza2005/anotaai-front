import { useState } from 'react';
import api from '../services/api/api';

export const useHealthCheck = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const checkHealth = async () => {
        setLoading(true);
        setError(null);
        setStatus(null);

        try {
            const response = await api.get('/health');
            setStatus(response.data.status);
        } catch (err) {
            setError(err.message || 'Erro ao verificar status');
        } finally {
            setLoading(false);
        }
    };

    return { status, loading, error, checkHealth };
};
