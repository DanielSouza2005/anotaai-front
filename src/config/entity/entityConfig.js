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
    }
}

export const ENTITY_NAMES = {
  CONTATO: 'contato',
  EMPRESA: 'empresa',
  USUARIO: 'usuario',
};

export const getEntityBehavior = (entityName) => {
    return entityConfig[entityName] || {};
}