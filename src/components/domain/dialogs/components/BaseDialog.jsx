import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
    Box,
    Dialog,
    DialogContent,
    Grid,
    TextField
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { getEntityBehavior } from '../../../../config/entity/entityConfig';
import { useEntityUtils } from '../../../../hooks/useEntityUtils';
import { useMaskUtils } from '../../../../hooks/useMaskUtils';
import useFormSubmit from '../hooks/useFormSubmit';
import { useFormValues } from '../hooks/useFormValues';
import useFotoPreview from '../hooks/useFotoPreview';
import useRequiredChecker from '../hooks/useRequiredChecker';
import useTabManagement from '../hooks/useTabManager';
import DialogHeader from './DialogHeader/DialogHeader';
import DynamicFormField from './DynamicFormField/DynamicFormField';
import FormDialogActions from './FormDialogActions/FormDialogActions';
import ObservacoesField from './ObservacoesField/ObservacoesField';
import PhotoUploader from './PhotoUploader/PhotoUploader';
import TabbedFormLayout from './TabbedFormLayout/TabbedFormLayout';
import DialogTransition from './transition/DialogTransitions';

const DIALOG_MODES = {
    CREATE: 'create',
    EDIT: 'edit',
    VIEW: 'view'
};

const BaseDialog = ({
    open,
    onClose,
    mode = DIALOG_MODES.VIEW,

    formData = {},
    fields = [],
    enderecoFields = [],
    empresaFields = [],

    title,
    titleTab,
    titleTab2,
    entity,
    validationSchema,

    onSubmit,
}) => {
    const [photo, setPhoto] = useState(null);
    const [fotoRemovida, setFotoRemovida] = useState(false);
    const [cepLoading, setCepLoading] = useState(false);

    const isReadOnly = mode === DIALOG_MODES.VIEW;
    const isCreate = mode === DIALOG_MODES.CREATE;
    const isEdit = mode === DIALOG_MODES.EDIT;

    const behavior = getEntityBehavior(entity);
    const hasFoto = behavior.hasPhoto;
    const hasObs = behavior.hasObs;
    const hasEmpresa = behavior.hasEmpresa(isReadOnly);

    const hasEndereco = enderecoFields.length !== 0;

    const { tabIndex, setTabIndex } = useTabManagement({
        open,
        hasEndereco,
        hasEmpresa,
        hasFoto,
        hasObs
    });

    const { getEntityIcon } = useEntityUtils();
    const { formatValue } = useMaskUtils();

    const requiredChecker = useRequiredChecker(validationSchema);

    const formValuesResult = useFormValues({
        fields,
        enderecoFields,
        formData,
        entity
    });

    const formSubmitResult = useFormSubmit({
        entity,
        maskedFields: formValuesResult.maskedFields,
        onSubmit
    });

    const isFieldRequired = !isReadOnly ? requiredChecker : () => false;
    const { values } = !isReadOnly ? formValuesResult : { values: {}, maskedFields: [] };
    const { submitting, handleSubmit } = !isReadOnly ? formSubmitResult : { submitting: false, handleSubmit: null };

    const previewFotoUrl = useFotoPreview(
        photo,
        isEdit && !fotoRemovida ? formData?.foto : (isReadOnly ? formData?.foto : null)
    );

    useEffect(() => {
        if (open) {
            if (isCreate) {
                setPhoto(null);
            }
            setFotoRemovida(false);
        }
    }, [open, isCreate]);

    const getDialogConfig = () => {
        switch (mode) {
            case DIALOG_MODES.CREATE:
                return {
                    icon: <AddIcon />,
                    submitText: 'Criar'
                };
            case DIALOG_MODES.EDIT:
                return {
                    icon: <EditIcon />,
                    submitText: 'Salvar'
                };
            default:
                return {
                    icon: <InfoOutlinedIcon />,
                    submitText: null
                };
        }
    };

    const dialogConfig = getDialogConfig();

    const renderViewField = (field, value, prefix = '') => {
        const displayValue = formatValue(field, value ?? '');

        if (field.type === 'select' && Array.isArray(field.options)) {
            const option = field.options.find(opt => opt.value === value);
            return option?.label ?? value;
        }

        return displayValue;
    };

    const renderViewFields = (fieldList, data = {}, prefix = '') => (
        <Grid container spacing={2} columns={12}>
            {fieldList
                .filter(field => field.name !== 'obs')
                .map(field => {
                    const value = prefix ? data?.[field.name] : formData?.[field.name];
                    return (
                        <Grid
                            key={prefix ? `${prefix}.${field.name}` : field.name}
                            sx={{ gridColumn: field.type === 'textarea' ? 'span 12' : 'span 6' }}
                        >
                            <TextField
                                label={field.label}
                                value={renderViewField(field, value)}
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
                })}
        </Grid>
    );

    const renderEditFields = (fieldList, values, errors, touched, setFieldValue, prefix = '') => (
        <Grid container spacing={2} columns={12}>
            {fieldList
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
                        prefix={prefix}
                    />
                ))}
        </Grid>
    );

    const getTabs = (formikProps = {}) => {
        const { values, errors, touched, setFieldValue } = formikProps;

        return [
            {
                label: titleTab,
                content: isReadOnly
                    ? renderViewFields(fields.filter(f => !['cod_contato', 'cod_usuario', 'cod_empresa'].includes(f.name)), formData)
                    : renderEditFields(fields, values, errors, touched, setFieldValue)
            },
            {
                label: 'Empresa',
                condition: hasEmpresa,
                content: renderViewFields(empresaFields, formData?.empresa, 'empresa')
            },
            {
                label: titleTab2,
                condition: hasEndereco,
                content: isReadOnly
                    ? renderViewFields(enderecoFields, formData?.endereco, 'endereco')
                    : renderEditFields(enderecoFields, values, errors, touched, setFieldValue, 'endereco')
            },
            {
                label: 'Foto',
                condition: hasFoto,
                content: (
                    <PhotoUploader
                        entity={entity}
                        previewUrl={previewFotoUrl}
                        onSelect={isReadOnly ? () => { } : (file) => {
                            setFieldValue?.('foto', file);
                            setPhoto(file);
                        }}
                        onClear={isReadOnly ? () => { } : () => {
                            setFieldValue?.('foto', null);
                            setPhoto(null);
                            setFotoRemovida(true);
                        }}
                        showClear={!isReadOnly}
                        disabled={isReadOnly}
                    />
                )
            },
            {
                label: 'Observações',
                condition: hasObs,
                content: (
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <ObservacoesField
                            value={isReadOnly ? formData?.obs || '' : undefined}
                            readOnly={isReadOnly}
                            standalone={isReadOnly}
                            style={isReadOnly ? {
                                backgroundColor: '#e3f2fd',
                                borderRadius: 1,
                                height: '100%',
                                alignItems: 'flex-start'
                            } : undefined}
                        />
                    </Box>
                )
            }
        ];
    };

    const renderContent = () => {
        if (isReadOnly) {
            return (
                <TabbedFormLayout
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                    sx={{ mb: 2 }}
                    tabs={getTabs()}
                />
            );
        }

        return (
            <Formik
                initialValues={values}
                validationSchema={validationSchema}
                enableReinitialize={isEdit}
                onSubmit={handleSubmit}
            >
                {(formikProps) => (
                    <Form style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Box sx={{ flex: 1, overflow: 'auto' }}>
                            <TabbedFormLayout
                                tabIndex={tabIndex}
                                setTabIndex={setTabIndex}
                                sx={{ mb: 2 }}
                                tabs={getTabs(formikProps)}
                            />
                        </Box>

                        <FormDialogActions
                            onClose={onClose}
                            isSubmitting={formikProps.isSubmitting}
                            submitText={dialogConfig.submitText}
                        />
                    </Form>
                )}
            </Formik>
        );
    };

    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (!isReadOnly && submitting && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
                    return;
                }
                onClose();
            }}
            disableEscapeKeyDown={!isReadOnly && submitting}
            fullWidth
            maxWidth="md"
            TransitionComponent={DialogTransition}
        >
            <DialogHeader
                icon={dialogConfig.icon}
                title={title}
                entityIcon={getEntityIcon(entity)}
                onClose={onClose}
                submitting={!isReadOnly && submitting}
            />

            <DialogContent
                dividers
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    padding: 0,
                    height: '500px'
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    padding: 3
                }}>
                    {renderContent()}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export { DIALOG_MODES };
export default BaseDialog;