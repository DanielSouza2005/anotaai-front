import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelectData } from '../../../../../../context/selectData/SelectDataContext';

export const useSelectField = (source) => {
    const [options, setOptions] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { fetchSelectData, isLoading, cache, refreshCache } = useSelectData();

    useEffect(() => {
        if (cache[source]) {
            setOptions(cache[source]);
            return;
        }

        const loadData = async () => {
            try {
                const data = await fetchSelectData(source);
                setOptions(data);
            } catch (err) {
                setOptions([]);
            }
        };

        loadData();
    }, [source, fetchSelectData, cache]);

    const handleRefresh = useCallback(async () => {
        if (isRefreshing || isLoading(source)) {
            return;
        }

        try {
            setIsRefreshing(true);
            const data = await refreshCache(source);
            setOptions(data);

            toast.success(`Lista de ${source}s atualizada!`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
            });
        } catch (error) {
            toast.error(`Erro ao atualizar ${source}`, {
                position: "bottom-right",
                autoClose: 3000,
            });
        } finally {
            setIsRefreshing(false);
        }
    }, [source, refreshCache, isRefreshing, isLoading]);

    const loading = isLoading(source) || isRefreshing;

    return {
        options,
        loading,
        isRefreshing,
        handleRefresh
    };
};