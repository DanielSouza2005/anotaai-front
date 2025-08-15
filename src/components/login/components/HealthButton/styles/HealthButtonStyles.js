export const HEALTH_BUTTON_CONFIG = {
    tooltip: "Clique para verificar conexão com a API",
    label: "Verificar conexão",
    successMessage: "API operante!",
    errorPrefix: "Erro ao verificar API:",
    position: {
        bottom: 16,
        right: 16
    },
    size: 18,
    font: {
        weight: 500,
        size: '0.875rem'
    },
    borderRadius: 2,
    boxShadow: 3
};

export const getHealthButtonStyles = (theme) => ({
    button: {
        position: 'absolute',
        bottom: HEALTH_BUTTON_CONFIG.position.bottom,
        right: HEALTH_BUTTON_CONFIG.position.right,
        zIndex: 10,
        textTransform: 'none',
        borderRadius: HEALTH_BUTTON_CONFIG.borderRadius,
        fontWeight: HEALTH_BUTTON_CONFIG.font.weight,
        fontSize: HEALTH_BUTTON_CONFIG.font.size,
        boxShadow: HEALTH_BUTTON_CONFIG.boxShadow,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }
    }
});
