import {
    Add as AddIcon,
    EventNote as EventNoteIcon,
    MoreVert as MoreVertIcon
} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Fab as FloatingActionButton,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import React, { useCallback, useEffect, useState } from 'react';
import CreateDialog from '../../components/utils/CreateDialog';
import DetailDialog from '../../components/utils/DetailDialog';
import EditDialog from '../../components/utils/EditDialog';
import SearchBar from '../../components/utils/SearchBar';
import api from '../../services/api/api';
import { addContatoEnderecoFields, addContatoFields, contatoFields, editContatoEnderecoFields, editContatoFields, enderecoFields, searchContatoFields } from './contatoFields';
import { contatoValidationSchema } from './contatoValidation';

const ContatosPage = () => {

    const [search, setSearch] = useState('');
    const [searchField, setSearchField] = useState('nome');
    const [rows, setRows] = useState([]);

    const [loading, setLoading] = useState(true);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(100);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [formData, setFormData] = useState({});

    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [newFormData, setNewFormData] = useState({});

    const [detailDialogOpen, setDetailDialogOpen] = useState(false);

    const fetchContatos = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get(`/contato?page=${page}&size=${pageSize}`);
            setRows(response.data.content);
            setTotalRows(response.data.totalElements);
        } catch (error) {
            console.error("Erro ao buscar contatos:", error);
        } finally {
            setLoading(false);
        }
    }, [page, pageSize]);

    useEffect(() => {
        fetchContatos();
    }, [page, pageSize, search, fetchContatos]);

    const handleMenuOpen = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
    };

    const handleEdit = () => {
        const rowToEdit = rows.find(row => row.cod_contato === selectedRowId);
        setFormData(rowToEdit);
        setEditDialogOpen(true);
        handleMenuClose();
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/contato/${selectedRowId}`);
            fetchContatos();
        } catch (error) {
            console.error("Erro ao excluir contato:", error);
        }
        handleMenuClose();
    };

    const handleEditChange = async (values, { setSubmitting, setErrors }) => {
        try {
            await api.put(`/contato`, values);
            fetchContatos();
            setEditDialogOpen(false);
        } catch (error) {
            if (error.response && error.response.data) {
                const apiErrors = error.response.data;

                if (Array.isArray(apiErrors)) {
                    const formikErrors = {};
                    apiErrors.forEach(err => {
                        if (err.campo.includes('.')) {
                            const [obj, field] = err.campo.split('.');
                            formikErrors[obj] = {
                                ...(formikErrors[obj] || {}),
                                [field]: err.mensagem
                            };
                        } else {
                            formikErrors[err.campo] = err.mensagem;
                        }
                    });

                    setErrors(formikErrors);
                } else {
                    alert(apiErrors.message || "Erro inesperado ao criar contato.");
                    console.error("Erro da API:", error.response.data);
                }
            } else {
                alert("Erro ao criar contato. Tente novamente.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleNewContato = () => {
        setNewFormData({});
        setCreateDialogOpen(true);
    };

    const handleCreate = async (values, { setSubmitting, setErrors }) => {
        try {
            await api.post('/contato', values);
            fetchContatos();
            setCreateDialogOpen(false);
        } catch (error) {
            if (error.response && error.response.data) {
                const apiErrors = error.response.data;

                if (Array.isArray(apiErrors)) {
                    const formikErrors = {};
                    apiErrors.forEach(err => {
                        if (err.campo.includes('.')) {
                            const [obj, field] = err.campo.split('.');
                            formikErrors[obj] = {
                                ...(formikErrors[obj] || {}),
                                [field]: err.mensagem
                            };
                        } else {
                            formikErrors[err.campo] = err.mensagem;
                        }
                    });

                    setErrors(formikErrors);
                } else {
                    alert(apiErrors.message || "Erro inesperado ao criar contato.");
                    console.error("Erro da API:", error.response.data);
                }
            } else {
                alert("Erro ao criar contato. Tente novamente.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleRowDoubleClick = (params) => {
        setFormData(params.row);
        setDetailDialogOpen(true);
    };

    const filteredRows = rows.filter((row) =>
        row[searchField]?.toString().toLowerCase().includes(search.toLowerCase())
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
                <IconButton onClick={(event) => handleMenuOpen(event, params.row.cod_contato)}>
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
                fieldSelected={searchField}
                fieldsAvailable={searchContatoFields}
                onChange={(e) => setSearch(String(e.target.value))}
                onFieldChange={(e) => setSearchField(e.target.value)}
            />

            <Paper elevation={1}>
                <Box sx={{ height: 400 }}>
                    <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        loading={loading}
                        rowCount={totalRows}
                        paginationMode="server"
                        paginationModel={{ page, pageSize }}
                        onPaginationModelChange={(model) => {
                            setPage(model.page);
                            setPageSize(model.pageSize);
                        }}
                        disableRowSelectionOnClick
                        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                        onRowDoubleClick={handleRowDoubleClick}
                        getRowId={(row) => row.cod_contato}
                        getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                        }
                        sx={{
                            '& .even': {
                                backgroundColor: '#f3f3f3',
                            },
                            '& .odd': {
                                backgroundColor: '#ffffff',
                            },
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: '#e3f2fd',
                            },
                        }}
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

            <FloatingActionButton
                color="primary"
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                }}
                onClick={handleNewContato}
            >
                <AddIcon />
            </FloatingActionButton>

            <CreateDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                onCreate={handleCreate}
                formData={newFormData}
                onChange={(e) =>
                    setNewFormData(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                    }))
                }
                fields={addContatoFields}
                enderecoFields={addContatoEnderecoFields}
                title="Novo Contato"
                titleTab={"Contato"}
                titleTab2={"Endereço"}
                validationSchema={contatoValidationSchema}
            />

            <EditDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                onSave={handleEditChange}
                formData={formData}
                onChange={(e) =>
                    setFormData(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                    }))
                }
                fields={editContatoFields}
                enderecoFields={editContatoEnderecoFields}
                title="Editar Contato"
                titleTab={"Contato"}
                titleTab2={"Endereço"}
                validationSchema={contatoValidationSchema}
            />

            <DetailDialog
                open={detailDialogOpen}
                onClose={() => setDetailDialogOpen(false)}
                formData={formData}
                title="Detalhes do Contato"
                fields={contatoFields}
                enderecoFields={enderecoFields}
                titleTab={"Contato"}
                titleTab2={"Endereço"}
            />
        </Box >
    );
}

export default ContatosPage;