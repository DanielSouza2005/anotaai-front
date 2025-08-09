import { Box, Typography, useTheme } from '@mui/material';
import Lottie from 'lottie-react';
import backgroundImage from "../../assets/login/fundo.png";
import { getLoadingScreenStyles } from './styles/LoadingScreenStyles';

const LoadingScreen = ({ animationData, message = 'Carregando...', width = 200 }) => {
    const theme = useTheme();
    const styles = getLoadingScreenStyles(theme, backgroundImage, width);

    return (
        <Box sx={styles.container}>
            <Box sx={styles.animationWrapper}>
                <Lottie
                    animationData={animationData}
                    loop
                    autoplay
                    style={{ width, height: width }}
                />
            </Box>
            <Typography variant="h6" sx={styles.message}>
                {message}
            </Typography>
        </Box>
    );
};

export default LoadingScreen;
