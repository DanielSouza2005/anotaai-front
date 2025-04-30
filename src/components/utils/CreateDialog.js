import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Tab,
  Tabs,
  TextField
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import convertEmptyStringsToNull from './FieldCleaner';

const CreateDialog = ({
  open,
  onClose,
  onCreate,
  formData = {},
  fields,
  enderecoFields,
  title = 'Novo Contato',
  titleTab = 'Contato',
  titleTab2 = 'Endereço',
  validationSchema
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const initialValues = {
    ...fields.reduce((acc, f) => ({ ...acc, [f.name]: formData[f.name] || '' }), {}),
    endereco: enderecoFields.reduce((acc, f) => ({
      ...acc,
      [f.name]: formData?.endereco?.[f.name] || '',
    }), {}),
  };

  const renderField = (field, values, errors, touched, prefix = '') => {
    const fullName = prefix ? `${prefix}.${field.name}` : field.name;
    const error = prefix ? errors[prefix]?.[field.name] : errors[field.name];
    const isTouched = prefix ? touched[prefix]?.[field.name] : touched[field.name];

    return (
      <Grid item xs={12} sm={field.type === 'textarea' ? 12 : 6} key={fullName}>
        <Field
          name={fullName}
          as={TextField}
          label={field.label}
          fullWidth
          multiline={field.type === 'textarea'}
          rows={field.type === 'textarea' ? 3 : 1}
          type={field.type === 'email' ? 'email' : field.type === 'date' ? 'date' : 'text'}
          margin="dense"
          error={Boolean(isTouched && error)}
          helperText={isTouched && error}
          InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
        />
      </Grid>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikBag) => {
          const cleanValues = convertEmptyStringsToNull(values);
          onCreate(cleanValues, formikBag);
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
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

              {tabIndex === 0 && (
                <Grid container spacing={2}>
                  {fields.map(field =>
                    renderField(field, values, errors, touched)
                  )}
                </Grid>
              )}

              {tabIndex === 1 && (
                <Grid container spacing={2}>
                  {enderecoFields.map(field =>
                    renderField(field, values, errors, touched, 'endereco')
                  )}
                </Grid>
              )}
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose}>Cancelar</Button>
              <Button variant="contained" type="submit">Criar</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreateDialog;
