import { Box, Typography } from '@mui/material';
import Lottie from 'lottie-react';

const LoadingScreen = ({ animationData, message = 'Carregando...', width = 200 }) => {
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
            <Box sx={{ width, mb: 2 }}>
                <Lottie
                    animationData={animationData}
                    loop
                    autoplay
                    style={{ width, height: width }}
                />
            </Box>
            <Typography variant="h6" color="text.secondary">
                {message}
            </Typography>
        </Box>
    );
};

export default LoadingScreen;
