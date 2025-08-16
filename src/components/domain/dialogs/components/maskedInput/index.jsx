import { TextField } from '@mui/material';
import { useField } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useMaskUtils } from '../../../../../hooks/useMaskUtils';

const MaskedInput = React.memo(({ mask, onBlur: propOnBlur, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const [inputValue, setInputValue] = useState(field.value || '');
    const { setValue } = helpers;

    const { maskCEP, maskCNPJ, maskCPF, maskIE, maskPhone, maskRG } = useMaskUtils();

    const applyMask = useCallback((value) => {
        if (!value) return '';

        switch (mask) {
            case 'cpf': return maskCPF(value);
            case 'cnpj': return maskCNPJ(value);
            case 'phone': return maskPhone(value);
            case 'cep': return maskCEP(value);
            case 'rg': return maskRG(value);
            case 'ie': return maskIE(value);
            default: return value;
        }
    }, [mask, maskCEP, maskCNPJ, maskCPF, maskIE, maskPhone, maskRG]);

    useEffect(() => {
        if (field.value) {
            const maskedValue = applyMask(field.value);
            setInputValue(maskedValue);

            if (maskedValue !== field.value) {
                setValue(maskedValue);
            }
        } else {
            setInputValue('');
        }
    }, [field.value, inputValue, mask, setValue, applyMask]);

    const handleChange = (e) => {
        const rawValue = e.target.value;
        const newValue = applyMask(rawValue);

        setInputValue(newValue);
        setValue(newValue);
    };

    const handleBlur = (e) => {
        field.onBlur(e);

        if (propOnBlur) {
            propOnBlur(e);
        }
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
            InputProps={{
                readOnly: props.readOnly,
                sx: {
                    backgroundColor: props.readOnly ? '#e3f2fd' : '#ffffff',
                    borderRadius: 1,
                },
            }}
        />
    );
});

export default React.memo(MaskedInput);