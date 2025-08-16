import RefreshIcon from '@mui/icons-material/Refresh';
import {
    Box,
    CircularProgress,
    IconButton,
    InputAdornment,
    MenuItem,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { Field } from 'formik';
import { useEntityUtils } from '../../../../../hooks/useEntityUtils';
import { useMaskUtils } from '../../../../../hooks/useMaskUtils';
import { useSelectField } from './hooks/useSelectField';
import { getSelectFieldStyles, SELECT_FIELD_TEXTS } from './styles/SelectFieldStyles';

const SelectField = ({
    name,
    label,
    source,
    error,
    touched,
    showRefreshButton = true,
    refreshTooltip = SELECT_FIELD_TEXTS.refreshTooltip
}) => {
    const { options, loading, isRefreshing, handleRefresh } = useSelectField(source);
    const { getEntityIdKey } = useEntityUtils();
    const { formatValue } = useMaskUtils();

    const styles = getSelectFieldStyles({ loading, isRefreshing, showRefreshButton });

    return (
        <Field name={name}>
            {({ field }) => (
                <TextField
                    {...field}
                    select
                    fullWidth
                    label={label}
                    margin="dense"
                    error={Boolean(touched && error)}
                    helperText={touched && error}
                    disabled={loading}
                    SelectProps={{
                        renderValue: (selectedValue) => {
                            const selectedOption = options.find(
                                (opt) => opt[getEntityIdKey(source)] === selectedValue
                            );
                            return selectedOption ? selectedOption.razao : '';
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" sx={styles.inputAdornment}>
                                {loading && (
                                    <CircularProgress size={20} sx={styles.circularProgress} />
                                )}
                                {showRefreshButton && (
                                    <Tooltip title={refreshTooltip} arrow>
                                        <span>
                                            <IconButton
                                                size="small"
                                                onClick={handleRefresh}
                                                disabled={loading}
                                                sx={styles.refreshButton}
                                            >
                                                <RefreshIcon
                                                    fontSize="small"
                                                    sx={styles.refreshIcon}
                                                />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                )}
                            </InputAdornment>
                        )
                    }}
                    sx={styles.textField}
                >
                    <MenuItem value="">{SELECT_FIELD_TEXTS.emptyOption}</MenuItem>
                    {options.map((option) => {
                        const key = getEntityIdKey(source);
                        return (
                            <MenuItem key={option[key]} value={option[key]}>
                                <Box>
                                    <Typography variant="body1" fontWeight="bold">
                                        {option.razao}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {option.fantasia} • {formatValue({ name: 'cnpj' }, option.cnpj)}
                                    </Typography>
                                </Box>
                            </MenuItem>
                        );
                    })}
                </TextField>
            )}
        </Field>
    );
};

export default SelectField;
