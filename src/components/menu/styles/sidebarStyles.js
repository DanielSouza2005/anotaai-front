const SIDEBAR_CONFIG = {
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

export const getSidebarFooterStyles = () => ({
    container: {
        p: 2,
        textAlign: 'center'
    }
});

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

export const getUserAvatarStyles = (theme, size) => {
    const sizeValue = SIDEBAR_CONFIG.avatarSizes[size] || SIDEBAR_CONFIG.avatarSizes.medium;

    return {
        width: sizeValue,
        height: sizeValue,
        mr: size === 'small' ? 0 : 2,
        mx: size === 'large' ? 'auto' : undefined,
        mb: size === 'large' ? 1 : 0,
        bgcolor: theme.palette.primary.main,
        fontSize: size === 'large' ? '1.5rem' : undefined,
        fontWeight: 'bold'
    };
};

export const getUserInfoStyles = (variant) => ({
    container: {
        flex: variant === 'compact' ? 1 : undefined,
        overflow: variant === 'compact' ? 'hidden' : undefined,
        textAlign: variant === 'detailed' ? 'center' : 'left'
    },
    name: {
        overflow: variant === 'compact' ? 'hidden' : undefined,
        textOverflow: variant === 'compact' ? 'ellipsis' : undefined,
        whiteSpace: variant === 'compact' ? 'nowrap' : undefined
    },
    email: {
        overflow: variant === 'compact' ? 'hidden' : undefined,
        textOverflow: variant === 'compact' ? 'ellipsis' : undefined,
        whiteSpace: variant === 'compact' ? 'nowrap' : undefined
    }
});

export const getUserMenuStyles = (theme, collapsed) => ({
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

export const getResponsiveStyles = (isMobile) => ({
    drawer: {
        variant: isMobile ? 'temporary' : 'permanent'
    }
});

export const getAnimationStyles = () => ({
    fadeIn: {
        animation: 'fadeIn 0.3s ease-in-out',
        '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(10px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
        }
    },
    slideIn: {
        animation: 'slideIn 0.3s ease-in-out',
        '@keyframes slideIn': {
            from: { transform: 'translateX(-20px)', opacity: 0 },
            to: { transform: 'translateX(0)', opacity: 1 }
        }
    }
});

export const getSidebarThemeOverrides = (theme) => ({
    MuiDrawer: {
        styleOverrides: {
            paper: {
                '&::-webkit-scrollbar': {
                    width: 6,
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.grey[300],
                    borderRadius: 3,
                    '&:hover': {
                        backgroundColor: theme.palette.grey[400],
                    }
                }
            }
        }
    }
});