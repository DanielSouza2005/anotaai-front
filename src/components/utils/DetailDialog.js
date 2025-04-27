import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, TextField
} from '@mui/material';

const DetailDialog = ({ open, onClose, formData, title }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title || 'Detalhes do Registro'}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {Object.entries(formData).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value || ''}
                fullWidth
                InputProps={{
                  readOnly: true,
                  sx: {
                    backgroundColor: '#e3f2fd', 
                    '& .MuiInputBase-input': {
                      backgroundColor: '#e3f2fd', 
                    }
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailDialog;
