import dayjs from 'dayjs';

const formatValue = (field, value) => {
    if (!value) return '';

    switch (field.type) {
        case 'date':
            return dayjs(value).format('DD/MM/YYYY');
        case 'text':
        case 'textarea':
            return value;
        case 'email':
            return value;
        default:
            return value;
    }
};

const maskPhone = (number = '') => {
    if (number === '') return;
    if (!number) return '';

    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length === 11) {
        return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleaned.length === 10) {
        return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return number;
};

const maskCEP = (cep = '') => {
    if (cep === '') return;
    if (!cep) return '';

    const cleaned = cep.replace(/\D/g, '');
    return cleaned.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};

export { formatValue, maskCEP, maskPhone };