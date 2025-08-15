import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logoImage from "../../assets/login/logo.png";
import { useAuth } from '../../context/auth/AuthContext.js';
import HealthButton from './components/HealthButton/HealthButton.jsx';
import LoginModernCard from './components/LoginModernCard/index.jsx';
import { LOGIN_FORM_CONFIG, getLoginFormStyles } from './styles/LoginFormStyles';

const LoginForm = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const styles = getLoginFormStyles(theme, isMobile);

    const { login } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!email || !pass) {
            toast.error(LOGIN_FORM_CONFIG.errors.emptyFields);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error(LOGIN_FORM_CONFIG.errors.invalidEmail);
            return;
        }

        try {
            setLoading(true);
            await login(email, pass);
            navigate(LOGIN_FORM_CONFIG.redirectAfterLogin);
        }
        catch (err) {
            toast.error(`${LOGIN_FORM_CONFIG.errors.loginFailed}: ${err}`);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={styles.root}>
            <Container maxWidth="sm" sx={styles.container}>
                <Box sx={styles.cardWrapper}>
                    <LoginModernCard
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
                        logoImage={logoImage}
                    />
                </Box>
            </Container>
            <HealthButton />
        </Box>
    );
};

export default LoginForm;
