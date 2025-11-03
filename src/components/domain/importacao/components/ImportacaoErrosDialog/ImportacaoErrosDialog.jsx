import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';

const ImportacaoErrosDialog = ({ open, onClose, errorMessage }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Detalhes do Erro</DialogTitle>

            <DialogContent dividers>
                <Box
                    sx={{
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        p: 1,
                        bgcolor: '#f5f5f5',
                        borderRadius: 1,
                    }}
                >
                    {errorMessage || 'Sem erros.'}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="contained" color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportacaoErrosDialog;
