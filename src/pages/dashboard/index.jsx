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
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from '../../components/domain/menu';

const DashboardPage = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <SidebarMenu
                open={drawerOpen}
                toggleDrawer={toggleDrawer}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    transition: 'margin-left 0.3s ease',
                    ml: isMobile ? 0 : (collapsed ? '80px' : '280px'),
                    maxWidth: `calc(100vw - ${isMobile ? 0 : (collapsed ? 80 : 280)}px)`,
                    height: '100dvh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
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

                <Box
                    sx={{
                        margin: 0,
                        padding: 0,
                        flex: 1, 
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 0, 
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default DashboardPage;