import {
    Group as GroupIcon,
    MoreVert as MoreVertIcon
} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { useState } from "react";
import SearchBar from '../../components/utils/SearchBar';
import EditDialog from '../../components/utils/EditDialog';

const initialRows = [
    {
        id: 1,
        nome: 'João Silva',
        email: 'joao.silva@gmail.com'
    },
    {
        id: 2,
        nome: 'Maria Oliveira',
        email: 'maria.oliveira@gmail.com'
    },
];

const usuarioFields = [
    { name: 'nome', label: 'Nome' },
    { email: 'email', label: 'Email' }
];

const UsuariosPage = () => {

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
        { field: 'email', headerName: 'Email', flex: 1 },
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
                <GroupIcon sx={{ color: 'blue', marginRight: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                    Lista de Usuários
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
                fields={usuarioFields}
                title="Editar Usuário"
            />
        </Box>
    );
}

export default UsuariosPage;