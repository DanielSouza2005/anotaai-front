import { useCallback } from 'react';

export const useTextUtils = () => {
    const capitalizeFirstLetter = useCallback((text) => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    }, []);

    const convertEmptyStringsToNull = useCallback((obj) => {
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
    }, []);

    return {
        capitalizeFirstLetter,
        convertEmptyStringsToNull
    };
};