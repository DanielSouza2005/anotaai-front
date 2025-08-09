import { Avatar } from '@mui/material';
import { getSidebarUserAvatarStyles } from './styles/SidebarUserAvatarStyles';

const SidebarUserAvatar = ({ user, size = 'medium', theme }) => {
    const avatarStyles = getSidebarUserAvatarStyles(theme, size);

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

export default SidebarUserAvatar;