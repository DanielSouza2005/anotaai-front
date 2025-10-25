import axios from 'axios';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useMaskUtils } from './useMaskUtils';
import { useTextUtils } from './useTextUtils';

export const useApiUtils = () => {
    const { convertEmptyStringsToNull } = useTextUtils();
    const { removeMasksFromValues } = useMaskUtils();

    const fetchEnderecoByCEP = useCallback(async (cep) => {
        try {
            const cleanedCEP = cep.replace(/\D/g, '');
            if (cleanedCEP.length !== 8) return null;

            const response = await axios.get(`https://viacep.com.br/ws/${cleanedCEP}/json/`);

            if (response.data.erro) return null;

            const { logradouro, bairro, localidade: cidade, uf, complemento } = response.data;

            return { logradouro, bairro, cidade, uf, complemento };
        } catch (error) {
            toast.error('Erro ao buscar CEP:' + error);
            return null;
        }
    }, []);

    const cleanValuesForAPI = useCallback((values, maskedFields) => {
        const withoutMasks = removeMasksFromValues(values, maskedFields);
        return convertEmptyStringsToNull(withoutMasks);
    }, [removeMasksFromValues, convertEmptyStringsToNull]);

    const prepareContatoForAPI = useCallback((values) => {
        const cleaned = cleanValuesForAPI(values, ['telefones']);

        let telefones = cleaned.telefones || [];
        if (!Array.isArray(telefones)) {
            telefones = telefones
                .split(',')
                .map(t => t.trim())
                .filter(Boolean);
        }

        telefones = telefones.map(t => ({ telefone: t }));

        let emails = values.emails || [];
        if (!Array.isArray(emails)) {
            emails = emails
                .split(',')
                .map(e => e.trim())
                .filter(Boolean);
        }
        
        emails = emails.map(e => ({ email: e }));

        return {
            ...cleaned,
            telefones,
            emails
        };
    }, [cleanValuesForAPI]);

    return {
        fetchEnderecoByCEP,
        cleanValuesForAPI,
        prepareContatoForAPI
    };
};