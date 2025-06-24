import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';

const ConfirmDialog = ({
    open,
    onClose,
    onConfirm,
    title = 'Confirmar ação',
    message = 'Tem certeza que deseja continuar?',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    confirmColor = 'error',
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 2,
                    textAlign: 'center',
                },
            }}
        >
            <IconButton
                aria-label="Fechar"
                onClick={onClose}
                sx={{ position: 'absolute', right: 8, top: 8 }}
            >
                <CloseIcon />
            </IconButton>

            <DialogTitle sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                <WarningAmberIcon color={confirmColor} sx={{ fontSize: 32 }} />
                <Typography variant="h6" component="span">
                    {title}
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Typography variant="body1" color="text.secondary">
                    {message}
                </Typography>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', mt: 1 }}>
                <Button onClick={onClose} variant="outlined" color="inherit">
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} variant="contained" color={confirmColor}>
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
