import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * Consulta a API ViaCEP e retorna os dados de endereço.
 * @param {string} cep - CEP no formato 99999-999 ou 99999999.
 * @returns {Promise<Object|null>} - Objeto com logradouro, bairro, cidade e uf, ou null se erro.
 */
export const fetchEnderecoByCEP = async (cep) => {
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
};
