import { SIDEBAR_CONFIG } from "../../../styles/sidebarStyles";

export const getSidebarItemStyles = (theme, isActive, collapsed) => {
    return {
        container: {
            display: 'block',
            mb: 0.5
        },
        button: {
            borderRadius: 1,
            bgcolor: isActive ? `${theme.palette.primary.light}20` : 'transparent',
            justifyContent: collapsed ? 'center' : 'flex-start',
            px: collapsed ? 1.5 : 2,
            '&:hover': {
                bgcolor: isActive
                    ? `${theme.palette.primary.light}30`
                    : theme.palette.action.hover,
            },
            transition: SIDEBAR_CONFIG.transitions.standard,
        },
        icon: {
            minWidth: 0,
            mr: collapsed ? 0 : 2,
            justifyContent: 'center',
            color: isActive ? theme.palette.primary.main : 'inherit',
        },
        text: {
            fontWeight: isActive ? 'bold' : 'normal',
            color: isActive ? theme.palette.primary.main : 'inherit',
        }
    };
};
