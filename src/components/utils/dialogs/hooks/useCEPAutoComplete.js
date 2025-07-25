import { useApiUtils } from "../../../../hooks/useApiUtils";

const useCEPAutoComplete = (prefix, setFieldValue, values, cepLoading, setCepLoading) => {

    const { fetchEnderecoByCEP } = useApiUtils();

    const handleCEP = async (e) => {
        if (!e || !e.target || e.target.name !== (prefix ? `${prefix}.cep` : 'cep')) return;

        try {
            setCepLoading(true);
            const endereco = await fetchEnderecoByCEP(e.target.value);
            if (endereco) {
                setFieldValue(`${prefix}.pais`, 'Brasil');
                setFieldValue(`${prefix}.rua`, endereco.logradouro || values?.[prefix]?.rua);
                setFieldValue(`${prefix}.bairro`, endereco.bairro || values?.[prefix]?.bairro);
                setFieldValue(`${prefix}.cidade`, endereco.cidade || values?.[prefix]?.cidade);
                setFieldValue(`${prefix}.uf`, endereco.uf || values?.[prefix]?.uf);
                setFieldValue(`${prefix}.complemento`, endereco.complemento || values?.[prefix]?.complemento);
            }
        } finally {
            setCepLoading(false);
        }
    };

    return { handleCEP, cepLoading, setCepLoading };
};

export default useCEPAutoComplete;