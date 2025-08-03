import { Box, Typography } from '@mui/material';
import { getUserInfoStyles } from '../styles/sidebarStyles';

const UserInfo = ({ user, variant = 'compact' }) => {
    const infoStyles = getUserInfoStyles(variant);

    if (variant === 'detailed') {
        return (
            <Box sx={infoStyles.container}>
                <Typography variant="subtitle1" fontWeight="bold" sx={infoStyles.name}>
                    {user.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={infoStyles.email}>
                    {user.email}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={infoStyles.container}>
            <Typography variant="subtitle2" noWrap fontWeight="bold" sx={infoStyles.name}>
                {user.nome}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap sx={infoStyles.email}>
                {user.email}
            </Typography>
        </Box>
    );
};

export default UserInfo;