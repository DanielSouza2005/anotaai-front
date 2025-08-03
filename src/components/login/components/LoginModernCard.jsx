import {
    Box,
    Divider,
    Paper,
    Typography
} from '@mui/material';
import LoginFormFooter from './LoginFormFooter';
import LoginModernFields from './LoginModernFields';
import LoginSocialButtons from './LoginSocialButtons';

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
    theme,
    logoImage
}) => {
    return (
        <Paper
            elevation={0}
            sx={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                p: isMobile ? 3 : 4,
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                animation: 'slideUp 0.6s ease-out',
                width: '100%',
                maxWidth: '500px',
                minHeight: 'auto',
                '@keyframes slideUp': {
                    from: { opacity: 0, transform: 'translateY(30px)' },
                    to: { opacity: 1, transform: 'translateY(0)' }
                }
            }}
        >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 1.5,
                        borderRadius: '50%',
                        backgroundImage: `url(${logoImage})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                    }}
                />

                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        mb: 0.5,
                        background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}
                >
                    Acesse sua conta
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.8rem'
                    }}
                >
                    Entre para continuar no Anota Aí
                </Typography>
            </Box>

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

            <Box sx={{ my: 2 }}>
                <Divider>
                    <Typography variant="caption" sx={{ color: 'text.secondary', px: 2, fontSize: '0.75rem' }}>
                        Ou entre com
                    </Typography>
                </Divider>
            </Box>

            <LoginSocialButtons isMobile={isMobile} />

            <Box sx={{ mt: 2 }}>
                <LoginFormFooter />
            </Box>
        </Paper>
    );
};

export default LoginModernCard;