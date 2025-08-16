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
import { DASHBOARD_PAGE_CONFIG, getDashboardPageStyles } from './styles/dashboardStyles';

const DashboardPage = () => {
    const theme = useTheme();
    const styles = getDashboardPageStyles(theme);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const getMainMarginLeft = () => {
        if (isMobile) return 0;
        return collapsed
            ? DASHBOARD_PAGE_CONFIG.sidebar.collapsedWidth
            : DASHBOARD_PAGE_CONFIG.sidebar.expandedWidth;
    };

    const getMainMaxWidth = () => {
        const sidebarWidth = isMobile ? 0 : (collapsed
            ? DASHBOARD_PAGE_CONFIG.sidebar.collapsedWidth
            : DASHBOARD_PAGE_CONFIG.sidebar.expandedWidth);
        return `calc(100vw - ${sidebarWidth}px)`;
    };

    return (
        <Box sx={styles.container}>
            <SidebarMenu
                open={drawerOpen}
                toggleDrawer={toggleDrawer}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <Box
                component="main"
                sx={{
                    ...styles.mainContent,
                    ml: `${getMainMarginLeft()}px`,
                    maxWidth: getMainMaxWidth(),
                }}
            >
                {isMobile && (
                    <Box sx={styles.mobileHeader}>
                        <IconButton
                            color="inherit"
                            aria-label={DASHBOARD_PAGE_CONFIG.texts.openDrawerAriaLabel}
                            edge="start"
                            onClick={toggleDrawer}
                            sx={styles.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            {DASHBOARD_PAGE_CONFIG.texts.appTitle}
                        </Typography>
                    </Box>
                )}

                <Box sx={styles.outletContainer}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardPage;