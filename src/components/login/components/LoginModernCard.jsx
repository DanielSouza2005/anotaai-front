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
                padding: isMobile ? '20px' : '24px', 
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                animation: 'slideUp 0.6s ease-out',
                width: '100%',
                boxSizing: 'border-box',
                height: 'auto',
                maxHeight: isMobile ? '95dvh' : '90dvh', 
                overflow: 'hidden', 
                display: 'flex',
                flexDirection: 'column',
                '@keyframes slideUp': {
                    from: { opacity: 0, transform: 'translateY(30px)' },
                    to: { opacity: 1, transform: 'translateY(0)' }
                }
            }}
        >
            <Box sx={{
                textAlign: 'center',
                marginBottom: isMobile ? '8px' : '10px',
                flexShrink: 0
            }}>
                <Box
                    sx={{
                        width: isMobile ? '40px' : '48px', 
                        height: isMobile ? '40px' : '48px',
                        margin: '0 auto',
                        borderRadius: '50%',
                        backgroundImage: `url(${logoImage})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                    }}
                />

                <Typography
                    variant={isMobile ? "h6" : "h5"}
                    sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontSize: isMobile ? '1rem' : '1.2rem',
                    }}
                >
                    Acesse sua conta
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: isMobile ? '0.7rem' : '0.75rem'
                    }}
                >
                    Entre para continuar no Anota Aí
                </Typography>
            </Box>

            <Box sx={{
                marginBottom: isMobile ? '12px' : '16px',
                flexShrink: 0
            }}>
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

            <Box sx={{
                marginTop: isMobile ? '8px' : '12px',
                marginBottom: isMobile ? '8px' : '12px',
                flexShrink: 0
            }}>
                <Divider>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            paddingX: '12px',
                            fontSize: isMobile ? '0.65rem' : '0.7rem'
                        }}
                    >
                        Ou entre com
                    </Typography>
                </Divider>
            </Box>

            <Box sx={{
                flexShrink: 0
            }}>
                <LoginSocialButtons isMobile={isMobile} />
            </Box>

            <Box sx={{
                flexShrink: 0,
                marginTop: 'auto'
            }}>
                <LoginFormFooter />
            </Box>
        </Paper>
    );
};

export default LoginModernCard;