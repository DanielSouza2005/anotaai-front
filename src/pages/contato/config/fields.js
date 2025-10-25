const contatoFields = [
    { name: 'nome', label: 'Nome', type: 'text' },
    { name: 'cpf', label: 'CPF', type: 'text' },
    { name: 'telefones', label: 'Telefone', type: 'text', mask: 'phone', isList: true  },
    { name: 'emails', label: 'E-mail', type: 'email', isList: true },
    { name: 'cargo', label: 'Cargo', type: 'text' },
    { name: 'departamento', label: 'Departamento', type: 'text' },
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

const empresaFields = [
    { name: 'razao', label: 'Razão Social', type: 'text' },
    { name: 'fantasia', label: 'Nome Fantasia', type: 'text' },
    { name: 'cnpj', label: 'CNPJ', type: 'text' },
    { name: 'ie', label: 'Inscrição Estadual', type: 'text' },
];

const addContatoFields = [
    { name: 'nome', label: 'Nome', type: 'text' },
    { name: 'cod_empresa', label: 'Empresa', type: 'select', source: 'empresa', displayField: 'razao' },
    { name: 'cpf', label: 'CPF', type: 'text', mask: 'cpf' },
    { name: 'telefones', label: 'Telefone', type: 'text', mask: 'phone', isList: true  },
    { name: 'emails', label: 'E-mail', type: 'email', isList: true  },
    { name: 'cargo', label: 'Cargo', type: 'text' },
    { name: 'departamento', label: 'Departamento', type: 'text' },
    { name: 'obs', label: 'Observações', type: 'textarea' }
];

const addContatoEnderecoFields = [
    { name: 'cep', label: 'CEP', type: 'text', mask: 'cep' },
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
    { name: 'cpf', label: 'CPF', type: 'text', mask: 'cpf' },
    { name: 'telefones', label: 'Telefone', type: 'text', mask: 'phone', isList: true  },
    { name: 'emails', label: 'E-mail', type: 'email', isList: true  },
    { name: 'cargo', label: 'Cargo', type: 'text' },
    { name: 'departamento', label: 'Departamento', type: 'text' },
    { name: 'obs', label: 'Observações', type: 'textarea' }
];

const editContatoEnderecoFields = [
    { name: 'cep', label: 'CEP', type: 'text', mask: 'cep' },
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
    { name: 'telefone', label: 'Telefone' },
    { name: 'email', label: 'E-mail' },
    { name: 'cargo', label: 'Cargo' },
    { name: 'departamento', label: 'Departamento' },
    { name: 'razao', label: 'Empresa (Razão)' },
    { name: 'fantasia', label: 'Empresa (Fantasia)' },
    { name: 'cnpj', label: 'Empresa (CNPJ)' }
];

export { addContatoEnderecoFields, addContatoFields, contatoFields, editContatoEnderecoFields, editContatoFields, empresaFields, enderecoFields, searchContatoFields };
