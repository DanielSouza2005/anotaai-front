export const entityConfig = {
    contato: {
        label: "Contato",
        hasPhoto: true,
        hasObs: true,
        hasEmpresa: (isReadOnly) => isReadOnly,
        hasAvatar: false,
        relatedIdKey: 'empresa',
    },
    empresa: {
        label: "Empresa",
        hasPhoto: false,
        hasObs: false,
        hasEmpresa: () => false,
        hasAvatar: false,
    },
    usuario: {
        label: "Usuário",
        hasPhoto: true,
        hasObs: false,
        hasEmpresa: () => false,
        hasAvatar: true,
    },
    backup: {
        label: "Backup",
        hasPhoto: false,
        hasObs: false,
        hasEmpresa: () => false,
        hasAvatar: false,
    },
    backupLog: {
        label: "Backup Log",
        hasPhoto: false,
        hasObs: false,
        hasEmpresa: () => false,
        hasAvatar: false,
    },
}

export const ENTITY_NAMES = {
    CONTATO: 'contato',
    EMPRESA: 'empresa',
    USUARIO: 'usuario',
    BACKUP: 'backup',
    BACKUP_LOG: 'backupLog',
};

export const getEntityBehavior = (entityName) => {
    return entityConfig[entityName] || {};
}