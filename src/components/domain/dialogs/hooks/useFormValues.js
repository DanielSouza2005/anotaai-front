import { useMemo } from 'react';
import { useEntityUtils } from '../../../../hooks/useEntityUtils';
import { useMaskUtils } from '../../../../hooks/useMaskUtils';
import { getEntityBehavior } from '../../../../config/entity/entityConfig';

export const useFormValues = ({ fields, enderecoFields, formData = {}, entity }) => {
    const behavior = getEntityBehavior(entity);
    const idKey = behavior.relatedIdKey || '';

    const { getEntityIdKey } = useEntityUtils();
    const { maskTypes, formatValue } = useMaskUtils();

    const baseValues = fields.reduce((acc, f) => {
        let value;

        if (f.type === 'select' && f.source) {
            value = formData[idKey]?.[getEntityIdKey(f.source)] || '';
        } else if (Array.isArray(formData[f.name])) {
            value = formData[f.name];
        } else if (f.isList && typeof formData[f.name] === 'string') {
            value = formData[f.name]
                .split(',')
                .map(item => item.trim())
                .filter(Boolean);
        } else {
            value = formData[f.name] || (f.isList ? [] : '');
        }

        if (f.name === 'telefones' && f.isList && Array.isArray(value)) {
            value = value.map(tel => formatValue({ name: 'telefone' }, tel));
        }

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
    }, [fields, enderecoFields, maskTypes]);

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
