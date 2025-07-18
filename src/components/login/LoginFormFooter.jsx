import { Box, Typography } from "@mui/material";

const LoginFormFooter = ({ isMobile }) => {
    return (
        <Box sx={{ mt: isMobile ? 2 : 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Anota Aí. Todos os Direitos Reservados.
            </Typography>
            <Typography variant="caption" color="text.disabled">
                Versão 0.1.0
            </Typography>
        </Box>
    );
}

export default LoginFormFooter;