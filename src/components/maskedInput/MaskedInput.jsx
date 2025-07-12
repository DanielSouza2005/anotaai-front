import { TextField } from '@mui/material';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import { maskCEP, maskCNPJ, maskCPF, maskIE, maskPhone, maskRG } from '../../utils/Masks';

const MaskedInput = React.memo(({ mask, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const [inputValue, setInputValue] = useState(field.value || '');
    const { setValue } = helpers;

    useEffect(() => {
        if (field.value !== inputValue) {
            setInputValue(field.value || '');
        }
    }, [field.value, inputValue]);

    const applyMask = (value) => {
        switch (mask) {
            case 'cpf': return maskCPF(value);
            case 'cnpj': return maskCNPJ(value);
            case 'phone': return maskPhone(value);
            case 'cep': return maskCEP(value);
            case 'rg': return maskRG(value);
            case 'ie': return maskIE(value);
            default: return value;
        }
    };

    const handleChange = (e) => {
        const rawValue = e.target.value;
        const newValue = applyMask(rawValue);

        setInputValue(newValue);
        setValue(newValue);
    };

    const handleBlur = (e) => {
        field.onBlur(e);
    };

    const getErrorText = () => {
        if (!meta.touched || !meta.error) return undefined;
        if (typeof meta.error === 'string') return meta.error;
        return 'Erro de validação';
    };

    return (
        <TextField
            {...props}
            name={field.name}
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            error={meta.touched && Boolean(meta.error)}
            helperText={getErrorText()}
        />
    );
});

export default React.memo(MaskedInput);