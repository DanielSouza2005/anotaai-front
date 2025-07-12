function convertEmptyStringsToNull(obj) {
    if (Array.isArray(obj)) {
        return obj.map(convertEmptyStringsToNull);
    }

    if (obj !== null && typeof obj === 'object') {
        const result = {};
        for (const key in obj) {
            const value = obj[key];
            result[key] = convertEmptyStringsToNull(value);
        }
        return result;
    }

    if (typeof obj === 'string') {
        return obj.trim() === '' ? null : obj;
    }

    return obj;
}


export const removeMasksFromValues = (obj, maskedFields) => {
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

            if (isMaskedField && typeof value === 'string') {
                result[key] = value.replace(/\D/g, '');
            }
            else if (typeof value === 'object' && value !== null) {
                const subMaskedFields = maskedFields
                    .filter(field => field.startsWith(`${key}.`))
                    .map(field => field.substring(key.length + 1));

                result[key] = removeMasksFromValues(value, subMaskedFields);
            }
            else {
                result[key] = value;
            }
        }
        return result;
    }

    return obj;
};

export const cleanValuesForAPI = (values, maskedFields) => {
    const withoutMasks = removeMasksFromValues(values, maskedFields);
    return convertEmptyStringsToNull(withoutMasks);
};

export default convertEmptyStringsToNull;