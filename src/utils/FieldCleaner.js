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

export default convertEmptyStringsToNull;