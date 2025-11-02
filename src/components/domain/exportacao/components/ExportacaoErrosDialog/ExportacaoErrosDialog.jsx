import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';

const ExportacaoErrosDialog = ({ open, onClose, errorMessage }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Detalhes do Erro</DialogTitle>

            <DialogContent dividers>
                <TextField
                    label="Mensagem de erro"
                    value={errorMessage || ''}
                    multiline
                    minRows={6}
                    fullWidth                    
                    InputProps={{
                        readOnly: true,
                        sx: {
                            fontFamily: 'monospace',
                            overflowY: 'auto',
                            maxHeight: '300px',
                        },
                    }}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="contained" color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExportacaoErrosDialog;
