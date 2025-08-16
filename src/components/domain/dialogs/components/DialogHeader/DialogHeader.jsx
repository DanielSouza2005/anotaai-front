import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react';
import { DIALOG_HEADER_CONFIG, getDialogHeaderStyles } from './styles/DialogHeaderStyles';

const DialogHeader = ({
    icon,
    title,
    entityIcon,
    onClose,
    submitting
}) => {
    const theme = useTheme();
    const styles = getDialogHeaderStyles(theme);

    return (
        <>
            <IconButton
                aria-label={DIALOG_HEADER_CONFIG.texts.closeAriaLabel}
                onClick={() => {
                    if (!submitting) onClose();
                }}
                disabled={submitting}
                sx={styles.closeButton}
            >
                <CloseIcon />
            </IconButton>

            <DialogTitle sx={styles.title}>
                {React.cloneElement(icon, {
                    color: DIALOG_HEADER_CONFIG.colors.iconColor,
                    sx: styles.mainIcon
                })}
                {entityIcon}
                <Typography variant="h6" component="span">
                    {title}
                </Typography>
            </DialogTitle>
        </>
    );
};

export default DialogHeader;