export const LOGIN_SOCIAL_BUTTONS_CONFIG = {
    tooltipPrefix: "Entrar com",
    buttonSize: { mobile: 44, desktop: 48 },
    iconSize: { mobile: 20, desktop: 24 },
    gap: 2,
    marginBottom: 2,
    borderRadius: '12px',
    hoverShadowOpacity: '40' 
};

export const getLoginSocialButtonsStyles = (theme, isMobile) => {
    const btnSize = isMobile
        ? LOGIN_SOCIAL_BUTTONS_CONFIG.buttonSize.mobile
        : LOGIN_SOCIAL_BUTTONS_CONFIG.buttonSize.desktop;

    const iconSize = isMobile
        ? LOGIN_SOCIAL_BUTTONS_CONFIG.iconSize.mobile
        : LOGIN_SOCIAL_BUTTONS_CONFIG.iconSize.desktop;

    return {
        container: {
            display: 'flex',
            justifyContent: 'center',
            gap: LOGIN_SOCIAL_BUTTONS_CONFIG.gap,
            mb: LOGIN_SOCIAL_BUTTONS_CONFIG.marginBottom
        },
        button: (color) => ({
            width: btnSize,
            height: btnSize,
            border: '1px solid',
            borderColor: theme.palette.divider,
            borderRadius: LOGIN_SOCIAL_BUTTONS_CONFIG.borderRadius,
            backgroundColor: theme.palette.background.paper,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
                color: theme.palette.common.white,
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 16px ${color}${LOGIN_SOCIAL_BUTTONS_CONFIG.hoverShadowOpacity}`
            }
        }),
        iconImg: {
            width: iconSize,
            height: iconSize,
            transition: 'filter 0.2s ease-in-out',
            filter: 'grayscale(0%)'
        }
    };
};


