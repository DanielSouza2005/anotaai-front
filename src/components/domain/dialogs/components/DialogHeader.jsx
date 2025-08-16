import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, IconButton, Typography } from '@mui/material';
import React from 'react';

const DialogHeader = ({ icon, title, entityIcon, onClose, submitting }) => (
    <>
        <IconButton
            aria-label="Fechar"
            onClick={() => {
                if (!submitting) onClose();
            }}
            disabled={submitting}
            sx={{ position: 'absolute', right: 8, top: 8 }}
        >
            <CloseIcon />
        </IconButton>

        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
            {React.cloneElement(icon, { color: 'primary', sx: { fontSize: 32, mr: 1 } })}
            {entityIcon}
            <Typography variant="h6" component="span">
                {title}
            </Typography>
        </DialogTitle>
    </>
);

export default DialogHeader;
