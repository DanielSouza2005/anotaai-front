import {
    Menu as MenuIcon
} from '@mui/icons-material';

import {
    Box,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';

const DashboardPage = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerWidth = 280;

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Menu lateral */}
            <SidebarMenu
                open={drawerOpen}
                toggleDrawer={toggleDrawer}
            />            

            {/* Conteúdo principal */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                {/* Barra superior fixa apenas para dispositivos móveis */}
                {isMobile &&
                    (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 3,
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            bgcolor: theme.palette.background.paper,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            py: 1
                        }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={toggleDrawer}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap component="div">
                                Anota Aí
                            </Typography>
                        </Box>
                    )
                }

                {/* Conteúdo da página */}
                <Box sx={{ p: 3 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default DashboardPage;