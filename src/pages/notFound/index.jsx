import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import backgroundImage from "../../assets/login/fundo.png";
import { getNotFoundPageStyles, NOT_FOUND_PAGE_CONFIG } from './styles/notFoundStyles';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const styles = getNotFoundPageStyles(theme, backgroundImage);
    const primaryBlue = theme.palette.primary.main || NOT_FOUND_PAGE_CONFIG.colors.fallbackPrimary;

    const goBack = () => {
        navigate(-1);
    };

    return (
        <Box sx={styles.backgroundContainer}>
            <Box sx={styles.contentContainer}>
                <Typography
                    variant="h1"
                    sx={{
                        ...styles.errorCode,
                        color: primaryBlue,
                    }}
                >
                    {NOT_FOUND_PAGE_CONFIG.texts.errorCode}
                </Typography>

                <Typography
                    variant="h5"
                    sx={styles.title}
                >
                    {NOT_FOUND_PAGE_CONFIG.texts.title}
                </Typography>

                <Typography
                    variant="body1"
                    sx={styles.description}
                >
                    {NOT_FOUND_PAGE_CONFIG.texts.description}
                </Typography>

                <Button
                    variant="outlined"
                    size="large"
                    onClick={goBack}
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        ...styles.backButton,
                        color: primaryBlue,
                        borderColor: primaryBlue,
                        '&:hover': {
                            ...styles.backButtonHover,
                            borderColor: primaryBlue,
                        },
                    }}
                >
                    {NOT_FOUND_PAGE_CONFIG.texts.backButton}
                </Button>
            </Box>
        </Box>
    );
};

export default NotFoundPage;