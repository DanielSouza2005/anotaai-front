import { SIDEBAR_CONFIG } from "../../../styles/sidebarStyles";

export const getSidebarUserMenuStyles = (theme) => ({
    expandedContainer: {
        p: 2
    },
    collapsedContainer: {
        p: 1,
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: 1,
        '&:hover': {
            bgcolor: theme.palette.action.hover
        }
    },
    userButton: {
        display: 'flex',
        alignItems: 'center',
        p: 1,
        borderRadius: 1,
        cursor: 'pointer',
        transition: SIDEBAR_CONFIG.transitions.fast,
        '&:hover': {
            bgcolor: theme.palette.action.hover,
            transform: 'translateY(-1px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }
    },
    menuPaper: {
        width: 220,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        borderRadius: 2,
        overflow: 'hidden'
    },
    menuHeader: {
        p: 2,
        textAlign: 'center',
        bgcolor: theme.palette.grey[50],
        borderBottom: `1px solid ${theme.palette.divider}`
    }
});