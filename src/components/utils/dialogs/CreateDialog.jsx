import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Dialog,
  DialogContent,
  Grid
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import DialogHeader from './components/DialogHeader';
import DynamicFormField from './components/DynamicFormField';
import FormDialogActions from './components/FormDialogActions';
import ObservacoesField from './components/ObservacoesField';
import PhotoUploader from './components/PhotoUploader';
import TabbedFormLayout from './components/TabbedFormLayout';
import useFormSubmit from './hooks/useFormSubmit';
import { useFormValues } from './hooks/useFormValues';
import useFotoPreview from './hooks/useFotoPreview';
import useRequiredChecker from './hooks/useRequiredChecker';
import useTabManagement from './hooks/useTabManager';
import DialogTransition from './transition/DialogTransitions';
import { useEntityUtils } from '../../../hooks/useEntityUtils';

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
  } = useTabManagement({ open, hasEndereco, hasEmpresa, hasFoto, hasObs });

  const isFieldRequired = useRequiredChecker(validationSchema);
  const { values: initialValues, maskedFields } = useFormValues({ fields, enderecoFields, formData, entity });
  const { getEntityIcon } = useEntityUtils();

  const { submitting, handleSubmit } = useFormSubmit({
    entity,
    maskedFields,
    onSubmit: onCreate
  });

  useEffect(() => {
    if (open) {
      setPhoto(null);
    }
  }, [open]);

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
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => {
          return (
            <Form>
              <DialogHeader
                icon={<AddIcon />}
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

              <FormDialogActions
                onClose={onClose}
                isSubmitting={isSubmitting}
                submitText="Criar"
              />
            </Form>
          )
        }}
      </Formik>
    </Dialog>
  );
};

export default CreateDialog;