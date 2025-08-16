import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import DialogTransition from '../transition/DialogTransitions';
import { CONFIRM_DIALOG_CONFIG, getConfirmDialogStyles } from './styles/ConfirmDialogStyles';

const ConfirmDialog = ({
    open,
    onClose,
    onConfirm,
    title = CONFIRM_DIALOG_CONFIG.texts.defaultTitle,
    message = CONFIRM_DIALOG_CONFIG.texts.defaultMessage,
    confirmText = CONFIRM_DIALOG_CONFIG.texts.confirmButton,
    cancelText = CONFIRM_DIALOG_CONFIG.texts.cancelButton,
    confirmColor = CONFIRM_DIALOG_CONFIG.colors.defaultConfirmColor,
}) => {
    const theme = useTheme();
    const styles = getConfirmDialogStyles(theme);
    const [submitting, setSubmitting] = useState(false);

    const handleConfirm = async () => {
        setSubmitting(true);
        try {
            await onConfirm();
        } finally {
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
                sx: styles.paper,
            }}
        >
            <IconButton
                aria-label={CONFIRM_DIALOG_CONFIG.texts.closeAriaLabel}
                onClick={onClose}
                disabled={submitting}
                sx={styles.closeButton}
            >
                <CloseIcon />
            </IconButton>

            <DialogTitle sx={styles.title}>
                <WarningAmberIcon
                    color={confirmColor}
                    sx={styles.warningIcon}
                />
                <Typography variant="h6" component="span">
                    {title}
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Typography variant="body1" color="text.secondary">
                    {message}
                </Typography>
            </DialogContent>

            <DialogActions sx={styles.actions}>
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
                    {submitting ? CONFIRM_DIALOG_CONFIG.texts.submittingText : confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;