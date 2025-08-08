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
    CircularProgress,
    IconButton,
    InputAdornment,
    Link,
    TextField
} from '@mui/material';

const LoginModernFields = ({
    email,
    pass,
    loading,
    showPassword,
    setEmail,
    setPass,
    handleLogin,
    handleTogglePasswordVisibility,
    isMobile,
    theme
}) => {
    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ width: '100%' }}
        >
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Email color="primary" />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    mb: 1,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(245, 245, 245, 0.8)',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        },
                        '&.Mui-focused': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`
                        }
                    }
                }}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
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
                value={pass}
                onChange={e => setPass(e.target.value)}
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
                sx={{
                    mb: 1,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(245, 245, 245, 0.8)',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        },
                        '&.Mui-focused': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`
                        }
                    }
                }}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
            />

            <Box sx={{ textAlign: 'right', mb: 2 }}>
                <Link
                    href="#"
                    variant="body2"
                    sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    }}
                >
                    Esqueceu a senha?
                </Link>
            </Box>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                size={isMobile ? "large" : "large"}
                disabled={loading}
                startIcon={loading ? null : <LoginIcon />}
                sx={{
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
                    boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 32px rgba(25, 118, 210, 0.4)'
                    },
                    '&:active': {
                        transform: 'translateY(0)'
                    },
                    '&.Mui-disabled': {
                        background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
                        color: 'white',
                        opacity: 0.8
                    }
                }}
            >
                {loading ?
                    (
                        <CircularProgress size={24} color="inherit" />
                    ) :
                    (
                        'Entrar'
                    )}
            </Button>
        </Box>
    );
};

export default LoginModernFields;