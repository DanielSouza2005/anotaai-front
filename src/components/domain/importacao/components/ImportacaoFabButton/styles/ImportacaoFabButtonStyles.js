export const getImportacaoFabButtonStyles = () => ({
    fabButton: {
        root: {
            position: 'fixed',
            bottom: 24,
            right: 24,
            boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
            '&:hover': {
                boxShadow: '0px 6px 18px rgba(0,0,0,0.3)',
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease',
            },
        },
        animations: {
            fabTimeout: 400,
        },
    },
});
