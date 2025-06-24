import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import convertEmptyStringsToNull from '../../../utils/FieldCleaner';
import { fetchEnderecoByCEP } from '../../../utils/cepUtils';
import SelectField from '../select/SelectField';

const EditDialog = ({
  open,
  onClose,
  onSave,
  formData = {},
  fields,
  enderecoFields,
  title,
  titleTab,
  titleTab2,
  validationSchema,
  entity,
  usaFoto = false
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const fileInputRef = useRef();
  const [previewFotoUrl, setPreviewFotoUrl] = useState(formData?.foto || null);
  const [photo, setPhoto] = useState(null);

  const hasEndereco = enderecoFields.length !== 0;
  const hasFoto = usaFoto;
  const enderecoTabIndex = hasEndereco ? 1 : -1;
  const fotoTabIndex = hasEndereco ? (hasFoto ? 2 : -1) : (hasFoto ? 1 : -1);

  const initialValues = {
    ...fields.reduce((acc, f) => ({ ...acc, [f.name]: formData[f.name] || '' }), {}),
    endereco: enderecoFields.reduce((acc, f) => ({
      ...acc,
      [f.name]: formData?.endereco?.[f.name] || '',
    }), {}),
    foto: null,
  };

  useEffect(() => {
    return () => {
      if (previewFotoUrl && previewFotoUrl !== formData?.foto) {
        URL.revokeObjectURL(previewFotoUrl);
      }
    };
  }, [previewFotoUrl, formData?.foto]);

  useEffect(() => {
    if (photo) {
      const objectUrl = URL.createObjectURL(photo);
      setPreviewFotoUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else if (formData?.foto && typeof formData.foto === "string") {
      setPreviewFotoUrl(formData.foto);
    } else {
      setPreviewFotoUrl(null);
    }
  }, [photo, formData?.foto]);

  const renderField = (field, values, errors, touched, setFieldValue, prefix = '') => {
    const fullName = prefix ? `${prefix}.${field.name}` : field.name;
    const error = prefix ? errors[prefix]?.[field.name] : errors[field.name];
    const isTouched = prefix ? touched[prefix]?.[field.name] : touched[field.name];
    const isReadOnly = field.readonly === true;

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
          InputProps={{
            readOnly: isReadOnly,
            sx: {
              backgroundColor: isReadOnly ? '#e3f2fd' : '#ffffff',
              borderRadius: 1,
            },
          }}
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
        enableReinitialize
        onSubmit={(values, formikBag) => {
          if (entity === "contato" || entity === "usuario") {
            const { foto } = values;
            const rest = convertEmptyStringsToNull(values);
            delete rest.foto;

            const payload = {
              dados: rest,
              foto: foto || null,
            };
            onSave(payload, formikBag);
          } else {
            const cleanValues = convertEmptyStringsToNull(values);
            onSave(cleanValues, formikBag);
          }
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <IconButton
              aria-label="Fechar"
              onClick={onClose}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>

            <DialogTitle>{title}</DialogTitle>

            <DialogContent dividers>
              <Tabs
                value={tabIndex}
                onChange={(_, newIndex) => setTabIndex(newIndex)}
                sx={{ mb: 2 }}
              >
                <Tab label={titleTab} />
                {hasEndereco && <Tab label={titleTab2} />}
                {hasFoto && <Tab label="Foto" />}
              </Tabs>

              {tabIndex === 0 && (
                <Grid container spacing={2} columns={12}>
                  {fields.map(field =>
                    renderField(field, values, errors, touched, setFieldValue)
                  )}
                </Grid>
              )}

              {tabIndex === enderecoTabIndex && hasEndereco && (
                <Grid container spacing={2} columns={12}>
                  {enderecoFields.map(field =>
                    renderField(field, values, errors, touched, setFieldValue, 'endereco')
                  )}
                </Grid>
              )}

              {tabIndex === fotoTabIndex && hasFoto && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item>
                        {
                          entity === "usuario" ?
                            (
                              <Avatar
                                alt="Nova foto"
                                src={previewFotoUrl}
                                sx={{ width: 96, height: 96 }}
                              />
                            ) : (
                              <Box mt={2}>
                                <img
                                  src={previewFotoUrl}
                                  alt="Preview da Foto"
                                  style={{ maxWidth: '100%', maxHeight: 200 }}
                                />
                              </Box>
                            )
                        }
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Button variant="outlined" component="label">
                      Escolher nova foto
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          if (file) {
                            setFieldValue("foto", file);
                            setPhoto(file);
                            const previewUrl = URL.createObjectURL(file);
                            setPreviewFotoUrl(previewUrl);
                          } else {
                            setFieldValue("foto", null);
                            setPhoto(null);
                            setPreviewFotoUrl(null);
                          }
                        }}
                      />
                    </Button>
                    {values.foto && (
                      <Typography variant="body2" mt={1}>
                        Arquivo selecionado: {values.foto.name}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              )}
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose}>Cancelar</Button>
              <Button variant="contained" type="submit">Salvar</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditDialog;