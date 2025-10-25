import dayjs from 'dayjs';
import { useCallback } from 'react';

export const useMaskUtils = () => {
    const maskTypes = ['cpf', 'cnpj', 'rg', 'phone', 'cep', 'ie'];

    const maskPhone = useCallback((value = '') => {
        const cleaned = value.replace(/\D/g, '');

        if (cleaned.length === 0) return '';
        if (cleaned.length <= 2) return `(${cleaned}`;
        if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
        if (cleaned.length <= 10) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;

        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    }, []);

    const maskCEP = useCallback((value = '') => {
        const cleaned = value.replace(/\D/g, '');

        if (cleaned.length <= 5) return cleaned;
        return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
    }, []);

    const maskCPF = useCallback((value = '') => {
        const cleaned = value.replace(/\D/g, '');

        if (cleaned.length <= 3) return cleaned;
        if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
        if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;

        return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
    }, []);

    const maskRG = useCallback((value = '') => {
        const cleaned = value.replace(/\D/g, '');

        if (cleaned.length <= 2) return cleaned;
        if (cleaned.length <= 5) return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
        if (cleaned.length <= 8) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;

        return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}-${cleaned.slice(8, 9)}`;
    }, []);

    const maskCNPJ = useCallback((value = '') => {
        const cleaned = value.replace(/\D/g, '');

        if (cleaned.length <= 2) return cleaned;
        if (cleaned.length <= 5) return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
        if (cleaned.length <= 8) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
        if (cleaned.length <= 12) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`;

        return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12, 14)}`;
    }, []);

    const maskIE = useCallback((value = '') => {
        const cleaned = value.replace(/\D/g, '');

        if (cleaned.length <= 3) return cleaned;
        if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
        if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
        if (cleaned.length <= 12) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}.${cleaned.slice(9)}`;

        return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}.${cleaned.slice(9, 12)}`;
    }, []);

    const formatValue = useCallback((field, value) => {
        if (!field || !value) return '';

        switch (field.name || field.field) {
            case 'cpf':
                return maskCPF(value);
            case 'cnpj':
                return maskCNPJ(value);
            case 'rg':
                return maskRG(value);
            case 'telefone':
            case 'telefone2':
            case 'celular':
                return maskPhone(value);
            case 'cep':
                return maskCEP(value);
            case 'ie':
                return maskIE(value);
            default:
        }

        switch (field.type) {
            case 'date':
                return dayjs(value).format('DD/MM/YYYY');
            case 'text':
            case 'textarea':
            case 'email':
                return value;
            default:
                return value;
        }
    }, [maskCPF, maskCNPJ, maskRG, maskPhone, maskCEP, maskIE]);

    const removeMasksFromValues = useCallback((obj, maskedFields) => {
        if (Array.isArray(obj)) {
            return obj.map(item => removeMasksFromValues(item, maskedFields));
        }

        if (obj !== null && typeof obj === 'object') {
            const result = {};
            for (const key in obj) {
                const value = obj[key];

                const isMaskedField = maskedFields.some(field =>
                    field.includes('.') ?
                        field === key || field.startsWith(`${key}.`) :
                        field === key
                );

                if (isMaskedField) {
                    if (typeof value === 'string') {
                        result[key] = value.replace(/\D/g, '');
                    }
                    else if (Array.isArray(value)) {
                        const subMaskedFields = maskedFields
                            .filter(field => field.startsWith(`${key}.`))
                            .map(field => field.substring(key.length + 1));

                        result[key] = value.map(item => {
                            if (typeof item === 'string') {
                                return item.replace(/\D/g, '');
                            } else if (item !== null && typeof item === 'object') {
                                return removeMasksFromValues(item, subMaskedFields);
                            }
                            return item;
                        });
                    }
                    else if (typeof value === 'object' && value !== null) {
                        const subMaskedFields = maskedFields
                            .filter(field => field.startsWith(`${key}.`))
                            .map(field => field.substring(key.length + 1));

                        result[key] = removeMasksFromValues(value, subMaskedFields);
                    } else {                        
                        result[key] = value;
                    }
                }
                else if (typeof value === 'object' && value !== null) {
                    const subMaskedFields = maskedFields
                        .filter(field => field.startsWith(`${key}.`))
                        .map(field => field.substring(key.length + 1));

                    result[key] = removeMasksFromValues(value, subMaskedFields);
                } else {
                    result[key] = value;
                }
            }
            return result;
        }

        return obj;
    }, []);

    return {
        maskTypes,
        maskPhone,
        maskCEP,
        maskCPF,
        maskRG,
        maskCNPJ,
        maskIE,
        formatValue,
        removeMasksFromValues
    };
};