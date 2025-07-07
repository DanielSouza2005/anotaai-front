import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const SidebarItem = ({ title, icon, basePath }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();

    const isActive = location.pathname.includes(basePath);
    const IconComponent = icon;

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
                    '&:hover': {
                        bgcolor: isActive ? `${theme.palette.primary.light}30` : theme.palette.action.hover
                    }
                }}
            >
                <ListItemIcon>
                    {IconComponent && <IconComponent color={isActive ? 'primary' : 'inherit'} />}
                </ListItemIcon>
                <ListItemText
                    primary={title}
                    primaryTypographyProps={{
                        fontWeight: isActive ? 'bold' : 'normal',
                        color: isActive ? theme.palette.primary.main : 'inherit'
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
};

export default SidebarItem;
