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
import { useState } from 'react';
import convertEmptyStringsToNull from '../../../utils/FieldCleaner';
import { fetchEnderecoByCEP } from '../../../utils/cepUtils';
import SelectField from '../select/SelectField';

const CreateDialog = ({
  open,
  onClose,
  onCreate,
  formData = {},
  fields,
  enderecoFields,
  title,
  titleTab,
  titleTab2,
  validationSchema,
  entity
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const initialValues = {
    ...fields.reduce((acc, f) => ({ ...acc, [f.name]: formData[f.name] || '' }), {}),
    endereco: enderecoFields.reduce((acc, f) => ({
      ...acc,
      [f.name]: formData?.endereco?.[f.name] || '',
    }), {}),
    foto: null,
  };

  const renderField = (field, values, errors, touched, setFieldValue, prefix = '') => {
    const fullName = prefix ? `${prefix}.${field.name}` : field.name;
    const error = prefix ? errors[prefix]?.[field.name] : errors[field.name];
    const isTouched = prefix ? touched[prefix]?.[field.name] : touched[field.name];

    if (field.type === 'select' && field.source) {
      return (
        <Grid key={fullName} sx={{ gridColumn: 'span 6' }}>
          <SelectField
            name={fullName}
            label={field.label}
            source={field.source}
            displayField={field.displayField}
            error={error}
            touched={isTouched}
          />
        </Grid>
      );
    }

    return (
      <Grid
        key={fullName}
        sx={{ gridColumn: field.type === 'textarea' ? 'span 12' : 'span 6' }}
      >
        <Field
          name={fullName}
          as={TextField}
          label={field.label}
          fullWidth
          value={values?.[prefix]?.[field.name] ?? values?.[field.name] ?? ''}
          multiline={field.type === 'textarea'}
          rows={field.type === 'textarea' ? 3 : 1}
          type={field.type}
          margin="dense"
          error={Boolean(isTouched && error)}
          helperText={isTouched && error}
          InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
          onBlur={async (e) => {
            if (field.name === 'cep') {
              const endereco = await fetchEnderecoByCEP(e.target.value);
              if (endereco) {
                setFieldValue('endereco.pais', 'Brasil');
                setFieldValue('endereco.rua', endereco.logradouro || values.endereco.rua);
                setFieldValue('endereco.bairro', endereco.bairro || values.endereco.bairro);
                setFieldValue('endereco.cidade', endereco.cidade || values.endereco.cidade);
                setFieldValue('endereco.uf', endereco.uf || values.endereco.uf);
                setFieldValue('endereco.complemento', endereco.complemento || values.endereco.complemento);
              }
            }
          }}
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
          if (entity === "contato" || entity === "usuario") {
            const { foto, ...rest } = convertEmptyStringsToNull(values);
            const payload = {
              dados: rest,
              foto: foto || null,
            };
            onCreate(payload, formikBag);
          }
          else {
            let cleanValues = convertEmptyStringsToNull(values);
            onCreate(cleanValues, formikBag);
          }
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
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
                <Grid container spacing={2} columns={12}>
                  {fields.map(field =>
                    renderField(field, values, errors, touched, setFieldValue)
                  )}
                </Grid>
              )}

              {tabIndex === 1 && (
                <Grid container spacing={2} columns={12}>
                  {enderecoFields.map(field =>
                    renderField(field, values, errors, touched, setFieldValue, 'endereco')
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
