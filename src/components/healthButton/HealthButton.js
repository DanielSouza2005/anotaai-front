import SyncIcon from '@mui/icons-material/Sync';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHealthCheck } from '../../hooks/useHealthCheck';

const HealthButton = () => {
    const { status, loading, error, checkHealth } = useHealthCheck();
    const [lastCheck, setLastCheck] = useState(0);

    useEffect(() => {
        if (lastCheck === 0) return;

        if (status === 'ok') {
            toast.success('API operante!');
        } else if (error) {
            toast.error(`Erro ao verificar API: ${error}`);
        }
    }, [lastCheck, status, error]);

    const handleCheck = () => {
        checkHealth();
        setLastCheck(Date.now()); 
    };

    return (
        <Tooltip title="Clique para verificar conexão com a API">
            <Button
                onClick={handleCheck}
                variant="contained"
                color="secondary"
                size="small"
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SyncIcon />}
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    zIndex: 10,
                    textTransform: 'none',
                    borderRadius: 2,
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    boxShadow: 3
                }}
            >
                Verificar conexão
            </Button>
        </Tooltip>
    );
};

export default HealthButton;
