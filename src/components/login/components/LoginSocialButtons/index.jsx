import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import appleIcon from "../../../../assets/icons/social/apple.png";
import facebookIcon from "../../../../assets/icons/social/facebook.png";
import googleIcon from "../../../../assets/icons/social/google.png";
import { LOGIN_SOCIAL_BUTTONS_CONFIG, getLoginSocialButtonsStyles } from './styles/LoginSocialButtonsStyles';

const LoginSocialButtons = ({ isMobile }) => {
    const theme = useTheme();
    const styles = getLoginSocialButtonsStyles(theme, isMobile);

    const providers = [
        { name: 'Google', icon: googleIcon, color: '#DB4437' /*, onClick: () => {} */ },
        { name: 'Facebook', icon: facebookIcon, color: '#1877F2' /*, onClick: () => {} */ },
        { name: 'Apple', icon: appleIcon, color: '#000000' /*, onClick: () => {} */ }
    ];

    return (
        <Box sx={styles.container}>
            {providers.map(({ name, icon, color, onClick }) => (
                <Tooltip key={name} title={`${LOGIN_SOCIAL_BUTTONS_CONFIG.tooltipPrefix} ${name}`}>
                    <IconButton
                        aria-label={`${LOGIN_SOCIAL_BUTTONS_CONFIG.tooltipPrefix} ${name}`}
                        onClick={onClick}
                        sx={styles.button(color)}
                    >
                        <img
                            src={icon}
                            alt={name}
                            style={styles.iconImg}
                        />
                    </IconButton>
                </Tooltip>
            ))}
        </Box>
    );
};

export default LoginSocialButtons;
