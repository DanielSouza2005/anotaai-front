import {
    EventNote as EventNoteIcon,
    MoreVert as MoreVertIcon
} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import React, { useState } from 'react';
import EditDialog from '../../components/utils/EditDialog';
import SearchBar from '../../components/utils/SearchBar';

const initialRows = [
    {
        id: 1,
        nome: 'João Silva',
        cpf: '123.456.789-00',
        celular: '(11) 99999-1111',
        telefone: '(11) 3333-2222',
        email_pessoal: 'joao@email.com',
        email_corp: 'joao@empresa.com',
        cargo: 'Analista',
        departamento: 'TI',
        obs: 'Contato antigo',
    },
    {
        id: 2,
        nome: 'Maria Oliveira',
        cpf: '987.654.321-00',
        celular: '(11) 98888-2222',
        telefone: '(11) 3444-2222',
        email_pessoal: 'maria@email.com',
        email_corp: 'maria@empresa.com',
        cargo: 'Gerente',
        departamento: 'RH',
        obs: '',
    },
];

const contatoFields = [
    { name: 'nome', label: 'Nome' },
    { name: 'cpf', label: 'CPF' },
    { name: 'celular', label: 'Celular' },
    { name: 'telefone', label: 'Telefone' },
    { name: 'email_pessoal', label: 'E-mail Pessoal', type: 'email' },
    { name: 'email_corp', label: 'E-mail Corporativo', type: 'email' },
    { name: 'cargo', label: 'Cargo' },
    { name: 'departamento', label: 'Departamento' },
    { name: 'obs', label: 'Observações', type: 'textarea' },
];

const ContatosPage = () => {

    const [search, setSearch] = useState('');
    const [rows, setRows] = useState(initialRows);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [formData, setFormData] = useState({});

    const handleMenuOpen = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
    };

    const handleEdit = () => {
        const rowToEdit = rows.find(row => row.id === selectedRowId);
        setFormData(rowToEdit);
        setEditDialogOpen(true);
        handleMenuClose();
    };

    const handleDelete = () => {
        setRows(rows.filter((row) => row.id !== selectedRowId));
        handleMenuClose();
    };

    const handleSave = () => {
        setRows(rows.map(row => row.id === formData.id ? formData : row));
        setEditDialogOpen(false);
    };

    const filteredRows = rows.filter((row) =>
        row.nome.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        { field: 'nome', headerName: 'Nome', flex: 1 },
        { field: 'email_pessoal', headerName: 'E-mail Pessoal', flex: 1 },
        { field: 'celular', headerName: 'Celular', flex: 1 },
        { field: 'telefone', headerName: 'Telefone', flex: 1 },
        { field: 'cargo', headerName: 'Cargo', flex: 1 },
        { field: 'departamento', headerName: 'Departamento', flex: 1 },
        {
            field: 'acoes',
            headerName: '',
            width: 50,
            sortable: false,
            renderCell: (params) => (
                <IconButton onClick={(event) => handleMenuOpen(event, params.row.id)}>
                    <MoreVertIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Box
            sx={{ margin: 0, padding: 0 }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventNoteIcon sx={{ color: 'blue', marginRight: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                    Lista de Contatos
                </Typography>
            </Box>

            <SearchBar
                value={search}
                onChange={(e) => setSearch(String(e.target.value))}
            />

            <Paper elevation={1}>
                <Box sx={{ height: 400 }}>
                    <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableRowSelectionOnClick
                        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                    />
                </Box>
            </Paper>

            {/* Menu de Ações */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEdit}>
                    <EditIcon fontSize="small" sx={{ marginRight: 1 }} />
                    Editar
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} />
                    Excluir
                </MenuItem>
            </Menu>

            {/* Dialog de Edição */}
            <EditDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                onSave={handleSave}
                formData={formData}
                onChange={(e) =>
                    setFormData(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                    }))
                }
                fields={contatoFields}
                title="Editar Contato"
            />            
        </Box >
    );
}

export default ContatosPage;