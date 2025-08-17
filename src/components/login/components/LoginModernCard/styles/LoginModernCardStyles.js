export const LOGIN_MODERN_CARD_CONFIG = {
    title: "Acesse sua conta",
    subtitle: "Entre para continuar no Anota Aí",
    dividerText: "Ou entre com",
    borderRadius: '24px',
    blur: '20px',
    paddingMobile: '20px',
    paddingDesktop: '24px',
    animation: {
        name: 'slideUp',
        duration: '0.6s',
        timing: 'ease-out'
    },
    logoSize: {
        mobile: '40px',
        desktop: '48px'
    },
    titleFontSize: {
        mobile: '1.2rem',
        desktop: '1.4rem'
    },
    subtitleFontSize: {
        mobile: '0.7rem',
        desktop: '0.75rem'
    },
    dividerFontSize: {
        mobile: '0.65rem',
        desktop: '0.7rem'
    }
};

export const getLoginModernCardStyles = (theme, isMobile, logoImage) => ({
    card: {
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: `blur(${LOGIN_MODERN_CARD_CONFIG.blur})`,
        borderRadius: LOGIN_MODERN_CARD_CONFIG.borderRadius,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: isMobile
            ? LOGIN_MODERN_CARD_CONFIG.paddingMobile
            : LOGIN_MODERN_CARD_CONFIG.paddingDesktop,
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        animation: `${LOGIN_MODERN_CARD_CONFIG.animation.name} ${LOGIN_MODERN_CARD_CONFIG.animation.duration} ${LOGIN_MODERN_CARD_CONFIG.animation.timing}`,
        width: '100%',
        boxSizing: 'border-box',
        height: 'auto',
        maxHeight: isMobile ? '95dvh' : '90dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        '@keyframes slideUp': {
            from: { opacity: 0, transform: 'translateY(30px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
        }
    },
    header: {
        textAlign: 'center',
        marginBottom: isMobile ? '8px' : '10px',
        flexShrink: 0
    },
    logo: {
        width: isMobile
            ? LOGIN_MODERN_CARD_CONFIG.logoSize.mobile
            : LOGIN_MODERN_CARD_CONFIG.logoSize.desktop,
        height: isMobile
            ? LOGIN_MODERN_CARD_CONFIG.logoSize.mobile
            : LOGIN_MODERN_CARD_CONFIG.logoSize.desktop,
        margin: '0 auto',
        borderRadius: '50%',
        backgroundImage: `url(${logoImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)'
    },
    title: {
        fontWeight: 700,
        color: 'text.primary',
        background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontSize: isMobile
            ? LOGIN_MODERN_CARD_CONFIG.titleFontSize.mobile
            : LOGIN_MODERN_CARD_CONFIG.titleFontSize.desktop
    },
    subtitle: {
        color: theme.palette.text.secondary,
        fontSize: isMobile
            ? LOGIN_MODERN_CARD_CONFIG.subtitleFontSize.mobile
            : LOGIN_MODERN_CARD_CONFIG.subtitleFontSize.desktop
    },
    fieldsWrapper: {
        marginBottom: isMobile ? '12px' : '16px',
        flexShrink: 0
    },
    dividerWrapper: {
        marginTop: isMobile ? '8px' : '12px',
        marginBottom: isMobile ? '8px' : '12px',
        flexShrink: 0
    },
    dividerText: {
        color: theme.palette.text.secondary,
        paddingX: '12px',
        fontSize: isMobile
            ? LOGIN_MODERN_CARD_CONFIG.dividerFontSize.mobile
            : LOGIN_MODERN_CARD_CONFIG.dividerFontSize.desktop
    },
    socialWrapper: {
        flexShrink: 0
    },
    footer: {
        flexShrink: 0,
        marginTop: 'auto'
    }
});
