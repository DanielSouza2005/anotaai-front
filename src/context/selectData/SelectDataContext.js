import { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api/api';

const SelectDataContext = createContext();

export const SelectDataProvider = ({ children }) => {
    const [cache, setCache] = useState({});
    const [loadingStates, setLoadingStates] = useState({});

    const fetchSelectData = useCallback(async (source, forceRefresh = false) => {
        if (forceRefresh) {
            setCache(prev => {
                const newCache = { ...prev };
                delete newCache[source];
                return newCache;
            });
        }

        if (cache[source] && !forceRefresh) {
            return cache[source];
        }

        if (loadingStates[source]) {
            return new Promise((resolve) => {
                const checkCache = () => {
                    if (cache[source]) {
                        resolve(cache[source]);
                    } else {
                        setTimeout(checkCache, 100);
                    }
                };
                checkCache();
            });
        }

        try {
            setLoadingStates(prev => ({ ...prev, [source]: true }));

            const { data } = await api.get(`/${source}?size=100&page=0`);

            setCache(prev => ({ ...prev, [source]: data.content }));
            return data.content;

        } catch (err) {
            toast.error(`Erro ao buscar dados de ${source}: ` + err);
            throw err;
        } finally {
            setLoadingStates(prev => ({ ...prev, [source]: false }));
        }
    }, [cache, loadingStates]);

    const isLoading = useCallback((source) => loadingStates[source] || false, [loadingStates]);

    const clearCache = useCallback((source) => {
        if (source) {
            setCache(prev => {
                const newCache = { ...prev };
                delete newCache[source];
                return newCache;
            });
        } else {
            setCache({});
        }
    }, []);

    const refreshCache = useCallback(async (source) => {
        try {
            const data = await fetchSelectData(source, true);
            return data;
        } catch (error) {
            console.error('Erro ao atualizar cache:', error);
            throw error;
        }
    }, [fetchSelectData]);

    return (
        <SelectDataContext.Provider value={{
            fetchSelectData,
            isLoading,
            clearCache,
            refreshCache, 
            cache
        }}>
            {children}
        </SelectDataContext.Provider>
    );
};

export const useSelectData = () => useContext(SelectDataContext);