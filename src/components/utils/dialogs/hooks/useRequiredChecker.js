const useRequiredChecker = (validationSchema) => {
    return (fieldName, prefix = '') => {
        try {
            const path = prefix ? `${prefix}.${fieldName}` : fieldName;
            const fieldSchema = validationSchema?.describe()?.fields;

            const keys = path.split('.');
            let current = fieldSchema;

            for (const key of keys) {
                if (!current[key]) return false;
                current = current[key].fields || current[key];
            }

            return current?.tests?.some(test => test.name === 'required') ?? false;
        } catch {
            return false;
        }
    };
};

export default useRequiredChecker;