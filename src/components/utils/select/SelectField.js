import { MenuItem, TextField } from '@mui/material';
import { Field } from 'formik';
import React, { useEffect, useState } from 'react';
import api from '../../../services/api/api';
import { getEntityIdKey } from '../../../utils/entityUtils';

const SelectField = ({ name, label, source, displayField = 'nome', error, touched }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get(`/${source}?size=100000&page=0`);
                setOptions(data.content);
            } catch (err) {
                console.error(`Erro ao buscar dados de ${source}:`, err);
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
                    sx={{ minWidth: 220 }}
                >
                    <MenuItem value="">Selecione</MenuItem>
                    {options.map((option) => {
                        const key = getEntityIdKey(source);
                        return (
                            <MenuItem key={option[key]} value={option[key]}>
                                {option[displayField] ?? option[key]}
                            </MenuItem>
                        );
                    })}
                </TextField>
            )}
        </Field>
    );
};

export default SelectField;
