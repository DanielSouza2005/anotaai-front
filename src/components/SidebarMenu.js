import {
    AccountCircle as AccountCircleIcon,
    Add as AddIcon,
    Business as BusinessIcon,
    ChevronLeft as ChevronLeftIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Group as GroupIcon,
    List as ListIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
    Settings as SettingsIcon
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Collapse,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import logoImage from "../assets/login/logo.png";

const SidebarMenu = ({ open, toggleDrawer }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const drawerWidth = 280;

    const user = {
        name: "João Silva",
        email: "joao.silva@example.com",
        photoUrl: null
    };

    const [contactsOpen, setContactsOpen] = useState(false);
    const [companiesOpen, setCompaniesOpen] = useState(false);
    const [usersOpen, setUsersOpen] = useState(false);

    // User menu state
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);
    const userMenuOpen = Boolean(userMenuAnchor);

    const handleContactsClick = () => {
        setContactsOpen(!contactsOpen);
    };

    const handleCompaniesClick = () => {
        setCompaniesOpen(!companiesOpen);
    };

    const handleUsersClick = () => {
        setUsersOpen(!usersOpen);
    };

    const handleUserMenuOpen = (event) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };

    const handleLogout = () => {
        // Implement logout functionality
        handleUserMenuClose();
        navigate('/login');
    };

    const handleViewProfile = () => {
        handleUserMenuClose();
        // navigate('/'); // Uncomment if you have a profile page
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const handleNavigate = (path) => {
        navigate(path);
        if (isMobile) {
            toggleDrawer();
        }
    };

    useEffect(() => {
        if (location.pathname.includes('/dashboard/contatos')) {
            setContactsOpen(true);
        }
        if (location.pathname.includes('/dashboard/empresas')) {
            setCompaniesOpen(true);
        }
        if (location.pathname.includes('/dashboard/usuarios')) {
            setUsersOpen(true);
        }
    }, [location.pathname]);

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

            {/* Menu principal */}
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <List component="nav" sx={{ p: 1 }}>
                    {/* Contatos */}
                    <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
                        <ListItemButton
                            onClick={handleContactsClick}
                            sx={{
                                borderRadius: 1,
                                bgcolor: location.pathname.includes('/dashboard/contatos') ? `${theme.palette.primary.light}20` : 'transparent',
                                '&:hover': {
                                    bgcolor: location.pathname.includes('/dashboard/contatos')
                                        ? `${theme.palette.primary.light}30`
                                        : theme.palette.action.hover
                                }
                            }}
                        >
                            <ListItemIcon>
                                <PersonIcon
                                    color={location.pathname.includes('/dashboard/contatos') ? "primary" : "inherit"}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary="Contatos"
                                primaryTypographyProps={{
                                    fontWeight: location.pathname.includes('/dashboard/contatos') ? 'bold' : 'normal',
                                    color: location.pathname.includes('/dashboard/contatos') ? theme.palette.primary.main : 'inherit'
                                }}
                            />
                            {contactsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItemButton>
                        <Collapse in={contactsOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton
                                    sx={{
                                        pl: 4,
                                        borderRadius: 1,
                                        bgcolor: isActive('/dashboard/contatos') ? `${theme.palette.primary.light}20` : 'transparent'
                                    }}
                                    onClick={() => handleNavigate('/dashboard/contatos')}
                                >
                                    <ListItemIcon>
                                        <ListIcon
                                            fontSize="small"
                                            color={isActive('/dashboard/contatos') ? "primary" : "inherit"}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Listar Contatos"
                                        primaryTypographyProps={{
                                            fontWeight: isActive('/dashboard/contatos') ? 'bold' : 'normal',
                                            color: isActive('/dashboard/contatos') ? theme.palette.primary.main : 'inherit'
                                        }}
                                    />
                                </ListItemButton>
                                <ListItemButton
                                    sx={{
                                        pl: 4,
                                        borderRadius: 1,
                                    }}
                                >
                                    <ListItemIcon>
                                        <AddIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Novo Contato" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </ListItem>

                    {/* Empresas */}
                    <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
                        <ListItemButton
                            onClick={handleCompaniesClick}
                            sx={{
                                borderRadius: 1,
                                bgcolor: location.pathname.includes('/dashboard/empresas') ? `${theme.palette.primary.light}20` : 'transparent',
                                '&:hover': {
                                    bgcolor: location.pathname.includes('/dashboard/empresas')
                                        ? `${theme.palette.primary.light}30`
                                        : theme.palette.action.hover
                                }
                            }}
                        >
                            <ListItemIcon>
                                <BusinessIcon
                                    color={location.pathname.includes('/dashboard/empresas') ? "primary" : "inherit"}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary="Empresas"
                                primaryTypographyProps={{
                                    fontWeight: location.pathname.includes('/dashboard/empresas') ? 'bold' : 'normal',
                                    color: location.pathname.includes('/dashboard/empresas') ? theme.palette.primary.main : 'inherit'
                                }}
                            />
                            {companiesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItemButton>
                        <Collapse in={companiesOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton
                                    sx={{
                                        pl: 4,
                                        borderRadius: 1,
                                        bgcolor: isActive('/dashboard/empresas') ? `${theme.palette.primary.light}20` : 'transparent'
                                    }}
                                    onClick={() => handleNavigate('/dashboard/empresas')}
                                >
                                    <ListItemIcon>
                                        <ListIcon
                                            fontSize="small"
                                            color={isActive('/dashboard/empresas') ? "primary" : "inherit"}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Listar Empresas"
                                        primaryTypographyProps={{
                                            fontWeight: isActive('/dashboard/empresas') ? 'bold' : 'normal',
                                            color: isActive('/dashboard/empresas') ? theme.palette.primary.main : 'inherit'
                                        }}
                                    />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
                                    <ListItemIcon>
                                        <AddIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Nova Empresa" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </ListItem>

                    {/* Usuários */}
                    <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
                        <ListItemButton
                            onClick={handleUsersClick}
                            sx={{
                                borderRadius: 1,
                                bgcolor: location.pathname.includes('/dashboard/usuarios') ? `${theme.palette.primary.light}20` : 'transparent',
                                '&:hover': {
                                    bgcolor: location.pathname.includes('/dashboard/usuarios')
                                        ? `${theme.palette.primary.light}30`
                                        : theme.palette.action.hover
                                }
                            }}
                        >
                            <ListItemIcon>
                                <GroupIcon
                                    color={location.pathname.includes('/dashboard/usuarios') ? "primary" : "inherit"}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary="Usuários"
                                primaryTypographyProps={{
                                    fontWeight: location.pathname.includes('/dashboard/usuarios') ? 'bold' : 'normal',
                                    color: location.pathname.includes('/dashboard/usuarios') ? theme.palette.primary.main : 'inherit'
                                }}
                            />
                            {usersOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItemButton>
                        <Collapse in={usersOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton
                                    sx={{
                                        pl: 4,
                                        borderRadius: 1,
                                        bgcolor: isActive('/dashboard/usuarios') ? `${theme.palette.primary.light}20` : 'transparent'
                                    }}
                                    onClick={() => handleNavigate('/dashboard/usuarios')}
                                >
                                    <ListItemIcon>
                                        <ListIcon
                                            fontSize="small"
                                            color={isActive('/dashboard/usuarios') ? "primary" : "inherit"}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Listar Usuários"
                                        primaryTypographyProps={{
                                            fontWeight: isActive('/dashboard/usuarios') ? 'bold' : 'normal',
                                            color: isActive('/dashboard/usuarios') ? theme.palette.primary.main : 'inherit'
                                        }}
                                    />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4, borderRadius: 1 }}>
                                    <ListItemIcon>
                                        <AddIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Novo Usuário" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </ListItem>
                </List>
            </Box>

            <Box>
                <Divider />
                {/* Seção do usuário */}
                <Box sx={{ p: 2 }}>
                    <Box
                        onClick={handleUserMenuOpen}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1,
                            borderRadius: 1,
                            cursor: 'pointer',
                            '&:hover': {
                                bgcolor: theme.palette.action.hover
                            }
                        }}
                    >
                        <Avatar
                            src={user.photoUrl}
                            alt={user.name}
                            sx={{
                                width: 40,
                                height: 40,
                                mr: 2,
                                bgcolor: user.photoUrl ? 'transparent' : theme.palette.primary.main
                            }}
                        >
                            {!user.photoUrl && user.name.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1, overflow: 'hidden' }}>
                            <Typography variant="subtitle2" noWrap fontWeight="bold">
                                {user.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" noWrap>
                                {user.email}
                            </Typography>
                        </Box>
                        <ExpandMoreIcon fontSize="small" color="action" />
                    </Box>

                    {/* Menu do Usuário */}
                    <Menu
                        anchorEl={userMenuAnchor}
                        open={userMenuOpen}
                        onClose={handleUserMenuClose}
                        PaperProps={{
                            sx: {
                                width: 220,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                            }
                        }}
                    >
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Avatar
                                src={user.photoUrl}
                                alt={user.name}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    mx: 'auto',
                                    mb: 1,
                                    bgcolor: user.photoUrl ? 'transparent' : theme.palette.primary.main
                                }}
                            >
                                {!user.photoUrl && user.name.charAt(0)}
                            </Avatar>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {user.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user.email}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                                {user.role}
                            </Typography>
                        </Box>

                        <Divider />

                        <MenuItem onClick={handleViewProfile}>
                            <ListItemIcon>
                                <AccountCircleIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Meu Perfil" />
                        </MenuItem>

                        <MenuItem onClick={handleUserMenuClose}>
                            <ListItemIcon>
                                <SettingsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Configurações" />
                        </MenuItem>

                        <Divider />

                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Sair" />
                        </MenuItem>
                    </Menu>
                </Box>

                <Divider />
            </Box>

            {/* Rodapé com configurações */}
            <Box>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                        © {new Date().getFullYear()} Anota Aí
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    )
}

export default SidebarMenu;