import { Box, Typography, useTheme } from "@mui/material";
import { LOGIN_FORM_FOOTER_CONFIG, getLoginFormFooterStyles } from "./styles/LoginFormFooterStyles";

const LoginFormFooter = () => {
    const theme = useTheme();
    const styles = getLoginFormFooterStyles(theme);

    return (
        <Box sx={styles.container}>
            <Typography variant="body2" sx={styles.mainText}>
                © {new Date().getFullYear()} {LOGIN_FORM_FOOTER_CONFIG.appName}. {LOGIN_FORM_FOOTER_CONFIG.rightsText}
            </Typography>
            <Typography variant="caption" sx={styles.versionText}>
                Versão {LOGIN_FORM_FOOTER_CONFIG.version}
            </Typography>
        </Box>
    );
};

export default LoginFormFooter;
