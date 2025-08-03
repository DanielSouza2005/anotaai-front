import { Avatar } from '@mui/material';
import { getUserAvatarStyles } from '../styles/sidebarStyles';

const UserAvatar = ({ user, size = 'medium', theme }) => {
    const avatarStyles = getUserAvatarStyles(theme, size);

    return (
        <Avatar
            alt={user.nome}
            src={user.foto || undefined}
            sx={avatarStyles}
        >
            {!user.foto && user.nome?.charAt(0)}
        </Avatar>
    );
};

export default UserAvatar;