const usuarioFields = [
    { name: 'cod_usuario', label: 'Usuário (Código)', type: 'text' },
    { name: 'nome', label: 'Nome', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'dt_inclusao', label: 'Dt. Inclusão', type: 'date' },
    { name: 'dt_alteracao', label: 'Dt. Últ. Alteração', type: 'date' }
];

const addUsuarioFields = [
    { name: 'nome', label: 'Nome', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'senha', label: 'Senha', type: 'password' },
];

const editUsuarioFields = [
    { name: 'cod_usuario', label: 'Usuário (Código)', type: 'text', readonly: true },
    { name: 'nome', label: 'Nome', type: 'text' },
    { name: 'email', label: 'Email', type: 'text', readonly: true },
];

const searchUsuarioFields = [
    { name: 'nome', label: 'Nome', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
];

export {
    addUsuarioFields, editUsuarioFields, searchUsuarioFields, usuarioFields
};

