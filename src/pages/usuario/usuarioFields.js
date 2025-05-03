import dayjs from "dayjs";

const gridUsuarioFields = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
        field: 'dt_inclusao',
        headerName: 'Dt. Inclusão',
        valueFormatter: (params) => {
            const value = params;
            return value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '';
        },
        flex: 1
    },
    {
        field: 'dt_alteracao',
        headerName: 'Dt. Últ. Alteração',
        valueFormatter: (params) => {
            const value = params;
            return value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '';
        },
        flex: 1
    }
];

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
];

const searchUsuarioFields = [
    { name: 'nome', label: 'Nome', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
];

export {
    usuarioFields,
    addUsuarioFields, editUsuarioFields,
    searchUsuarioFields, gridUsuarioFields
};