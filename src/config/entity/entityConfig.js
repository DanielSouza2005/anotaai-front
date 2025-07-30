export const entityConfig = {
    contato: {
        label: "Contato",
        hasPhoto: true,
        hasObs: true,
        hasEmpresa: (isReadOnly) => isReadOnly,
        hasAvatar: false,
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

export const getEntityBehavior = (entityName) => {
    return entityConfig[entityName] || {};
}