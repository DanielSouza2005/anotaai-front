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
    { name: 'cod_contato', label: 'Contato (Código)', type: 'text', readonly: true },
    { name: 'nome', label: 'Nome', type: 'text' },
    { name: 'cod_empresa', label: 'Empresa (Código)', type: 'text' },
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

export {
    contatoFields, enderecoFields,
    addContatoFields, addContatoEnderecoFields
};