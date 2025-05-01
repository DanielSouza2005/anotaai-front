import dayjs from 'dayjs';

const formatValue = (field, value) => {
    if (!value) return '';

    switch (field.name) {
        case 'cpf':
            return maskCPF(value);
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

const maskCPF = (cpf = '') => {
    if (!cpf) return '';
    const cleaned = cpf.replace(/\D/g, '');
    return cleaned.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
};

const maskRG = (rg = '') => {
    if (!rg) return '';
    const cleaned = rg.replace(/\D/g, '');
    return cleaned.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');
};

export { formatValue, maskCEP, maskPhone, maskCPF, maskRG };