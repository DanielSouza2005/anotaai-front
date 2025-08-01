import {
    Box,
    Container,
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
import LoginModernCard from './LoginModernCard.jsx';

const LoginForm = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
                minHeight: '100dvh',
                maxHeight: '100dvh', 
                background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 25%, #e1f5fe 50%, #f3e5f5 75%, #fff3e0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3, 
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '80px',
                    height: '80px',
                    background: 'radial-gradient(circle, rgba(33, 150, 243, 0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                    animation: 'float 6s ease-in-out infinite',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '20%',
                    right: '15%',
                    width: '120px',
                    height: '120px',
                    background: 'radial-gradient(circle, rgba(156, 39, 176, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    animation: 'float 8s ease-in-out infinite reverse',
                },
                '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' }
                }
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: isMobile ? 2 : 3,
                }}
            >
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
            </Container>

            <HealthButton />
        </Box>
    );
};

export default LoginForm;