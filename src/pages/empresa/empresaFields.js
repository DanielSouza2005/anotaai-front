const gridEmpresaFields = [
    { field: 'razao', headerName: 'Razão Social', flex: 1 },
    { field: 'fantasia', headerName: 'Fantasia', flex: 1 },
    { field: 'cnpj', headerName: 'CNPJ', flex: 1 },
    { field: 'ie', headerName: 'Inscrição Estadual', flex: 1 }
];

const empresaFields = [
    { name: 'cod_empresa', label: 'Código (Empresa)', type: 'text' },
    { name: 'razao', label: 'Razão Social', type: 'text' },
    { name: 'fantasia', label: 'Fantasia', type: 'text' },
    { name: 'cnpj', label: 'CNPJ', type: 'text' },
    { name: 'ie', label: 'Inscrição Estadual', type: 'text' },
    { name: 'dt_inclusao', label: 'Data de Inclusão', type: 'date' },
    { name: 'dt_alteracao', label: 'Data de Alteração', type: 'date' }
];

const empresaEnderecoFields = [
    { name: 'cep', label: 'CEP', type: 'text' },
    { name: 'pais', label: 'País', type: 'text' },
    { name: 'uf', label: 'Estado', type: 'text' },
    { name: 'cidade', label: 'Cidade', type: 'text' },
    { name: 'bairro', label: 'Bairro', type: 'text' },
    { name: 'rua', label: 'Rua', type: 'text' },
    { name: 'numero', label: 'Número', type: 'text' },
    { name: 'complemento', label: 'Complemento', type: 'text' },
];

const addEmpresaFields = [
    { name: 'razao', label: 'Razão Social', type: 'text' },
    { name: 'fantasia', label: 'Fantasia', type: 'text' },
    { name: 'cnpj', label: 'CNPJ', type: 'text', mask: 'cnpj' },
    { name: 'ie', label: 'Inscrição Estadual', type: 'text', mask: 'ie' }
];

const addEmpresaEnderecoFields = [
    { name: 'cep', label: 'CEP', type: 'text', mask: 'cep' },
    { name: 'pais', label: 'País', type: 'text' },
    { name: 'uf', label: 'Estado', type: 'text' },
    { name: 'cidade', label: 'Cidade', type: 'text' },
    { name: 'bairro', label: 'Bairro', type: 'text' },
    { name: 'rua', label: 'Rua', type: 'text' },
    { name: 'numero', label: 'Número', type: 'text' },
    { name: 'complemento', label: 'Complemento', type: 'text' },
];

const editEmpresaFields = [
    { name: 'cod_empresa', label: 'Código (Empresa)', type: 'text', readonly: true },
    { name: 'razao', label: 'Razão Social', type: 'text' },
    { name: 'fantasia', label: 'Fantasia', type: 'text' },
    { name: 'cnpj', label: 'CNPJ', type: 'text', mask: 'cnpj' },
    { name: 'ie', label: 'Inscrição Estadual', type: 'text', mask: 'ie' },
];

const editEmpresaEnderecoFields = [
    { name: 'cep', label: 'CEP', type: 'text', mask: 'cep' },
    { name: 'pais', label: 'País', type: 'text' },
    { name: 'uf', label: 'Estado', type: 'text' },
    { name: 'cidade', label: 'Cidade', type: 'text' },
    { name: 'bairro', label: 'Bairro', type: 'text' },
    { name: 'rua', label: 'Rua', type: 'text' },
    { name: 'numero', label: 'Número', type: 'text' },
    { name: 'complemento', label: 'Complemento', type: 'text' },
];

const searchEmpresaFields = [
    { name: 'razao', label: 'Razão Social', type: 'text' },
    { name: 'fantasia', label: 'Fantasia', type: 'text' },
    { name: 'cnpj', label: 'CNPJ', type: 'text' },
    { name: 'ie', label: 'Inscrição Estadual', type: 'text' }
];

export {
    empresaFields, empresaEnderecoFields,
    addEmpresaFields, addEmpresaEnderecoFields,
    editEmpresaFields, editEmpresaEnderecoFields,
    searchEmpresaFields, gridEmpresaFields
};