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

    return {
        fetchEnderecoByCEP,
        cleanValuesForAPI
    };
};