import {
    Email as EmailIcon,
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
    TextField,
    useTheme
} from '@mui/material';
import { LOGIN_MODERN_FIELDS_CONFIG, getLoginModernFieldsStyles } from './styles/LoginModernFieldsStyles';

const LoginModernFields = ({
    email,
    pass,
    loading,
    showPassword,
    setEmail,
    setPass,
    handleLogin,
    handleTogglePasswordVisibility,
    isMobile
}) => {
    const theme = useTheme();
    const styles = getLoginModernFieldsStyles(theme, isMobile);

    return (
        <Box component="form" onSubmit={handleLogin} sx={styles.form}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={LOGIN_MODERN_FIELDS_CONFIG.emailLabel}
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon color="primary" />
                        </InputAdornment>
                    ),
                }}
                sx={styles.textField}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={LOGIN_MODERN_FIELDS_CONFIG.passwordLabel}
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LockIcon color="primary" />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={LOGIN_MODERN_FIELDS_CONFIG.togglePasswordAria}
                                onClick={handleTogglePasswordVisibility}
                                edge="end"
                                size={isMobile ? "small" : "medium"}
                            >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={styles.textField}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
            />

            <Box sx={styles.forgotWrapper}>
                <Link href="#" variant="body2" sx={styles.forgotLink}>
                    {LOGIN_MODERN_FIELDS_CONFIG.forgotPasswordText}
                </Link>
            </Box>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={loading ? null : <LoginIcon />}
                sx={styles.loginButton}
            >
                {loading ? (
                    <CircularProgress size={24} color="inherit" />
                ) : (
                    LOGIN_MODERN_FIELDS_CONFIG.loginButtonText
                )}
            </Button>
        </Box>
    );
};

export default LoginModernFields;
