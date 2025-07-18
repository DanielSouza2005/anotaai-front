import {
    Box,
    Container,
    Paper,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import backgroundImage from "../../assets/login/fundo.png";
import logoImage from "../../assets/login/logo.png";
import { useAuth } from '../../context/auth/AuthContext.js';
import HealthButton from '../healthButton/HealthButton.jsx';
import LoginLeftPanel from './LoginLeftPanel.jsx';
import LoginRightPanel from './LoginRightPanel.jsx';

const LoginForm = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
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
            toast.error('Por favor, preencha todos os campos.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Por favor, insira um e-mail válido.');
            return;
        }

        try {
            setLoading(true);
            await login(email, pass);
            navigate('/dashboard/contatos');
        }
        catch (err) {
            toast.error(`Login inválido: ${err}`);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                bgcolor: theme.palette.background.default,
                overflow: 'hidden',
                margin: 0,
                padding: 0,
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: isMobile ? 2 : 3
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: isTablet ? 'column' : 'row',
                        borderRadius: 2,
                    }}
                >
                    <LoginLeftPanel
                        isTablet={isTablet}
                        isMobile={isMobile}
                        logoImage={logoImage}
                    />

                    <LoginRightPanel
                        isMobile={isMobile}
                        isTablet={isTablet}
                        email={email}
                        pass={pass}
                        loading={loading}
                        showPassword={showPassword}
                        setEmail={setEmail}
                        setPass={setPass}
                        handleLogin={handleLogin}
                        handleTogglePasswordVisibility={handleTogglePasswordVisibility}
                        theme={theme}
                    />
                </Paper>
            </Container>

            <HealthButton />
        </Box>
    )
}

export default LoginForm;