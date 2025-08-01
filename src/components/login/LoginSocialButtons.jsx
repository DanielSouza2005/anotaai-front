import { Box, IconButton, Tooltip } from '@mui/material';
import googleIcon from "../../assets/icons/social/google.png";
import facebookIcon from "../../assets/icons/social/facebook.png";
import appleIcon from "../../assets/icons/social/apple.png";

const LoginSocialButtons = () => {
    const socialButtons = [
        {
            name: 'Google',
            icon: googleIcon,
            // onClick: () => console.log('Login com Google')
        },
        {
            name: 'Facebook',
            icon: facebookIcon,
            // onClick: () => console.log('Login com Facebook')
        },
        {
            name: 'Apple',
            icon: appleIcon,
            // onClick: () => console.log('Login com Apple')
        }
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mb: 3
            }}
        >
            {socialButtons.map((social) => (
                <Tooltip key={social.name} title={`Entrar com ${social.name}`}>
                    <IconButton
                        onClick={social.onClick}
                        sx={{
                            width: 48,
                            height: 48,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: '12px',
                            backgroundColor: 'background.paper',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: social.color,
                                borderColor: social.color,
                                color: 'white',
                                transform: 'translateY(-2px)',
                                boxShadow: `0 8px 16px ${social.color}40`
                            }
                        }}
                    >
                        <img
                            src={social.icon}
                            alt={social.name}
                            style={{
                                width: 24,
                                height: 24,
                                transition: 'filter 0.2s ease-in-out',
                                filter: 'grayscale(0%)'
                            }}
                        />
                    </IconButton>
                </Tooltip>
            ))}
        </Box>
    );
};

export default LoginSocialButtons;