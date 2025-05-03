import { Box, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import React from 'react';
import animationData from '../../assets/animations/loading-lock.json';

const AuthLoading = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.default',
            }}
        >
            <Box sx={{ width: 200, mb: 2 }}>
                <Lottie animationData={animationData} loop autoplay style={{ width: 200, height: 200 }} />
            </Box>
            <Typography variant="h6" color="text.secondary">
                Validando sua sessão...
            </Typography>
        </Box>
    );
};

export default AuthLoading;