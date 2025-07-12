import dayjs from 'dayjs';

const maskTypes = ['cpf', 'cnpj', 'rg', 'phone', 'cep', 'ie'];

const formatValue = (field, value) => {
    if (!field || !value) return '';

    switch (field.name || field.field) {
        case 'cpf':
            return maskCPF(value);
        case 'cnpj':
            return maskCNPJ(value);
        case 'rg':
            return maskRG(value);
        case 'telefone':
            return maskPhone(value);
        case 'telefone2':
            return maskPhone(value);
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
};

const removeMask = (value) => {
    return value?.replace(/\D/g, '') || '';
}

export const maskPhone = (value = '') => {
    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length === 0) return '';
    if (cleaned.length <= 2) return `(${cleaned}`;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    if (cleaned.length <= 10) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;

    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};

export const maskCEP = (value = '') => {
    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length <= 5) return cleaned;
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
};

export const maskCPF = (value = '') => {
    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;

    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
};

export const maskRG = (value = '') => {
    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 5) return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
    if (cleaned.length <= 8) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;

    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}-${cleaned.slice(8, 9)}`;
};

export const maskCNPJ = (value = '') => {
    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 5) return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
    if (cleaned.length <= 8) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
    if (cleaned.length <= 12) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`;

    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12, 14)}`;
};

export const maskIE = (value = '') => {
    const cleaned = value.replace(/\D/g, '');

    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    if (cleaned.length <= 12) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}.${cleaned.slice(9)}`;

    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}.${cleaned.slice(9, 12)}`;
};

export { formatValue, removeMask, maskTypes };