export const DASHBOARD_PAGE_CONFIG = {
    texts: {
        appTitle: 'Anota Aí',
        openDrawerAriaLabel: 'open drawer'
    },
    sidebar: {
        collapsedWidth: 80,
        expandedWidth: 280
    },
    transitions: {
        marginLeft: 'margin-left 0.3s ease'
    },
    spacing: {
        mainPadding: 3,
        mobileHeaderMarginBottom: 3,
        mobileHeaderPaddingY: 1,
        menuButtonMarginRight: 2
    },
    layout: {
        fullHeight: '100dvh',
        zIndex: 1
    }
};

export const getDashboardPageStyles = (theme) => ({
    container: {
        display: 'flex'
    },
    mainContent: {
        flexGrow: 1,
        p: DASHBOARD_PAGE_CONFIG.spacing.mainPadding,
        transition: DASHBOARD_PAGE_CONFIG.transitions.marginLeft,
        height: DASHBOARD_PAGE_CONFIG.layout.fullHeight,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    mobileHeader: {
        display: 'flex',
        alignItems: 'center',
        mb: DASHBOARD_PAGE_CONFIG.spacing.mobileHeaderMarginBottom,
        position: 'sticky',
        top: 0,
        zIndex: DASHBOARD_PAGE_CONFIG.layout.zIndex,
        bgcolor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        py: DASHBOARD_PAGE_CONFIG.spacing.mobileHeaderPaddingY
    },
    menuButton: {
        mr: DASHBOARD_PAGE_CONFIG.spacing.menuButtonMarginRight
    },
    outletContainer: {
        margin: 0,
        padding: 0,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0
    }
});