import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, TextField, Checkbox, FormControlLabel
} from '@mui/material';

const EditDialog = ({ open, onClose, onSave, formData, onChange, fields, title }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title || 'Editar'}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {fields.map(({ name, label, type = 'text', xs = 12, sm = 6 }) => (
            <Grid item xs={xs} sm={sm} key={name}>
              {type === 'checkbox' ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!formData[name]}
                      onChange={(e) => onChange({ target: { name, value: e.target.checked } })}
                      name={name}
                    />
                  }
                  label={label}
                />
              ) : (
                <TextField
                  label={label}
                  name={name}
                  value={formData[name] || ''}
                  onChange={onChange}
                  fullWidth
                  type={type}
                  multiline={type === 'textarea'}
                  rows={type === 'textarea' ? 3 : undefined}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={onSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
