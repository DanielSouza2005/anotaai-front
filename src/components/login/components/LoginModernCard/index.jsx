import { Box, Divider, Paper, Typography, useTheme } from '@mui/material';
import LoginFormFooter from '../LoginFormFooter';
import LoginModernFields from '../LoginModernFields';
import LoginSocialButtons from '../LoginSocialButtons';
import { LOGIN_MODERN_CARD_CONFIG, getLoginModernCardStyles } from './styles/LoginModernCardStyles';

const LoginModernCard = ({
    email,
    pass,
    loading,
    showPassword,
    setEmail,
    setPass,
    handleLogin,
    handleTogglePasswordVisibility,
    isMobile,
    logoImage
}) => {
    const theme = useTheme();
    const styles = getLoginModernCardStyles(theme, isMobile, logoImage);

    return (
        <Paper elevation={0} sx={styles.card}>
            <Box sx={styles.header}>
                <Box sx={styles.logo} />
                <Typography variant={isMobile ? "h6" : "h5"} sx={styles.title}>
                    {LOGIN_MODERN_CARD_CONFIG.title}
                </Typography>
                <Typography variant="body2" sx={styles.subtitle}>
                    {LOGIN_MODERN_CARD_CONFIG.subtitle}
                </Typography>
            </Box>

            <Box sx={styles.fieldsWrapper}>
                <LoginModernFields
                    email={email}
                    pass={pass}
                    loading={loading}
                    showPassword={showPassword}
                    setEmail={setEmail}
                    setPass={setPass}
                    handleLogin={handleLogin}
                    handleTogglePasswordVisibility={handleTogglePasswordVisibility}
                    isMobile={isMobile}
                    theme={theme}
                />
            </Box>

            <Box sx={styles.dividerWrapper}>
                <Divider>
                    <Typography variant="caption" sx={styles.dividerText}>
                        {LOGIN_MODERN_CARD_CONFIG.dividerText}
                    </Typography>
                </Divider>
            </Box>

            <Box sx={styles.socialWrapper}>
                <LoginSocialButtons isMobile={isMobile} />
            </Box>

            <Box sx={styles.footer}>
                <LoginFormFooter />
            </Box>
        </Paper>
    );
};

export default LoginModernCard;
