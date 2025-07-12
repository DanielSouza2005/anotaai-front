import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
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
  Typography
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { cleanValuesForAPI } from '../../../utils/FieldCleaner';
import { maskTypes } from '../../../utils/Masks';
import { fetchEnderecoByCEP } from '../../../utils/cepUtils';
import { getEntityIcon, getEntityIdKey } from '../../../utils/entityUtils';
import MaskedInput from '../../maskedInput/MaskedInput';
import SelectField from '../select/SelectField';
import DialogTransition from './transition/DialogTransitions';

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
  const [previewFotoUrl, setPreviewFotoUrl] = useState(formData?.foto || null);
  const [photo, setPhoto] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const hasEndereco = enderecoFields.length !== 0;
  const hasFoto = usaFoto;
  const hasObs = entity === "contato";

  const enderecoTabIndex = hasEndereco ? 1 : -1;
  const fotoTabIndex = hasEndereco ? (hasFoto ? 2 : -1) : (hasFoto ? 1 : -1);
  const obsTabIndex = (() => {
    if (!hasObs) return -1;

    if (hasEndereco && hasFoto) return 3;
    if (hasEndereco || hasFoto) return 2;
    return 1;
  })();

  const idKey = entity === "contato" ? "empresa" : "";

  const initialValues = {
    ...fields.reduce((acc, f) => ({
      ...acc,
      [f.name]: f.type === 'select' && f.source
        ? formData[idKey]?.[getEntityIdKey(f.source)] || ''
        : formData[f.name] || ''
    }), {}),
    endereco: enderecoFields.reduce((acc, f) => ({
      ...acc,
      [f.name]: formData?.endereco?.[f.name] || '',
    }), {}),
    foto: null,
    obs: formData.obs || ''
  };

  useEffect(() => {
    if (open) {
      setPhoto(null);

      if (formData?.foto && typeof formData.foto === "string") {
        setPreviewFotoUrl(formData.foto);
      } else {
        setPreviewFotoUrl(null);
      }
    }
  }, [open, formData]);

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

  useEffect(() => {
    if (open) {
      setTabIndex(0);
    }
  }, [open]);

  const maskedFields = useMemo(() => {
    const fieldsList = [
      ...fields.filter(f => maskTypes.includes(f.name) || maskTypes.includes(f.mask))
        .map(f => f.name),
      ...enderecoFields.filter(f => maskTypes.includes(f.name) || maskTypes.includes(f.mask))
        .map(f => `endereco.${f.name}`)
    ];
    return fieldsList;
  }, [fields, enderecoFields]);

  const isRequired = (fieldName, prefix = '') => {
    try {
      const path = prefix ? `${prefix}.${fieldName}` : fieldName;
      const fieldSchema = validationSchema?.describe()?.fields;

      const keys = path.split('.');
      let current = fieldSchema;

      for (const key of keys) {
        if (!current[key]) return false;
        current = current[key].fields || current[key];
      }

      return current?.tests?.some(test => test.name === 'required') ?? false;
    } catch {
      return false;
    }
  };

  const renderField = (field, values, errors, touched, setFieldValue, prefix = '') => {
    const fullName = prefix ? `${prefix}.${field.name}` : field.name;
    const error = prefix ? errors[prefix]?.[field.name] : errors[field.name];
    const isTouched = prefix ? touched[prefix]?.[field.name] : touched[field.name];
    const isReadOnly = field.readonly === true;

    const label = (
      <>
        {field.label}
        {isRequired(field.name, prefix) && (
          <Typography component="span" color="error"> *</Typography>
        )}
      </>
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

    const needsMask = maskTypes.includes(field.name) || maskTypes.includes(field.mask);

    if (needsMask) {
      return (
        <Grid key={fullName} sx={{ gridColumn: 'span 6' }}>
          <MaskedInput
            name={fullName}
            mask={field.mask || field.name}
            label={label}
            fullWidth
            margin="dense"
            readOnly={isReadOnly}
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
        enableReinitialize
        onSubmit={(values, formikBag) => {
          setSubmitting(true);

          const finish = () => {
            setSubmitting(false);
          };

          if (entity === "contato" || entity === "usuario") {
            const { foto } = values;
            const rest = cleanValuesForAPI(values, maskedFields);
            delete rest.foto;

            const payload = {
              dados: rest,
              foto: foto || null,
            };
            onSave(payload, formikBag, finish);
          } else {
            const cleanValues = cleanValuesForAPI(values, maskedFields);
            onSave(cleanValues, formikBag, finish);
          }
        }}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
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
              <EditIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
              {getEntityIcon(entity)}
              <Typography variant="h6" component="span">{title}</Typography>
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
              <Tabs
                value={tabIndex}
                onChange={(_, newIndex) => setTabIndex(newIndex)}
                sx={{ mb: 2 }}
              >
                <Tab label={titleTab} />
                {hasEndereco && <Tab label={titleTab2} />}
                {hasFoto && <Tab label="Foto" />}
                {hasObs && <Tab label="Observações" />}
              </Tabs>

              {tabIndex === 0 && (
                <Grid container spacing={2} columns={12}>
                  {fields
                    .filter(field => field.name !== 'obs')
                    .map(field =>
                      renderField(field, values, errors, touched, setFieldValue)
                    )}
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
                          const objectUrl = URL.createObjectURL(file);
                          setPreviewFotoUrl(objectUrl);
                        }
                      }}
                    />
                    <label htmlFor="upload-photo">
                      <Button variant="contained" component="span">
                        Selecionar Foto
                      </Button>
                    </label>

                    {(photo || previewFotoUrl) && (
                      <>
                        <Button
                          color="secondary"
                          onClick={() => {
                            setFieldValue('foto', null);
                            setPhoto(null);
                            setPreviewFotoUrl(null);
                          }}
                          sx={{ ml: 2 }}
                        >
                          Limpar Foto
                        </Button>

                        <Box mt={2}>
                          {entity === 'usuario' ? (
                            <Avatar
                              alt="Foto"
                              src={previewFotoUrl}
                              sx={{ width: 96, height: 96 }}
                            />
                          ) : (
                            <img
                              src={previewFotoUrl}
                              alt="Preview da Foto"
                              style={{ maxWidth: '100%', maxHeight: 200 }}
                            />
                          )}
                        </Box>
                      </>
                    )}
                  </Grid>
                </Grid>
              )}

              {hasObs && tabIndex === obsTabIndex && (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Field name="obs">
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
              <Button
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <LoadingButton
                variant="contained"
                type="submit"
                color="primary"
                loading={isSubmitting}
              >
                Salvar
              </LoadingButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditDialog;
