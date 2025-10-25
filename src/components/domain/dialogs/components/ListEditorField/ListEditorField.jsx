import { Add, Delete } from '@mui/icons-material';
import { Box, Grid, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { FieldArray } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useMaskUtils } from '../../../../../hooks/useMaskUtils';

const MaskedListInput = ({ value, onChange, placeholder, mask, error, helperText }) => {
    const [inputValue, setInputValue] = useState(value || '');
    const { maskPhone, maskCEP, maskCNPJ, maskCPF, maskRG, maskIE } = useMaskUtils();

    const applyMask = useCallback((val) => {
        if (!val) return '';

        switch (mask) {
            case 'cpf': return maskCPF(val);
            case 'cnpj': return maskCNPJ(val);
            case 'phone': return maskPhone(val);
            case 'cep': return maskCEP(val);
            case 'rg': return maskRG(val);
            case 'ie': return maskIE(val);
            default: return val;
        }
    }, [mask, maskCPF, maskCNPJ, maskPhone, maskCEP, maskRG, maskIE]);

    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    const handleChange = (e) => {
        const newValue = applyMask(e.target.value);
        setInputValue(newValue);
        onChange(newValue);
    };

    return (
        <TextField
            fullWidth
            size="small"
            value={inputValue}
            placeholder={placeholder}
            onChange={handleChange}
            error={error}
            helperText={helperText}
        />
    );
};

const ListEditorField = ({ label, values, setFieldValue, name, placeholder, mask, errors, touched }) => {
    const items = values || [];

    const fieldErrors = errors?.[name] || [];
    const fieldTouched = touched?.[name] || [];

    return (
        <Box sx={{ mb: 2 }}>
            <FieldArray
                name={name}
                render={(arrayHelpers) => (
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: '#f9fafb',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                        }}
                    >
                        {items.length > 0 ? (
                            items.map((item, index) => {
                                const errorMsg = fieldTouched[index] && fieldErrors[index];

                                return (
                                    <Grid key={index} container spacing={1} alignItems="center">
                                        <Grid item xs>
                                            <MaskedListInput
                                                value={item}
                                                placeholder={placeholder}
                                                mask={mask}
                                                onChange={(val) => {
                                                    const newItems = [...items];
                                                    newItems[index] = val;
                                                    setFieldValue(name, newItems);
                                                }}
                                                error={Boolean(errorMsg)}
                                                helperText={errorMsg || ' '}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Tooltip title="Remover">
                                                <IconButton
                                                    color="error"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                    size="small"
                                                >
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        ) : (
                            <Typography
                                variant="body2"
                                color="text.disabled"
                                sx={{ textAlign: 'center', py: 1 }}
                            >
                                Nenhum {label.slice(0, -1).toLowerCase()} adicionado
                            </Typography>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <Tooltip title={`Adicionar ${label.slice(0, -1).toLowerCase()}`}>
                                <IconButton
                                    color="primary"
                                    onClick={() => arrayHelpers.push('')}
                                    size="small"
                                >
                                    <Add fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Paper>
                )}
            />
        </Box>
    );
};

export default ListEditorField;
