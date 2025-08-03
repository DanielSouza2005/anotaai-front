import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { getSidebarFooterStyles } from '../styles/sidebarStyles';

const SidebarFooter = ({ collapsed }) => {
    const footerStyles = getSidebarFooterStyles();
    const currentYear = new Date().getFullYear();

    return (
        <Box>
            <Box sx={footerStyles.container}>
                {!collapsed ? (
                    <Stack direction="row" justifyContent="center" spacing={1} alignItems="center">
                        <Typography variant="caption" color="text.secondary" noWrap>
                            © {currentYear} Anota Aí
                        </Typography>
                        <Typography variant="caption" color="text.disabled" noWrap>
                            • Versão 0.1.0
                        </Typography>
                    </Stack>
                ) : (
                    <Tooltip title="Anota Aí • Versão 0.1.0" arrow placement="top">
                        <Typography variant="caption" color="text.secondary" noWrap>
                            © {currentYear}
                        </Typography>
                    </Tooltip>
                )}
            </Box>
        </Box>
    );
};

export default SidebarFooter;