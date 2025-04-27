import React, { useCallback } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, TextField, Checkbox, FormControlLabel
} from '@mui/material';

const CreateDialog = ({ open, onClose, onCreate, formData, onChange, fields, title }) => {

  const handleChange = useCallback(
    (e) => {
      const { name, value, checked, type } = e.target;
      const newValue = type === 'checkbox' ? checked : value;
      onChange({ target: { name, value: newValue } });
    },
    [onChange]
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title || 'Novo Registro'}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {fields.map(({ name, label, type = 'text', xs = 12, sm = 6 }) => (
            <Grid item xs={xs} sm={sm} key={name}>
              {type === 'checkbox' ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!formData[name]}
                      onChange={handleChange}
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
        <Button variant="contained" onClick={onCreate}>Criar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDialog;
