import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { cleanValuesForAPI } from '../../../utils/FieldCleaner';
import { getEntityIcon } from '../../../utils/entityUtils';
import DialogHeader from './components/DialogHeader';
import DynamicFormField from './components/DynamicFormField';
import ObservacoesField from './components/ObservacoesField';
import PhotoUploader from './components/PhotoUploader';
import TabbedFormLayout from './components/TabbedFormLayout';
import { useFormValues } from './hooks/useFormValues';
import useFotoPreview from './hooks/useFotoPreview';
import useRequiredChecker from './hooks/useRequiredChecker';
import useTabManagement from './hooks/useTabManager';
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
  const [photo, setPhoto] = useState(null);
  const [fotoRemovida, setFotoRemovida] = useState(false);
  const previewFotoUrl = useFotoPreview(photo, !fotoRemovida ? formData?.foto : null);

  const [submitting, setSubmitting] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);

  const hasEndereco = enderecoFields.length !== 0;
  const hasFoto = usaFoto;
  const hasObs = entity === "contato";
  const hasEmpresa = entity === "contato";

  const {
    tabIndex,
    setTabIndex,
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
            <DialogHeader
              icon={<EditIcon />}
              title={title}
              entityIcon={getEntityIcon(entity)}
              onClose={onClose}
              submitting={submitting}
            />

            <DialogContent
              dividers
              sx={{
                minHeight: 450,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              <TabbedFormLayout
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
                sx={{ mb: 2 }}
                tabs={[
                  {
                    label: titleTab,
                    content: (
                      <Grid container spacing={2} columns={12}>
                        {fields
                          .filter(field => field.name !== 'obs')
                          .map(field => (
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
                          ))}
                      </Grid>
                    )
                  },
                  {
                    label: titleTab2,
                    condition: hasEndereco,
                    content: (
                      <Grid container spacing={2} columns={12}>
                        {enderecoFields
                          .filter(field => field.name !== 'obs')
                          .map(field => (
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
                              prefix="endereco"
                            />
                          ))}
                      </Grid>
                    )
                  },
                  {
                    label: 'Foto',
                    condition: hasFoto,
                    content: (
                      <PhotoUploader
                        entity={entity}
                        previewUrl={previewFotoUrl}
                        onSelect={(file) => {
                          setFieldValue('foto', file);
                          setPhoto(file);
                        }}
                        onClear={() => {
                          setFieldValue('foto', null);
                          setPhoto(null);
                          setFotoRemovida(true);
                        }}
                      />
                    )
                  },
                  {
                    label: 'Observações',
                    condition: hasObs,
                    content: (
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <ObservacoesField />
                      </Box>
                    )
                  }
                ]}
              />
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
