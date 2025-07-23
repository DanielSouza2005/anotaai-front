import { CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { Field } from 'formik';
import { maskTypes } from '../../../../utils/Masks';
import MaskedInput from '../../maskedInput/MaskedInput';
import SelectField from '../../select/SelectField';
import useCEPAutoComplete from '../hooks/useCEPAutoComplete';

const DynamicFormField = ({
    field,
    prefix = '',
    values,
    errors,
    touched,
    setFieldValue,
    isFieldRequired,
    cepLoading = false,
    setCepLoading,
    readOnly = false
}) => {
    const fullName = prefix ? `${prefix}.${field.name}` : field.name;
    const error = prefix ? errors[prefix]?.[field.name] : errors[field.name];
    const isTouched = prefix ? touched[prefix]?.[field.name] : touched[field.name];
    const isRequired = isFieldRequired(field.name, prefix);

    const label = (
        <span>
            {field.label}
            {isRequired && <Typography component="span" color="error"> *</Typography>}
        </span>
    );

    const isMasked = maskTypes.includes(field.name) || maskTypes.includes(field.mask);
    const isSelect = field.type === 'select' && field.source;

    const { handleCEP } = useCEPAutoComplete(prefix, setFieldValue, values, cepLoading, setCepLoading);

    if (isSelect) {
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

    if (isMasked) {
        return (
            <Grid key={fullName} sx={{ gridColumn: 'span 6' }}>
                <MaskedInput
                    name={fullName}
                    mask={field.mask || field.name}
                    label={label}
                    fullWidth
                    margin="dense"
                    readOnly={readOnly}
                    onBlur={handleCEP}
                />
            </Grid>
        );
    }

    return (
        <Grid key={fullName} sx={{ gridColumn: field.type === 'textarea' ? 'span 12' : 'span 6' }}>
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
                    readOnly,
                    sx: readOnly ? {
                        backgroundColor: '#e3f2fd',
                        borderRadius: 1
                    } : undefined,
                    ...(prefix === 'endereco' && cepLoading && {
                        endAdornment: <CircularProgress size={20} sx={{ mr: 1 }} />
                    })
                }}
                onBlur={handleCEP}
            />
        </Grid>
    );
};

export default DynamicFormField;
