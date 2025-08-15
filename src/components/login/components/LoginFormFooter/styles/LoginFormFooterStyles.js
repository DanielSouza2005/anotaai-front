export const LOGIN_FORM_FOOTER_CONFIG = {
    appName: "Anota Aí",
    rightsText: "Todos os Direitos Reservados.",
    version: "0.1.0",
    fontSizes: {
        main: '0.75rem',
        version: '0.7rem'
    }
};

export const getLoginFormFooterStyles = (theme) => ({
    container: {
        textAlign: 'center'
    },
    mainText: {
        color: theme.palette.text.secondary,
        fontSize: LOGIN_FORM_FOOTER_CONFIG.fontSizes.main,
        mb: 0.5
    },
    versionText: {
        color: theme.palette.text.disabled,
        fontSize: LOGIN_FORM_FOOTER_CONFIG.fontSizes.version
    }
});
