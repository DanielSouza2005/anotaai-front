import { Box } from "@mui/material";

const LoginLeftPanel = ({isTablet, isMobile, logoImage }) => {
    return (
        <Box
            sx={{
                bgcolor: 'primary.main',
                width: isTablet ? '100%' : '50%',
                minHeight: isTablet ? '200px' : 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: isMobile ? 3 : 4,
                color: 'white',
            }}
        >
            <Box
                sx={{
                    width: isMobile ? '70%' : '80%',
                    height: isMobile ? '100px' : '200px',
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    backgroundImage: `url(${logoImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
            </Box>
        </Box>
    );
}

export default LoginLeftPanel;