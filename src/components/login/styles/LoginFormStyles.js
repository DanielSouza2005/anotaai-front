import backgroundImage from "../../../assets/login/fundo.png";

export const LOGIN_FORM_CONFIG = {
    redirectAfterLogin: '/dashboard/contatos',
    errors: {
        emptyFields: 'Por favor, preencha todos os campos.',
        invalidEmail: 'Por favor, insira um e-mail válido.',
        loginFailed: 'Login inválido'
    },
    maxCardWidth: 450
};

export const getLoginFormStyles = (isMobile) => ({
    root: {
        minHeight: '100dvh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 25%, #e1f5fe 50%, #f3e5f5 75%, #fff3e0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: isMobile ? '16px' : '24px',
        boxSizing: 'border-box',
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
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 !important',
        width: '100%',
        maxHeight: '100dvh',
    },
    cardWrapper: {
        width: '100%',
        maxWidth: `${LOGIN_FORM_CONFIG.maxCardWidth}px`,
        maxHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
    }
});
