import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Tab,
  Tabs,
  TextField
} from '@mui/material';
import React, { useState } from 'react';
import { formatValue } from '../Masks';

const renderMaskedField = (field, value) => {
  let displayValue = value;

  displayValue = formatValue(field, displayValue);

  const fullWidthField = field.type === 'textarea';

  return (
    <Grid item xs={12} sm={fullWidthField ? 12 : 6} key={field.name}>
      <TextField
        label={field.label}
        value={displayValue}
        fullWidth
        multiline={field.type === 'textarea'}
        rows={field.type === 'textarea' ? 3 : 1}
        InputProps={{
          readOnly: true,
          sx: {
            backgroundColor: '#e3f2fd',
            borderRadius: 1,
          },
        }}
        margin="dense"
      />
    </Grid>
  );
};

const DetailDialog = ({ open, onClose, formData, title, titleTab, titleTab2, fields = [], enderecoFields = [] }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const dataFieldsView = (
    <Grid container spacing={2}>
      {fields
        .filter(field => field.name !== 'cod_contato' && field.name !== 'cod_usuario' && field.name !== 'cod_empresa')
        .map(field => renderMaskedField(field, formData?.[field.name]))}
    </Grid>
  );

  const enderecoFieldsView = (
    <Grid container spacing={2}>
      {enderecoFields.map(field => renderMaskedField(field, formData?.endereco?.[field.name]))}
    </Grid>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Tabs value={tabIndex} onChange={(_, newIndex) => setTabIndex(newIndex)} sx={{ mb: 2 }}>
          <Tab label={titleTab} />
          <Tab label={titleTab2} />
        </Tabs>
        <Box>
          {tabIndex === 0 && dataFieldsView}
          {tabIndex === 1 && enderecoFieldsView}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
