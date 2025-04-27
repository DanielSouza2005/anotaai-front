import { Avatar, Box, Divider, Menu, MenuItem, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import { AccountCircle, Settings, Logout } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const UserMenu = ({ anchorEl, open, onOpen, onClose, onLogout, user }) => {

    const theme = useTheme();

    return (
        <Box>

            <Divider />

            <Box sx={{ p: 2 }}>

                <Box
                    onClick={onOpen}
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

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={onClose}
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
                        <Typography variant="subtitle1" fontWeight="bold">{user.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                    </Box>

                    <Divider />

                    <MenuItem onClick={onClose}>
                        <ListItemIcon>
                            <AccountCircle fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Meu Perfil" />
                    </MenuItem>

                    <MenuItem onClick={onClose}>
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

export default UserMenu;
