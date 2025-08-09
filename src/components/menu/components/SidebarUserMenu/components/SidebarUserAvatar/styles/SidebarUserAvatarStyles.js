import { SIDEBAR_CONFIG } from "../../../../../styles/sidebarStyles";

export const getSidebarUserAvatarStyles = (theme, size) => {
    const sizeValue = SIDEBAR_CONFIG.avatarSizes[size] || SIDEBAR_CONFIG.avatarSizes.medium;

    return {
        width: sizeValue,
        height: sizeValue,
        mr: size === 'small' ? 0 : 2,
        mx: size === 'large' ? 'auto' : undefined,
        mb: size === 'large' ? 1 : 0,
        bgcolor: theme.palette.primary.main,
        fontSize: size === 'large' ? '1.5rem' : undefined,
        fontWeight: 'bold'
    };
};