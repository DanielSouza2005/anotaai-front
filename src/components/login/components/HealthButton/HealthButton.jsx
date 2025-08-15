import SyncIcon from '@mui/icons-material/Sync';
import { Button, CircularProgress, Tooltip, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHealthCheck } from './hooks/useHealthCheck';
import { getHealthButtonStyles, HEALTH_BUTTON_CONFIG } from './styles/HealthButtonStyles';

const HealthButton = () => {
    const theme = useTheme();
    const styles = getHealthButtonStyles(theme);

    const { status, loading, error, checkHealth } = useHealthCheck();
    const [lastCheck, setLastCheck] = useState(0);

    useEffect(() => {
        if (lastCheck === 0) return;

        if (status === 'ok') {
            toast.success(HEALTH_BUTTON_CONFIG.successMessage);
        } else if (error) {
            toast.error(`${HEALTH_BUTTON_CONFIG.errorPrefix} ${error}`);
        }
    }, [lastCheck, status, error]);

    const handleCheck = () => {
        checkHealth();
        setLastCheck(Date.now());
    };

    return (
        <Tooltip title={HEALTH_BUTTON_CONFIG.tooltip}>
            <Button
                onClick={handleCheck}
                variant="contained"
                color="primary"
                size="small"
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SyncIcon />}
                sx={styles.button}
            >
                {HEALTH_BUTTON_CONFIG.label}
            </Button>
        </Tooltip>
    );
};

export default HealthButton;
