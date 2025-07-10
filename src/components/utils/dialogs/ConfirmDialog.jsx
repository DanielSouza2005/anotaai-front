import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import DialogTransition from './transition/DialogTransitions';

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
    const [submitting, setSubmitting] = useState(false);

    const handleConfirm = async () => {
        setSubmitting(true);
        try {
            await onConfirm(() => setSubmitting(false));
        } catch (err) {
            setSubmitting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={submitting ? undefined : onClose}
            maxWidth="xs"
            fullWidth
            TransitionComponent={DialogTransition}
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
                disabled={submitting}
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
                <Button
                    onClick={onClose}
                    variant="outlined"
                    color="inherit"
                    disabled={submitting}
                >
                    {cancelText}
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color={confirmColor}
                    disabled={submitting}
                >
                    {submitting ? 'Aguarde...' : confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
