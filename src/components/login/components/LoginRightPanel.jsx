import { Box, Typography } from "@mui/material";
import LoginFormFields from "./LoginFormFields";

const LoginRightPanel = ({
    isMobile,
    isTablet,
    email,
    pass,
    loading,
    showPassword,
    setEmail,
    setPass,
    handleLogin,
    handleTogglePasswordVisibility,
    theme,
}) => {
    return (
        <Box
            sx={{
                width: isTablet ? '100%' : '50%',
                p: isMobile ? 3 : 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Typography
                component="h1"
                variant={isMobile ? "h5" : "h4"}
                sx={{
                    mb: isMobile ? 3 : 4,
                    fontWeight: 600,
                    color: 'text.primary',
                    textAlign: "center"
                }}
            >
                Acesse sua conta
            </Typography>

            <LoginFormFields
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
    );
}

export default LoginRightPanel;