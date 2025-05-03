import {
    Email,
    Lock as LockIcon,
    Login as LoginIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import backgroundImage from "../../assets/login/fundo.png";
import logoImage from "../../assets/login/logo.png";
import { useAuth } from '../../context/auth/AuthContext';
import HealthButton from '../healthButton/HealthButton.js';

const LoginForm = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const { login } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

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
            await login(email, pass);
            navigate('/dashboard/contatos');
        }
        catch (err) {
            toast.error('Login Inválido!' + err);
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
                    <Box
                        sx={{
                            bgcolor: 'primary.main',
                            width: isTablet ? '100%' : '50%',
                            minHeight: isTablet ? '200px' : 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: isMobile ? 3 : 4,
                            color: 'white',
                        }}
                    >
                        <Box
                            sx={{
                                width: isMobile ? '70%' : '80%',
                                height: isMobile ? '100px' : '200px',
                                bgcolor: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2,
                                backgroundImage: `url(${logoImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                        </Box>
                    </Box>

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

                        <Box component="form" sx={{ width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: isMobile ? 2 : 3 }}
                                variant="outlined"
                                size={isMobile ? "small" : "medium"}
                                onChange={e => setEmail(e.target.value)}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleTogglePasswordVisibility}
                                                edge="end"
                                                size={isMobile ? "small" : "medium"}
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: isMobile ? 3 : 4 }}
                                size={isMobile ? "small" : "medium"}
                                onChange={e => setPass(e.target.value)}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                onClick={(event) => handleLogin(event)}
                                variant="contained"
                                size={isMobile ? "medium" : "large"}
                                sx={{
                                    py: isMobile ? 1 : 1.5,
                                    borderRadius: 1.5,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    fontSize: isMobile ? '0.9rem' : '1rem'
                                }}
                                startIcon={<LoginIcon />}
                            >
                                Entrar
                            </Button>

                            <Box sx={{ mt: isMobile ? 2 : 3, textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    © {new Date().getFullYear()} Anota Aí. Todos os Direitos Reservados.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Container>

            <HealthButton />
        </Box>
    )
}

export default LoginForm;