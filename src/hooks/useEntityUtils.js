import { useCallback } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupIcon from '@mui/icons-material/Group';

export const useEntityUtils = () => {
    const getEntityIdKey = useCallback((entityName) => {
        switch (entityName) {
            case 'contato':
                return 'cod_contato';
            case 'empresa':
                return 'cod_empresa';
            case 'usuario':
                return 'cod_usuario';
            default:
                throw new Error(`Chave primária desconhecida para a entidade: ${entityName}`);
        }
    }, []);

    const getEntityIcon = useCallback((entity) => {
        switch (entity) {
            case 'empresa':
                return <BusinessIcon fontSize="large" sx={{ mr: 1 }} color="primary" />;
            case 'usuario':
                return <GroupIcon fontSize="large" sx={{ mr: 1 }} color="primary" />;
            case 'contato':
                return <EventNoteIcon fontSize="large" sx={{ mr: 1 }} color="primary" />;
            default:
                return null;
        }
    }, []);

    const getEntityLabel = useCallback((entity) => {
        switch (entity) {
            case 'contato':
                return 'Contato';
            case 'empresa':
                return 'Empresa';
            case 'usuario':
                return 'Usuário';
            default:
                throw new Error(`Chave primária desconhecida para a entidade: ${entity}`);
        }
    }, []);

    return {
        getEntityIdKey,
        getEntityIcon,
        getEntityLabel
    };
};