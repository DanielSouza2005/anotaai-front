export const CONFIRM_DIALOG_CONFIG = {
    texts: {
        defaultTitle: 'Confirmar ação',
        defaultMessage: 'Tem certeza que deseja continuar?',
        confirmButton: 'Confirmar',
        cancelButton: 'Cancelar',
        submittingText: 'Aguarde...',
        closeAriaLabel: 'Fechar'
    },
    colors: {
        defaultConfirmColor: 'error'
    },
    dimensions: {
        borderRadius: 3,
        padding: 2,
        warningIconSize: 32,
        closeButtonPosition: 8,
        actionsMarginTop: 1
    }
};

export const getConfirmDialogStyles = (theme) => ({
    paper: {
        borderRadius: CONFIRM_DIALOG_CONFIG.dimensions.borderRadius,
        p: CONFIRM_DIALOG_CONFIG.dimensions.padding,
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: CONFIRM_DIALOG_CONFIG.dimensions.closeButtonPosition,
        top: CONFIRM_DIALOG_CONFIG.dimensions.closeButtonPosition
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1
    },
    warningIcon: {
        fontSize: CONFIRM_DIALOG_CONFIG.dimensions.warningIconSize
    },
    actions: {
        justifyContent: 'center',
        mt: CONFIRM_DIALOG_CONFIG.dimensions.actionsMarginTop
    }
});