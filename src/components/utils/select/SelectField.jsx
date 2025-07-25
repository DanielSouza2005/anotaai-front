import {
    Box,
    CircularProgress,
    InputAdornment,
    MenuItem,
    TextField,
    Typography
} from '@mui/material';
import { Field } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../services/api/api';
import { formatValue } from '../../../utils/Masks';
import { useEntityUtils } from '../../../hooks/useEntityUtils';

const SelectField = ({ name, label, source, error, touched }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const { getEntityIdKey } = useEntityUtils();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await api.get(`/${source}?size=100&page=0`);
                setOptions(data.content);
            } catch (err) {
                toast.error(`Erro ao buscar dados de ${source}: ` + err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [source]);

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
                        endAdornment: loading ? (
                            <InputAdornment position="end">
                                <CircularProgress size={20} />
                            </InputAdornment>
                        ) : null
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
