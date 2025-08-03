import { Box, Typography } from "@mui/material";

const LoginFormFooter = () => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography
                variant="body2"
                sx={{
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    mb: 0.5
                }}
            >
                © {new Date().getFullYear()} Anota Aí. Todos os Direitos Reservados.
            </Typography>
            <Typography
                variant="caption"
                sx={{
                    color: 'text.disabled',
                    fontSize: '0.7rem'
                }}
            >
                Versão 0.1.0
            </Typography>
        </Box>
    );
};

export default LoginFormFooter;