import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const SidebarItem = ({ title, icon: IconComponent, basePath, collapsed }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();

    const isActive = location.pathname.includes(basePath);

    const handleNavigate = () => {
        navigate(basePath);
    };

    return (
        <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
            <ListItemButton
                onClick={handleNavigate}
                sx={{
                    borderRadius: 1,
                    bgcolor: isActive ? `${theme.palette.primary.light}20` : 'transparent',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    px: collapsed ? 1.5 : 2,
                    '&:hover': {
                        bgcolor: isActive
                            ? `${theme.palette.primary.light}30`
                            : theme.palette.action.hover,
                    },
                    transition: 'all 0.3s ease',
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: collapsed ? 0 : 2,
                        justifyContent: 'center',
                        color: isActive ? theme.palette.primary.main : 'inherit',
                    }}
                >
                    {IconComponent && <IconComponent />}
                </ListItemIcon>

                {!collapsed && (
                    <ListItemText
                        primary={title}
                        primaryTypographyProps={{
                            fontWeight: isActive ? 'bold' : 'normal',
                            color: isActive ? theme.palette.primary.main : 'inherit',
                        }}
                    />
                )}
            </ListItemButton>
        </ListItem>
    );
};

export default SidebarItem;
