import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import {
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
  Typography
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import convertEmptyStringsToNull from '../../../utils/FieldCleaner';
import { fetchEnderecoByCEP } from '../../../utils/cepUtils';
import { getEntityIcon } from '../../../utils/entityUtils';
import SelectField from '../select/SelectField';
import DialogTransition from './transition/DialogTransitions';

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
  entity,
  usaFoto = false
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const hasEndereco = enderecoFields.length !== 0;
  const hasFoto = usaFoto;
  const hasObs = entity === "contato";

  const enderecoTabIndex = hasEndereco ? 1 : -1;
  const fotoTabIndex = hasEndereco
    ? (hasFoto ? 2 : -1)
    : (hasFoto ? 1 : -1);

  const obsTabIndex = (() => {
    if (!hasObs) return -1;

    if (hasEndereco && hasFoto) return 3;
    if (hasEndereco || hasFoto) return 2;
    return 1;
  })();

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
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  useEffect(() => {
    if (photo) {
      const objectUrl = URL.createObjectURL(photo);
      setPreviewImage(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewImage(null);
    }
  }, [photo]);

  useEffect(() => {
    if (open) {
      setTabIndex(0);
    }
  }, [open]);

  const renderField = (field, values, errors, touched, setFieldValue, prefix = '') => {
    const fullName = prefix ? `${prefix}.${field.name}` : field.name;
    const error = prefix ? errors[prefix]?.[field.name] : errors[field.name];
    const isTouched = prefix ? touched[prefix]?.[field.name] : touched[field.name];
    const isRequired = validationSchema?.fields?.[prefix || fullName]?.tests?.some(test => test.OPTIONS?.name === 'required');

    const label = (
      <span>
        {field.label}
        {isRequired && <span style={{ color: 'red' }}> *</span>}
      </span>
    );

    if (field.type === 'select' && field.source) {
      return (
        <Grid key={fullName} sx={{ gridColumn: 'span 6' }}>
          <SelectField
            name={fullName}
            label={label}
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
          label={label}
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
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (submitting && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
          return;
        }
        onClose();
      }}
      disableEscapeKeyDown={submitting}
      maxWidth="md"
      fullWidth
      TransitionComponent={DialogTransition}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikBag) => {
          setSubmitting(true);

          const finish = () => {
            setSubmitting(false);
          };

          if (entity === "contato" || entity === "usuario") {
            const { foto } = values;
            const rest = convertEmptyStringsToNull(values);
            delete rest.foto;

            const payload = {
              dados: rest,
              foto: foto || null,
            };
            onCreate(payload, formikBag, finish);
          }
          else {
            let cleanValues = convertEmptyStringsToNull(values);
            onCreate(cleanValues, formikBag, finish);
          }
        }}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => {

          const clearPhoto = () => {
            setFieldValue('foto', null);
            setPhoto(null);
          };

          return (
            <Form>
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
                <AddIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
                {getEntityIcon(entity)}
                <Typography variant="h6" component="div">
                  {title}
                </Typography>
              </DialogTitle>

              <DialogContent
                dividers
                sx={{
                  minHeight: 450,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start'
                }}
              >
                <Tabs value={tabIndex} sx={{ mb: 2 }} onChange={(_, newIndex) => setTabIndex(newIndex)}>
                  <Tab label={titleTab} />
                  {hasEndereco && <Tab label={titleTab2} />}
                  {hasFoto && <Tab label="Foto" />}
                  {entity === "contato" && (
                    <Tab label="Observações" />
                  )}
                </Tabs>

                {tabIndex === 0 && (
                  <Grid container spacing={2} columns={12}>
                    {fields
                      .filter(field => field.name !== 'obs')
                      .map(field =>
                        renderField(field, values, errors, touched, setFieldValue)
                      )
                    }
                  </Grid>
                )}

                {tabIndex === enderecoTabIndex && hasEndereco && (
                  <Grid container spacing={2} columns={12}>
                    {enderecoFields
                      .filter(field => field.name !== 'obs')
                      .map(field =>
                        renderField(field, values, errors, touched, setFieldValue, 'endereco')
                      )
                    }
                  </Grid>
                )}

                {tabIndex === fotoTabIndex && hasFoto && (
                  <Grid container spacing={2} columns={12}>
                    <Grid item xs={12}>
                      <input
                        accept="image/*"
                        id="upload-photo"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (e.currentTarget.files && e.currentTarget.files[0]) {
                            const file = e.currentTarget.files[0];
                            setFieldValue('foto', file);
                            setPhoto(file);
                          }
                        }}
                      />
                      <label htmlFor="upload-photo">
                        <Button variant="contained" component="span">
                          Selecionar Foto
                        </Button>
                      </label>
                      {values.foto && (
                        <>
                          <Button
                            color="secondary"
                            onClick={clearPhoto}
                            sx={{ ml: 2 }}
                          >
                            Limpar Foto
                          </Button>
                          <Box mt={2}>
                            <img
                              src={previewImage}
                              alt="Preview da Foto"
                              style={{ maxWidth: '100%', maxHeight: 200 }}
                            />
                          </Box>
                        </>
                      )}
                    </Grid>
                  </Grid>
                )}

                {entity === "contato" && tabIndex === obsTabIndex && (
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Field
                      name="obs"
                    >
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          label="Observações"
                          fullWidth
                          multiline
                          minRows={10}
                          error={Boolean(meta.touched && meta.error)}
                          helperText={meta.touched && meta.error}
                          sx={{ flex: 1 }}
                        />
                      )}
                    </Field>
                  </Box>
                )}

              </DialogContent>

              <DialogActions>
                <Button onClick={onClose} disabled={submitting}>
                  Cancelar
                </Button>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  color="primary"
                  loading={isSubmitting}
                >
                  Criar
                </LoadingButton>
              </DialogActions>
            </Form>
          )
        }}
      </Formik>
    </Dialog >
  );
};

export default CreateDialog;
