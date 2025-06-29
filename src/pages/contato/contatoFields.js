const gridContatoColumns = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'email_pessoal', headerName: 'E-mail Pessoal', flex: 1 },
    { field: 'celular', headerName: 'Celular', flex: 1 },
    { field: 'telefone', headerName: 'Telefone', flex: 1 },
    {
        field: 'empresa_razao',
        headerName: 'Empresa (Razão)',
        flex: 1,
        renderCell: (params) => params.row?.empresa?.razao || '',
    },
    {
        field: 'empresa_fantasia',
        headerName: 'Empresa (Fantasia)',
        flex: 1,
        renderCell: (params) => params.row?.empresa?.fantasia || '',
    }
];

const contatoFields = [
    { name: 'nome', label: 'Nome', type: 'text' },
    { name: 'cpf', label: 'CPF', type: 'text' },
    { name: 'celular', label: 'Celular', type: 'text' },
    { name: 'telefone', label: 'Telefone', type: 'text' },
    { name: 'telefone2', label: 'Telefone 2', type: 'text' },
    { name: 'email_pessoal', label: 'E-mail Pessoal', type: 'email' },
    { name: 'email_corp', label: 'E-mail Corporativo', type: 'email' },
    { name: 'cargo', label: 'Cargo', type: 'text' },
    { name: 'departamento', label: 'Departamento', type: 'text' },
    { name: 'cod_empresa', label: 'Empresa', type: 'text' },
    { name: 'dt_inclusao', label: 'Data de Inclusão', type: 'date' },
    { name: 'dt_alteracao', label: 'Data de Alteração', type: 'date' },
    { name: 'obs', label: 'Observações', type: 'textarea' },
];

const enderecoFields = [
    { name: 'cep', label: 'CEP', type: 'text' },
    { name: 'pais', label: 'País', type: 'text' },
    { name: 'uf', label: 'Estado', type: 'text' },
    { name: 'cidade', label: 'Cidade', type: 'text' },
    { name: 'bairro', label: 'Bairro', type: 'text' },
    { name: 'rua', label: 'Rua', type: 'text' },
    { name: 'numero', label: 'Número', type: 'text' },
    { name: 'complemento', label: 'Complemento', type: 'text' },
];

const addContatoFields = [
    { name: 'nome', label: 'Nome', type: 'text' },
    { name: 'cod_empresa', label: 'Empresa', type: 'select', source: 'empresa', displayField: 'razao' },
    { name: 'cpf', label: 'CPF', type: 'text' },
    { name: 'celular', label: 'Celular', type: 'text' },
    { name: 'telefone', label: 'Telefone', type: 'text' },
    { name: 'telefone2', label: 'Telefone 2', type: 'text' },
    { name: 'email_pessoal', label: 'E-mail Pessoal', type: 'email' },
    { name: 'email_corp', label: 'E-mail Corporativo', type: 'email' },
    { name: 'cargo', label: 'Cargo', type: 'text' },
    { name: 'departamento', label: 'Departamento', type: 'text' },
    { name: 'obs', label: 'Observações', type: 'textarea' }
];

const addContatoEnderecoFields = [
    { name: 'cep', label: 'CEP', type: 'text' },
    { name: 'pais', label: 'País', type: 'text' },
    { name: 'uf', label: 'Estado', type: 'text' },
    { name: 'cidade', label: 'Cidade', type: 'text' },
    { name: 'bairro', label: 'Bairro', type: 'text' },
    { name: 'rua', label: 'Rua', type: 'text' },
    { name: 'numero', label: 'Número', type: 'text' },
    { name: 'complemento', label: 'Complemento', type: 'text' }
];

const editContatoFields = [
    { name: 'cod_contato', label: 'Contato (Código)', type: 'text', readonly: true },
    { name: 'nome', label: 'Nome', type: 'text' },
    { name: 'cod_empresa', label: 'Empresa', type: 'select', source: 'empresa', displayField: 'razao' },
    { name: 'cpf', label: 'CPF', type: 'text' },
    { name: 'celular', label: 'Celular', type: 'text' },
    { name: 'telefone', label: 'Telefone', type: 'text' },
    { name: 'telefone2', label: 'Telefone 2', type: 'text' },
    { name: 'email_pessoal', label: 'E-mail Pessoal', type: 'email' },
    { name: 'email_corp', label: 'E-mail Corporativo', type: 'email' },
    { name: 'cargo', label: 'Cargo', type: 'text' },
    { name: 'departamento', label: 'Departamento', type: 'text' },
    { name: 'obs', label: 'Observações', type: 'textarea' }
];

const editContatoEnderecoFields = [
    { name: 'cep', label: 'CEP', type: 'text' },
    { name: 'pais', label: 'País', type: 'text' },
    { name: 'uf', label: 'Estado', type: 'text' },
    { name: 'cidade', label: 'Cidade', type: 'text' },
    { name: 'bairro', label: 'Bairro', type: 'text' },
    { name: 'rua', label: 'Rua', type: 'text' },
    { name: 'numero', label: 'Número', type: 'text' },
    { name: 'complemento', label: 'Complemento', type: 'text' }
];

const searchContatoFields = [
    { name: 'nome', label: 'Nome' },
    { name: 'cpf', label: 'CPF' },
    { name: 'celular', label: 'Celular' },
    { name: 'telefone', label: 'Telefone' },
    { name: 'telefone2', label: 'Telefone 2' },
    { name: 'email_pessoal', label: 'E-mail Pessoal' },
    { name: 'email_corp', label: 'E-mail Corporativo' },
    { name: 'cargo', label: 'Cargo' },
    { name: 'departamento', label: 'Departamento' },
    { name: 'cod_empresa', label: 'Empresa' },
    { name: 'obs', label: 'Observações' },
];

export {
    contatoFields, enderecoFields,
    addContatoFields, addContatoEnderecoFields,
    editContatoFields, editContatoEnderecoFields,
    searchContatoFields, gridContatoColumns
};