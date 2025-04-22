import React from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const primaryBlue = theme.palette.primary.main || '#1976d2';

    const goBack = () => {
        navigate(-1); // Volta para a página anterior
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    bgcolor: '#ffffff',
                    minHeight: '100vh',
                    width: '100%',
                    margin: 0,
                    padding: 0,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflowY: 'auto'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        textAlign: 'center',
                        py: 4,
                        bgcolor: '#ffffff',
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '8rem',
                            fontWeight: 700,
                            color: primaryBlue,
                            mb: 2,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        404
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            mb: 3,
                            fontWeight: 600,
                            color: '#444'
                        }}
                    >
                        Oops! Página não encontrada :(
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            color: '#666'
                        }}
                    >
                        Parece que você se perdeu no caminho. A página que você está procurando não existe ou foi movida.
                    </Typography>

                    <Button
                        variant="outlined"
                        size="large"
                        onClick={goBack}
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            color: primaryBlue,
                            borderColor: primaryBlue,
                            borderRadius: '50px',
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            bgcolor: '#ffffff',
                            '&:hover': {
                                bgcolor: 'rgba(25, 118, 210, 0.04)',
                                borderColor: primaryBlue,
                            }
                        }}
                    >
                        Voltar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default NotFoundPage;