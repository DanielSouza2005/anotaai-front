export const SIDEBAR_CONFIG = {
    collapsedWidth: 80,
    expandedWidth: 280,
    logoHeight: {
        collapsed: 40,
        expanded: 50
    },
    avatarSizes: {
        small: 32,
        medium: 40,
        large: 60
    },
    transitions: {
        standard: 'all 0.3s ease',
        fast: 'all 0.2s ease'
    }
};

export const getSidebarStyles = (theme, collapsed, drawerWidth) => ({
    drawer: {
        flexShrink: 0,
        overflowX: 'hidden',
        zIndex: theme.zIndex.drawer,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            transition: SIDEBAR_CONFIG.transitions.standard,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            bgcolor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
            background: collapsed
                ? theme.palette.background.default
                : 'linear-gradient(to bottom, #ffffff 0%, #f9f9f9 100%)',
            boxShadow: collapsed
                ? '4px 0 10px rgba(0,0,0,0.2)'
                : '2px 0 5px rgba(0,0,0,0.1)',
            borderRadius: collapsed ? '0 16px 16px 0' : 0,
            overflowX: 'hidden',
        },
    },
    menuList: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden'
    }
});