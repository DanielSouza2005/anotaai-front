import { CircularProgress, Grid, TextField, Typography, useTheme } from '@mui/material';
import { Field } from 'formik';
import { useMaskUtils } from '../../../../../hooks/useMaskUtils';
import useCEPAutoComplete from '../../hooks/useCEPAutoComplete';
import SelectField from '../select/SelectField';
import { DYNAMIC_FORM_FIELD_CONFIG, getDynamicFormFieldStyles } from './styles/DynamicFormFieldStyles';
import MaskedInput from '../maskedInput';

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
    const theme = useTheme();
    const styles = getDynamicFormFieldStyles(theme);

    const fullName = prefix ? `${prefix}.${field.name}` : field.name;
    const error = prefix ? errors[prefix]?.[field.name] : errors[field.name];
    const isTouched = prefix ? touched[prefix]?.[field.name] : touched[field.name];
    const isRequired = isFieldRequired(field.name, prefix);

    const label = (
        <span>
            {field.label}
            {isRequired && (
                <Typography component="span" color="error">
                    {DYNAMIC_FORM_FIELD_CONFIG.texts.requiredIndicator}
                </Typography>
            )}
        </span>
    );

    const { maskTypes } = useMaskUtils();
    const isMasked = maskTypes.includes(field.name) || maskTypes.includes(field.mask);
    const isSelect = field.type === DYNAMIC_FORM_FIELD_CONFIG.fieldTypes.select && field.source;
    const isTextarea = field.type === DYNAMIC_FORM_FIELD_CONFIG.fieldTypes.textarea;
    const isDate = field.type === DYNAMIC_FORM_FIELD_CONFIG.fieldTypes.date;
    const isAddressField = prefix === DYNAMIC_FORM_FIELD_CONFIG.specialFields.addressPrefix;

    const { handleCEP } = useCEPAutoComplete(prefix, setFieldValue, values, cepLoading, setCepLoading);

    const getGridSpan = () => {
        if (isTextarea) return DYNAMIC_FORM_FIELD_CONFIG.grid.fullSpan;
        return DYNAMIC_FORM_FIELD_CONFIG.grid.halfSpan;
    };

    const buildInputProps = () => {
        const inputProps = {
            readOnly,
            ...(readOnly && { sx: styles.readOnlyInput })
        };

        if (isAddressField && cepLoading) {
            inputProps.endAdornment = (
                <CircularProgress
                    size={DYNAMIC_FORM_FIELD_CONFIG.dimensions.loadingSize}
                    sx={styles.loadingIndicator}
                />
            );
        }

        return inputProps;
    };

    if (isSelect) {
        return (
            <Grid key={fullName} sx={{ gridColumn: `span ${DYNAMIC_FORM_FIELD_CONFIG.grid.halfSpan}` }}>
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
            <Grid key={fullName} sx={{ gridColumn: `span ${DYNAMIC_FORM_FIELD_CONFIG.grid.halfSpan}` }}>
                <MaskedInput
                    name={fullName}
                    mask={field.mask || field.name}
                    label={label}
                    fullWidth
                    margin={DYNAMIC_FORM_FIELD_CONFIG.input.margin}
                    readOnly={readOnly}
                    onBlur={handleCEP}
                />
            </Grid>
        );
    }

    return (
        <Grid key={fullName} sx={{ gridColumn: `span ${getGridSpan()}` }}>
            <Field
                name={fullName}
                as={TextField}
                label={label}
                fullWidth
                value={values?.[prefix]?.[field.name] ?? values?.[field.name] ?? ''}
                multiline={isTextarea}
                rows={isTextarea ? DYNAMIC_FORM_FIELD_CONFIG.textarea.rows : 1}
                type={field.type}
                margin={DYNAMIC_FORM_FIELD_CONFIG.input.margin}
                error={Boolean(isTouched && error)}
                helperText={isTouched && error}
                InputLabelProps={isDate ? { shrink: true } : undefined}
                InputProps={buildInputProps()}
                onBlur={handleCEP}
            />
        </Grid>
    );
};

export default DynamicFormField;