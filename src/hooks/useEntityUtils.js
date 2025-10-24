import { useCallback } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupIcon from '@mui/icons-material/Group';
import { ENTITY_NAMES } from '../config/entity/entityConfig';

export const useEntityUtils = () => {
    const getEntityIdKey = useCallback((entityName) => {
        switch (entityName) {
            case ENTITY_NAMES.CONTATO:
                return 'cod_contato';
            case ENTITY_NAMES.EMPRESA:
                return 'cod_empresa';
            case ENTITY_NAMES.USUARIO:
                return 'cod_usuario';
            default:
                throw new Error(`Chave primária desconhecida para a entidade: ${entityName}`);
        }
    }, []);

    const getEntityIcon = useCallback((entity) => {
        switch (entity) {
            case ENTITY_NAMES.EMPRESA:
                return <BusinessIcon fontSize="large" sx={{ mr: 1 }} color="primary" />;
            case ENTITY_NAMES.USUARIO:
                return <GroupIcon fontSize="large" sx={{ mr: 1 }} color="primary" />;
            case ENTITY_NAMES.CONTATO:
                return <EventNoteIcon fontSize="large" sx={{ mr: 1 }} color="primary" />;
            default:
                return null;
        }
    }, []);

    const getEntityLabel = useCallback((entity) => {
        switch (entity) {
            case ENTITY_NAMES.CONTATO:
                return 'Contato';
            case ENTITY_NAMES.EMPRESA:
                return 'Empresa';
            case ENTITY_NAMES.USUARIO:
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