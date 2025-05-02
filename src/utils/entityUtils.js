export const getEntityIdKey = (entityName) => {
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
};
