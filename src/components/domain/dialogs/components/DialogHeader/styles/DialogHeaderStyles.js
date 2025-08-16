export const DIALOG_HEADER_CONFIG = {
    texts: {
        closeAriaLabel: 'Fechar'
    },
    colors: {
        iconColor: 'primary'
    },
    dimensions: {
        closeButtonPosition: 8,
        iconSize: 32,
        iconMarginRight: 1
    }
};

export const getDialogHeaderStyles = (theme) => ({
    closeButton: {
        position: 'absolute',
        right: DIALOG_HEADER_CONFIG.dimensions.closeButtonPosition,
        top: DIALOG_HEADER_CONFIG.dimensions.closeButtonPosition
    },
    title: {
        display: 'flex',
        alignItems: 'center'
    },
    mainIcon: {
        fontSize: DIALOG_HEADER_CONFIG.dimensions.iconSize,
        mr: DIALOG_HEADER_CONFIG.dimensions.iconMarginRight
    }
});