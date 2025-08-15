export const LOGIN_MODERN_FIELDS_CONFIG = {
    emailLabel: "E-mail",
    passwordLabel: "Senha",
    forgotPasswordText: "Esqueceu a senha?",
    loginButtonText: "Entrar",
    togglePasswordAria: "toggle password visibility",
    inputBorderRadius: '12px'
};

export const getLoginModernFieldsStyles = (theme, isMobile) => ({
    form: {
        width: '100%'
    },
    textField: {
        mb: 1,
        '& .MuiOutlinedInput-root': {
            borderRadius: LOGIN_MODERN_FIELDS_CONFIG.inputBorderRadius,
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
    },
    forgotWrapper: {
        textAlign: 'right',
        mb: 2
    },
    forgotLink: {
        color: 'primary.main',
        textDecoration: 'none',
        fontWeight: 500,
        fontSize: '0.875rem',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    loginButton: {
        py: 1.5,
        borderRadius: LOGIN_MODERN_FIELDS_CONFIG.inputBorderRadius,
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
    }
});
