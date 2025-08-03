import { ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { getSidebarItemStyles } from '../styles/sidebarStyles';

const SidebarItem = ({ title, icon: IconComponent, basePath, collapsed }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = location.pathname.includes(basePath);
    const theme = useTheme();
    const itemStyles = getSidebarItemStyles(theme, isActive, collapsed);

    const handleNavigate = useCallback(() => {
        navigate(basePath);
    }, [navigate, basePath]);

    const renderListItemButton = () => (
        <ListItemButton onClick={handleNavigate} sx={itemStyles.button}>
            <ListItemIcon sx={itemStyles.icon}>
                {IconComponent && <IconComponent />}
            </ListItemIcon>

            {!collapsed && (
                <ListItemText
                    primary={title}
                    primaryTypographyProps={itemStyles.text}
                />
            )}
        </ListItemButton>
    );

    return (
        <ListItem disablePadding sx={itemStyles.container}>
            {collapsed ? (
                <Tooltip title={title} arrow placement="right" enterDelay={500}>
                    {renderListItemButton()}
                </Tooltip>
            ) : (
                renderListItemButton()
            )}
        </ListItem>
    );
};

export default SidebarItem;