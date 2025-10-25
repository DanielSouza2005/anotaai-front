import { useState } from 'react';
import { useApiUtils } from '../../../../hooks/useApiUtils';
import { getEntityBehavior } from '../../../../config/entity/entityConfig';

const useFormSubmit = ({ entity, maskedFields, onSubmit }) => {
    const [submitting, setSubmitting] = useState(false);
    const { cleanValuesForAPI, prepareContatoForAPI } = useApiUtils();

    const behavior = getEntityBehavior(entity);
    const usaFoto = behavior.hasPhoto;

    const handleSubmit = (values, formikBag) => {
        setSubmitting(true);

        const finish = () => setSubmitting(false);

        if (usaFoto) {
            const { foto, ...rest } = values;
            let cleanedData = cleanValuesForAPI(rest, maskedFields);
            cleanedData = prepareContatoForAPI(cleanedData);

            const payload = {
                dados: cleanedData,
                foto: foto || null,
            };

            onSubmit(payload, formikBag, finish);
        } else {
            let cleanValues = cleanValuesForAPI(values, maskedFields);
            cleanValues = prepareContatoForAPI(cleanValues);
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