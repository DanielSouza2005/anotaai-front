import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box, Divider, Drawer, IconButton, List, Typography, useMediaQuery, useTheme } from '@mui/material';

import logoImage from "../../assets/login/logo.png";
import { menuItems } from '../../config/menu/menuConfig';
import UserMenu from './SidebarUserMenu';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';
import SidebarItem from './SidebarItem';

const SidebarMenu = ({ open, toggleDrawer }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const drawerWidth = 280;

    const [userMenuAnchor, setUserMenuAnchor] = useState(null);
    const userMenuOpen = Boolean(userMenuAnchor);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? open : true}
            onClose={toggleDrawer}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    bgcolor: theme.palette.background.paper,
                    borderRight: `1px solid ${theme.palette.divider}`,
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box
                        sx={{
                            height: 100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: isMobile ? '85%' : '100%',
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: 2,
                            backgroundImage: `url(${logoImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                    </Box>
                    {isMobile && (
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    )}
                </Box>
                <Divider sx={{ mt: 2 }} />
            </Box>

            <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <List component="nav" sx={{ p: 1 }}>
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                            basePath={item.basePath}
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
                    <Typography variant="caption" color="text.secondary">
                        © {new Date().getFullYear()} Anota Aí
                    </Typography>
                </Box>
            </Box>

        </Drawer>
    );
}

export default SidebarMenu;