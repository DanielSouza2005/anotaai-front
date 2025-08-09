import { Box, Tooltip, Typography } from '@mui/material';
import { useCallback } from 'react';
import logoImage from '../../../../../../assets/login/logo.png';
import { getSidebarLogoStyles } from './styles/SidebarLogoStyles';

const SidebarLogo = ({ collapsed, onExpandSidebar, theme }) => {
    const logoStyles = getSidebarLogoStyles(theme, collapsed);

    const handleLogoClick = useCallback(() => {
        if (collapsed) {
            onExpandSidebar();
        }
    }, [collapsed, onExpandSidebar]);

    const renderLogoImage = () => (
        <Box
            sx={{
                ...logoStyles.image,
                backgroundImage: `url(${logoImage})`
            }}
        />
    );

    const renderLogoText = () => (
        <Typography variant="h6" sx={logoStyles.text}>
            Anota Aí
        </Typography>
    );

    const renderExpandedLogo = () => (
        <Box sx={logoStyles.container}>
            {renderLogoImage()}
            {renderLogoText()}
        </Box>
    );

    const renderCollapsedLogo = () => (
        <Tooltip
            title="Expandir menu - Anota Aí"
            arrow
            placement="right"
            enterDelay={500}
        >
            <Box sx={logoStyles.container} onClick={handleLogoClick}>
                {renderLogoImage()}
            </Box>
        </Tooltip>
    );

    return collapsed ? renderCollapsedLogo() : renderExpandedLogo();
};

export default SidebarLogo;