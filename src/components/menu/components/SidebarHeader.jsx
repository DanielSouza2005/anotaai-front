import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box, Divider, IconButton } from '@mui/material';
import { getSidebarHeaderStyles } from '../styles/sidebarStyles';
import SidebarLogo from './SidebarLogo';

const SidebarHeader = ({
    collapsed,
    isMobile,
    onToggleCollapsed,
    onExpandSidebar,
    onToggleDrawer,
    theme
}) => {
    const headerStyles = getSidebarHeaderStyles(theme);

    return (
        <Box sx={headerStyles.container}>
            <Box sx={headerStyles.content}>
                <Box sx={headerStyles.logoContainer}>
                    <SidebarLogo
                        collapsed={collapsed}
                        onExpandSidebar={onExpandSidebar}
                        theme={theme}
                    />
                </Box>

                {!isMobile && (
                    <IconButton
                        onClick={onToggleCollapsed}
                        sx={headerStyles.toggleButton}
                    >
                        {collapsed ? <MenuOpenIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                )}

                {isMobile && (
                    <IconButton onClick={onToggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                )}
            </Box>
            <Divider sx={headerStyles.divider} />
        </Box>
    );
};

export default SidebarHeader;