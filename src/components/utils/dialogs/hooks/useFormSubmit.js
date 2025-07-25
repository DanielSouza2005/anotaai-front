import { useState } from 'react';
import { useApiUtils } from '../../../../hooks/useApiUtils';

const useFormSubmit = ({ entity, maskedFields, onSubmit }) => {
    const [submitting, setSubmitting] = useState(false);
    const { cleanValuesForAPI } = useApiUtils();

    const handleSubmit = (values, formikBag) => {
        setSubmitting(true);

        const finish = () => setSubmitting(false);

        const entitiesWithPhoto = ["contato", "usuario"];

        if (entitiesWithPhoto.includes(entity)) {
            const { foto, ...rest } = values;
            const cleanedData = cleanValuesForAPI(rest, maskedFields);

            const payload = {
                dados: cleanedData,
                foto: foto || null,
            };

            onSubmit(payload, formikBag, finish);
        } else {
            const cleanValues = cleanValuesForAPI(values, maskedFields);
            onSubmit(cleanValues, formikBag, finish);
        }
    };

    return {
        submitting,
        handleSubmit,
        setSubmitting
    };
};

export default useFormSubmit;