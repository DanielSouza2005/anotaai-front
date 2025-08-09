export const gridContatoColumns = [
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