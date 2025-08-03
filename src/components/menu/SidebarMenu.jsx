import {
    Box,
    Drawer,
    List,
    useMediaQuery,
    useTheme
} from '@mui/material';

import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import animationData from '../../assets/animations/Session-Expired.json';
import { menuItems } from '../../config/menu/menuConfig';
import { useAuth } from '../../context/auth/AuthContext';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import SidebarFooter from './components/SidebarFooter';
import SidebarHeader from './components/SidebarHeader';
import SidebarItem from './components/SidebarItem';
import UserMenu from './components/SidebarUserMenu';
import { getSidebarStyles } from './styles/sidebarStyles';

const SidebarMenu = ({ open, toggleDrawer, collapsed, setCollapsed }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { logout, user, isLoggingOut } = useAuth();
    const navigate = useNavigate();
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);
    const userMenuOpen = Boolean(userMenuAnchor);

    const drawerWidth = collapsed ? 80 : 280;
    const drawerStyles = getSidebarStyles(theme, collapsed, drawerWidth);

    const handleToggleCollapsed = useCallback(() => {
        setCollapsed(!collapsed);
    }, [collapsed, setCollapsed]);

    const handleExpandSidebar = useCallback(() => {
        setCollapsed(false);
    }, [setCollapsed]);

    const handleLogout = useCallback(() => {
        logout();
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    }, [logout, navigate]);

    const handleUserMenuOpen = useCallback((event) => {
        setUserMenuAnchor(event.currentTarget);
    }, []);

    const handleUserMenuClose = useCallback(() => {
        setUserMenuAnchor(null);
    }, []);

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
            sx={drawerStyles.drawer}
        >
            <SidebarHeader
                collapsed={collapsed}
                isMobile={isMobile}
                onToggleCollapsed={handleToggleCollapsed}
                onExpandSidebar={handleExpandSidebar}
                onToggleDrawer={toggleDrawer}
                theme={theme}
            />

            <Box sx={drawerStyles.menuList}>
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
                onOpen={handleUserMenuOpen}
                onClose={handleUserMenuClose}
                onLogout={handleLogout}
                user={user}
                collapsed={collapsed}
            />

            <SidebarFooter collapsed={collapsed} />
        </Drawer>
    );
};

export default SidebarMenu;