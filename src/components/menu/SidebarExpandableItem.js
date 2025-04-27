import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, ListItem, useTheme } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SidebarExpandableItem = ({ title, icon, basePath, subItems }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();

    const [open, setOpen] = useState(() => location.pathname.includes(basePath));
    const isActive = location.pathname.includes(basePath);
    const IconComponent = icon;

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
                <ListItemButton
                    onClick={handleToggle}
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
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {subItems.map((item) => {
                            const isSubItemActive = item.path && location.pathname.includes(item.path);
                            const SubItemIcon = item.icon;

                            return (
                                <ListItemButton
                                    key={item.label}
                                    sx={{
                                        pl: 4,
                                        borderRadius: 1,
                                    }}
                                    selected={isSubItemActive}
                                    onClick={() => item.path && handleNavigate(item.path)}
                                >
                                    {SubItemIcon && (
                                        <ListItemIcon>
                                            <SubItemIcon
                                                fontSize="small"
                                                color={isSubItemActive ? "primary" : "inherit"}
                                            />
                                        </ListItemIcon>
                                    )}
                                    <ListItemText
                                        primary={item.label}
                                        primaryTypographyProps={{
                                            fontWeight: isSubItemActive ? 'bold' : 'normal',
                                            color: isSubItemActive ? theme.palette.primary.main : 'inherit'
                                        }}
                                    />
                                </ListItemButton>
                            );
                        })}
                    </List>
                </Collapse>
            </ListItem>
        </>
    );
};

export default SidebarExpandableItem;
