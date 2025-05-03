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
import { formatValue } from '../../../utils/Masks';

const renderMaskedField = (field, value) => {
  let displayValue = formatValue(field, value ?? '');

  if (field.type === 'select' && Array.isArray(field.options)) {
    const option = field.options.find(opt => opt.value === value);
    displayValue = option?.label ?? value;
  }

  return (
    <Grid
      key={field.name}
      sx={{ gridColumn: field.type === 'textarea' ? 'span 12' : 'span 6' }}
    >
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

const DetailDialog = ({
  open,
  onClose,
  formData,
  title,
  titleTab,
  titleTab2,
  fields = [],
  enderecoFields = [],
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const filteredFields = fields.filter(
    f => !['cod_contato', 'cod_usuario', 'cod_empresa'].includes(f.name)
  );

  const renderFields = (fieldList, data = {}) => (
    <Grid container spacing={2} columns={12}>
      {fieldList.map(field =>
        renderMaskedField(field, data?.[field.name])
      )}
    </Grid>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Tabs
          value={tabIndex}
          onChange={(_, newIndex) => setTabIndex(newIndex)}
          sx={{ mb: 2 }}
        >
          <Tab label={titleTab} />
          <Tab label={titleTab2} />
        </Tabs>

        <Box>
          {tabIndex === 0 && renderFields(filteredFields, formData)}
          {tabIndex === 1 && renderFields(enderecoFields, formData?.endereco)}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
