import { Drawer, Box, Divider, List, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import logoImage from "../../assets/login/logo.png";
import SidebarExpandableItem from './SidebarExpandableItem';
import UserMenu from './SidebarUserMenu';
import { menuItems } from '../../config/menu/menuConfig';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SidebarMenu = ({ open, toggleDrawer }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const drawerWidth = 280;

    const [userMenuAnchor, setUserMenuAnchor] = useState(null);
    const userMenuOpen = Boolean(userMenuAnchor);

    const user = { name: "João Silva", email: "joao.silva@example.com" };

    const handleLogout = () => {
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
                    {menuItems.map((menu) => (
                        <SidebarExpandableItem
                            key={menu.title}
                            title={menu.title}
                            icon={menu.icon}
                            basePath={menu.basePath}
                            subItems={menu.subItems}
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