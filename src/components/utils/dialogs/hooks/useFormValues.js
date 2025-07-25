import { useMemo } from 'react';
import { maskTypes } from '../../../../utils/Masks';
import { useEntityUtils } from '../../../../hooks/useEntityUtils';

export const useFormValues = ({ fields, enderecoFields, formData = {}, entity }) => {
    const idKey = entity === 'contato' ? 'empresa' : '';
    const { getEntityIdKey } = useEntityUtils();

    const baseValues = fields.reduce((acc, f) => {
        const value =
            f.type === 'select' && f.source
                ? formData[idKey]?.[getEntityIdKey(f.source)] || ''
                : formData[f.name] || '';
        return { ...acc, [f.name]: value };
    }, {});

    const enderecoValues = enderecoFields.reduce((acc, f) => ({
        ...acc,
        [f.name]: formData?.endereco?.[f.name] || ''
    }), {});

    const maskedFields = useMemo(() => {
        const fieldsList = [
            ...fields
                .filter(f => maskTypes.includes(f.name) || maskTypes.includes(f.mask))
                .map(f => f.name),
            ...enderecoFields
                .filter(f => maskTypes.includes(f.name) || maskTypes.includes(f.mask))
                .map(f => `endereco.${f.name}`)
        ];
        return fieldsList;
    }, [fields, enderecoFields]);

    return {
        values: {
            ...baseValues,
            endereco: enderecoValues,
            foto: null,
            obs: formData.obs || '',
        },
        maskedFields
    };
};
