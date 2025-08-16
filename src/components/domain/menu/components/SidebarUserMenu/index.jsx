import { AccountCircle, Logout, Settings } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem, useTheme } from '@mui/material';
import { useCallback } from 'react';
import SidebarUserAvatar from './components/SidebarUserAvatar';
import SidebarUserInfo from './components/SidebarUserInfo';
import { getSidebarUserMenuStyles } from './styles/SidebarUserMenuStyles';

const SidebarUserMenu = ({ anchorEl, open, onOpen, onClose, onLogout, user, collapsed }) => {
    const theme = useTheme();
    const menuStyles = getSidebarUserMenuStyles(theme);

    const handleProfileClick = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleSettingsClick = useCallback(() => {
        onClose();
    }, [onClose]);

    if (collapsed) {
        return (
            <Box>
                <Divider />
                <Box sx={menuStyles.collapsedContainer} onClick={onOpen}>
                    <SidebarUserAvatar user={user} size="small" theme={theme} />
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={onClose}
                    PaperProps={{ sx: menuStyles.menuPaper }}
                >
                    <Box sx={menuStyles.menuHeader}>
                        <SidebarUserAvatar user={user} size="large" theme={theme} />
                        <SidebarUserInfo user={user} variant="detailed" />
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleProfileClick}>
                        <ListItemIcon>
                            <AccountCircle fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Meu Perfil" />
                    </MenuItem>
                    <MenuItem onClick={handleSettingsClick}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Configurações" />
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={onLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Sair" />
                    </MenuItem>
                </Menu>
                <Divider />
            </Box>
        );
    }

    return (
        <Box>
            <Divider />
            <Box sx={menuStyles.expandedContainer}>
                <Box onClick={onOpen} sx={menuStyles.userButton}>
                    <SidebarUserAvatar user={user} size="medium" theme={theme} />
                    <SidebarUserInfo user={user} variant="compact" />
                    <ExpandMoreIcon fontSize="small" color="action" />
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={onClose}
                    PaperProps={{ sx: menuStyles.menuPaper }}
                >
                    <Box sx={menuStyles.menuHeader}>
                        <SidebarUserAvatar user={user} size="large" theme={theme} />
                        <SidebarUserInfo user={user} variant="detailed" />
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleProfileClick}>
                        <ListItemIcon>
                            <AccountCircle fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Meu Perfil" />
                    </MenuItem>
                    <MenuItem onClick={handleSettingsClick}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Configurações" />
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={onLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Sair" />
                    </MenuItem>
                </Menu>
            </Box>
            <Divider />
        </Box>
    );
};

export default SidebarUserMenu;