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
  Typography
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { cleanValuesForAPI } from '../../../utils/FieldCleaner';
import { getEntityIcon } from '../../../utils/entityUtils';
import DynamicFormField from './components/DynamicFormField';
import ObservacoesField from './components/ObservacoesField';
import PhotoUploader from './components/PhotoUploader';
import TabPanel from './components/TabPanel';
import { useFormValues } from './hooks/useFormValues';
import useFotoPreview from './hooks/useFotoPreview';
import useRequiredChecker from './hooks/useRequiredChecker';
import useTabManagement from './hooks/useTabManager';
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
  const [submitting, setSubmitting] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);

  const [photo, setPhoto] = useState(null);
  const previewImage = useFotoPreview(photo);

  const hasEndereco = enderecoFields.length !== 0;
  const hasFoto = usaFoto;
  const hasObs = entity === "contato";
  const hasEmpresa = entity === "contato";

  const {
    tabIndex,
    setTabIndex,
    enderecoTabIndex,
    obsTabIndex,
    fotoTabIndex
  } = useTabManagement({ open, hasEndereco, hasEmpresa, hasFoto, hasObs });

  const isFieldRequired = useRequiredChecker(validationSchema);

  const { values: initialValues, maskedFields } = useFormValues({ fields, enderecoFields, formData, entity });

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

          const finish = () => setSubmitting(false);

          if (entity === "contato" || entity === "usuario") {
            const { foto } = values;
            const rest = cleanValuesForAPI(values, maskedFields);
            delete rest.foto;

            const payload = {
              dados: rest,
              foto: foto || null,
            };
            onCreate(payload, formikBag, finish);
          }
          else {
            let cleanValues = cleanValuesForAPI(values, maskedFields);
            onCreate(cleanValues, formikBag, finish);
          }
        }}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => {

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

                <TabPanel value={tabIndex} index={0}>
                  <Grid container spacing={2} columns={12}>
                    {fields
                      .filter(field => field.name !== 'obs')
                      .map(field =>
                        <DynamicFormField
                          key={field.name}
                          field={field}
                          values={values}
                          errors={errors}
                          touched={touched}
                          setFieldValue={setFieldValue}
                          isFieldRequired={isFieldRequired}
                          cepLoading={cepLoading}
                          setCepLoading={setCepLoading}
                          readOnly={field.readonly}
                        />
                      )
                    }
                  </Grid>
                </TabPanel>

                {hasEndereco && (
                  <TabPanel value={tabIndex} index={enderecoTabIndex}>
                    <Grid container spacing={2} columns={12}>
                      {enderecoFields
                        .filter(field => field.name !== 'obs')
                        .map(field =>
                          <DynamicFormField
                            key={field.name}
                            field={field}
                            values={values}
                            errors={errors}
                            touched={touched}
                            setFieldValue={setFieldValue}
                            isFieldRequired={isFieldRequired}
                            cepLoading={cepLoading}
                            setCepLoading={setCepLoading}
                            readOnly={field.readonly}
                            prefix={'endereco'}
                          />
                        )
                      }
                    </Grid>
                  </TabPanel>
                )}

                {hasFoto && (
                  <TabPanel value={tabIndex} index={fotoTabIndex}>
                    <PhotoUploader
                      entity={entity}
                      previewUrl={previewImage}
                      onSelect={(file) => {
                        setFieldValue('foto', file);
                        setPhoto(file);
                      }}
                      onClear={() => {
                        setFieldValue('foto', null);
                        setPhoto(null);
                      }}
                    />
                  </TabPanel>
                )}

                {hasObs && (
                  <TabPanel value={tabIndex} index={obsTabIndex}>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <ObservacoesField />
                    </Box>
                  </TabPanel>
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
