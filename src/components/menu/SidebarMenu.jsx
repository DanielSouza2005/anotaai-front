import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    Stack,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';

import logoImage from '../../assets/login/logo.png';
import { menuItems } from '../../config/menu/menuConfig';
import UserMenu from './SidebarUserMenu';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import animationData from '../../assets/animations/Session-Expired.json';
import { useAuth } from '../../context/auth/AuthContext';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import SidebarItem from './SidebarItem';

const SidebarMenu = ({ open, toggleDrawer, collapsed, setCollapsed }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { logout, user, isLoggingOut } = useAuth();
    const navigate = useNavigate();
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);
    const userMenuOpen = Boolean(userMenuAnchor);

    const drawerWidth = collapsed ? 80 : 280;

    const handleLogout = () => {
        logout();
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    if (isLoggingOut) {
        return (
            <LoadingScreen
                animationData={animationData}
                message="Encerrando sua sessão..."
                width={200}
            />
        );
    }

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isMobile ? open : true}
            onClose={toggleDrawer}
            sx={{
                flexShrink: 0,
                overflowX: 'hidden',
                zIndex: theme.zIndex.drawer,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    transition: 'all 0.3s ease',
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
            }}
        >
            <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {
                        !collapsed && (
                            <Box
                                sx={{
                                    height: collapsed ? 50 : 100,
                                    width: '100%',
                                    backgroundImage: `url(${logoImage})`,
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            />
                        )
                    }

                    {isMobile ? (
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={() => setCollapsed(!collapsed)}>
                            {collapsed ? <MenuOpenIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    )}
                </Box>
                <Divider sx={{ mt: 2 }} />
            </Box>

            <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
                <List component="nav" sx={{ p: 1 }}>
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                            basePath={item.basePath}
                            collapsed={collapsed}
                        />
                    ))}
                </List>
            </Box>

            <UserMenu
                anchorEl={userMenuAnchor}
                open={userMenuOpen}
                onOpen={(event) => setUserMenuAnchor(event.currentTarget)}
                onClose={() => setUserMenuAnchor(null)}
                onLogout={handleLogout}
                user={user}
            />

            <Box>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                    {!collapsed ?
                        (
                            <Stack direction="row" justifyContent="center" spacing={1} alignItems="center">
                                <Typography variant="caption" color="text.secondary" noWrap>
                                    © {new Date().getFullYear()} Anota Aí
                                </Typography>
                                <Typography variant="caption" color="text.disabled" noWrap>
                                    • Versão 0.1.0
                                </Typography>
                            </Stack>
                        )
                        :
                        (
                            <Tooltip title="Anota Aí • Versão 0.1.0" arrow placement="top">
                                <Typography variant="caption" color="text.secondary" noWrap>
                                    © {new Date().getFullYear()}
                                </Typography>
                            </Tooltip>
                        )
                    }
                </Box>
            </Box>
        </Drawer>
    );
};

export default SidebarMenu;
