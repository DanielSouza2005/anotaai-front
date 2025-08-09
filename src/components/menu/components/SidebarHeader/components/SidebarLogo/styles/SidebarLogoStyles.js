import { SIDEBAR_CONFIG } from "../../../../../styles/sidebarStyles";

export const getSidebarLogoStyles = (theme, collapsed) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        cursor: collapsed ? 'pointer' : 'default',
        padding: collapsed ? theme.spacing(1) : theme.spacing(0),
        borderRadius: collapsed ? theme.spacing(1) : 0,
        transition: SIDEBAR_CONFIG.transitions.standard,
        minHeight: 64,
        '&:hover': collapsed ? {
            backgroundColor: theme.palette.action.hover,
            transform: 'scale(1.05)',
        } : {}
    },
    image: {
        height: collapsed ? SIDEBAR_CONFIG.logoHeight.collapsed : SIDEBAR_CONFIG.logoHeight.expanded,
        width: collapsed ? SIDEBAR_CONFIG.logoHeight.collapsed : SIDEBAR_CONFIG.logoHeight.expanded,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        flexShrink: 0,
        transition: SIDEBAR_CONFIG.transitions.standard,
    },
    text: {
        ml: 2,
        fontWeight: 'bold',
        fontSize: '1.5rem',
        color: theme.palette.primary.main,
        letterSpacing: '-0.5px',
        userSelect: 'none',
    }
});