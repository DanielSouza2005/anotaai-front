export const LOADING_SCREEN_CONFIG = {
    defaultWidth: 200,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transitions: {
        fade: 'opacity 0.3s ease'
    }
};

export const getLoadingScreenStyles = (theme, backgroundImage, width = LOADING_SCREEN_CONFIG.defaultWidth) => ({
    container: {
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: theme.palette.background.default,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: LOADING_SCREEN_CONFIG.backgroundSize,
        backgroundPosition: LOADING_SCREEN_CONFIG.backgroundPosition,
        backgroundRepeat: LOADING_SCREEN_CONFIG.backgroundRepeat,
        transition: LOADING_SCREEN_CONFIG.transitions.fade
    },
    animationWrapper: {
        width,
        mb: 2
    },
    message: {
        color: theme.palette.text.secondary
    }
});
