import dayjs from 'dayjs';

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

const maskCNPJ = (cnpj = '') => {
    if (!cnpj) return '';
    const cleaned = cnpj.replace(/\D/g, '');
    return cleaned.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
};

const maskIE = (value) => {
    if (!value) return '';
    const onlyDigits = value.replace(/\D/g, '');
    return onlyDigits.replace(/(\d{1,3})(?=(\d{3})+(?!\d))/g, '$1.');
}

export { formatValue, removeMask, maskCEP, maskPhone, maskCPF, maskRG, maskCNPJ, maskIE };