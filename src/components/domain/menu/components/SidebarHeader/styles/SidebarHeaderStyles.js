import { SIDEBAR_CONFIG } from "../../../styles/sidebarStyles";

export const getSidebarHeaderStyles = (theme) => ({
    container: {
        p: 2
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 64
    },
    logoContainer: {
        flex: 1
    },
    toggleButton: {
        ml: 1,
        transition: SIDEBAR_CONFIG.transitions.standard,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            transform: 'scale(1.1)',
        }
    },
    divider: {
        mt: 2
    }
});