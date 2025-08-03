import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material";

import {
    Email,
    Lock as LockIcon,
    Login as LoginIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import LoginFormFooter from "./LoginFormFooter";

const LoginFormFields = ({
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
            sx={{
                width: '100%',
                animation: 'fadeIn 0.8s ease-in',
            }}
        >
            <TextField
                margin="dense"
                required
                fullWidth
                id="email"
                value={email}
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
                margin="dense"
                required
                fullWidth
                name="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={pass}
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
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                onChange={e => setPass(e.target.value)}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                size={isMobile ? "medium" : "large"}
                sx={{
                    py: isMobile ? 1 : 1.5,
                    borderRadius: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    "&.Mui-disabled": {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        opacity: 1,
                    },
                }}
                startIcon={<LoginIcon />}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
            </Button>

            <LoginFormFooter
                isMobile={isMobile}
            />
        </Box>
    );
}

export default LoginFormFields;