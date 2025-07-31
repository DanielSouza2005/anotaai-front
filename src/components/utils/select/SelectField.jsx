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
import { useEntityUtils } from '../../../hooks/useEntityUtils';
import { useMaskUtils } from '../../../hooks/useMaskUtils';
import { useSelectField } from './hooks/useSelectField';

const SelectField = ({
    name,
    label,
    source,
    error,
    touched,
    showRefreshButton = true,
    refreshTooltip = "Atualizar lista"
}) => {
    const { options, loading, isRefreshing, handleRefresh } = useSelectField(source);
    const { getEntityIdKey } = useEntityUtils();
    const { formatValue } = useMaskUtils();

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
                            <InputAdornment position="end" sx={{ minWidth: 40 }}>
                                {loading && (
                                    <CircularProgress
                                        size={20}
                                        sx={{
                                            mr: showRefreshButton ? 0.5 : 1,
                                            color: isRefreshing ? 'primary.main' : 'inherit'
                                        }}
                                    />
                                )}
                                {showRefreshButton && (
                                    <Tooltip title={refreshTooltip} arrow>
                                        <span>
                                            <IconButton
                                                size="small"
                                                onClick={handleRefresh}
                                                disabled={loading}
                                                sx={{
                                                    padding: '4px',
                                                    mr: '4px', 
                                                    '&:hover': {
                                                        backgroundColor: 'action.hover',
                                                        transform: 'rotate(180deg)',
                                                        transition: 'transform 0.3s ease-in-out'
                                                    },
                                                    '&:disabled': {
                                                        opacity: 0.5
                                                    }
                                                }}
                                            >
                                                <RefreshIcon
                                                    fontSize="small"
                                                    sx={{
                                                        transition: 'transform 0.3s ease-in-out',
                                                        transform: isRefreshing ? 'rotate(360deg)' : 'rotate(0deg)'
                                                    }}
                                                />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                )}
                            </InputAdornment>
                        )
                    }}
                    sx={{ minWidth: 220 }}
                >
                    <MenuItem value="">Selecione</MenuItem>
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